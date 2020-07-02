
node ('master'){
    def appDockerImg
    def baseTag = '1.1.0'

    def appName = 'pemanfaatan-dana-fe'
    def namespace = 'pemanfaatan-dana'
    def nexusPluginsRepoUrl = 'https://nexus.tapera.go.id/repository/maven-central/'
    def imageTag = 'latest'
    def sonarSrc = 'src'
    def sonarTest = 'src/components'
    def testReportPath = 'reports/test-reporter.xml'
    def lcovPath = 'coverage/lcov.info'

	def nexusGoCentral = 'nexus.tapera.go.id/repository/go-central'
    def nexusDockerDevRepoGCP = '10.172.24.50:8082'
    def nexusDockerDevRepoALI = '10.172.24.50:8082'
    //dev
    // def nexusDockerDevRepoGCP = 'http://192.168.43.176:8123'
    // def nexusDockerDevRepoALI = 'http://192.168.43.176:8124'

    def memLimit = '512Mi'
    def cpuLimit = '500m'
    def imagePullSecret = 'nexus-dev-repo'
    def serviceTypeGKE = 'LoadBalancer'
    def serviceTypeALI = 'NodePort'
    def gateway = 'istio-gateway'
    def host = 'hello.sotech.info'
    def gkeKubeConfig = '/jenkinsdev01/jenkins-home/kubeconfig/config-gke-dev'
    def aliKubeConfig = '/jenkinsdev01/jenkins-home/kubeconfig/config-ali-dev'
    def jmeterTestFileGCP = 'petclinic-gke.jmx'
    def jmeterTestFileALI = 'petclinic-ali.jmx'
    def jmeterNumberThreads = '20'
    def jmeterRampUp = '3'
    def jmeterLoopCount = '10'
    def jmeterErrorRateThresholdPercent = '99'
    def jmeterGitRepo = 'https://bitbucket.tapera.go.id/scm/sam/jmeter.git'
    def jiraIssueKey
    def jiraUrl = 'https://jira.tapera.go.id'

    def appRepoUrl = 'https://bitbucket.tapera.go.id/scm/pmf/pmf--fe.git'
    def appBranch = 'master'

    def katalonRepoUrl = 'https://bitbucket.tapera.go.id/scm/pmf/pmf-fe-katalon.git'
    def katalonBranch = 'master'
    def katalonProjectName = 'pemanfaatan-fe-test.prj'
    def katalonTestSuiteName = 'SimpleTestSuite'

    stage('Checkout'){
        echo 'Checking out SCM'
        //checkout scm
        checkout scm: [$class: 'GitSCM', userRemoteConfigs: [[credentialsId: 'ci-cd', url: "${appRepoUrl}"]], branches: [[name: "${appBranch}"]]]
    }

	stage('Build App'){
        echo 'build app'
        sh '''
		npm install
		npm run build
		'''
    }

    stage('Unit Test') {
        echo 'unit test'
        sh '''
        npm run test -- --ci --coverage
        '''
    }

    stage("SonarQube Analysis"){
		echo 'scan sonarqube'
        withSonarQubeEnv(credentialsId: 'sonarqube-token', installationName: 'sonarqube') {
			sh"""
                sonar-scanner \
                -Dsonar.projectKey=pmf-fe \
                -Dsonar.qualitygate.wait=true \
                -Dsonar.sources=${sonarSrc} \
                -Dsonar.tests=${sonarTest} \
                -Dsonar.javascript.lcov.reportPaths=${lcovPath} \
                -Dsonar.testExecutionReportPaths=${testReportPath} \
                -Dsonar.test.inclusions="**/*.test.tsx" \
                -Dsonar.test.exclusions="**/vendor/**,**/pages/**,**/configurations/**,**/helpers/**,**/theme/**,**/redux/**" \
            """
		}
		
		//quality gate
		timeout(time: 1, unit: 'HOURS') {
              def qg = waitForQualityGate()
              if (qg.status != 'OK') {
                  error "Pipeline aborted due to quality gate failure: ${qg.status}"
              }
         }
    }

    stage('Build Image') {
        echo "Build Image"
        withCredentials([usernamePassword(credentialsId: 'ci-cd', passwordVariable: 'nexusPassword', usernameVariable: 'nexusUsername')]) {
            sh """
            docker-compose build --force-rm
            #docker login -u=${nexusUsername} -p=${nexusPassword} ${nexusDockerDevRepoGCP}
            #docker build -t pemanfaatan-fe:dev .
            """
        }
    }

    stage('Publish to GKE'){
        echo 'publish to GKE'
        withCredentials([usernamePassword(credentialsId: 'ci-cd', passwordVariable: 'nexusPassword', usernameVariable: 'nexusUsername')]) {
            sh """
                docker login -u=${nexusUsername} -p=${nexusPassword} ${nexusDockerDevRepoGCP}
                docker push ${nexusDockerDevRepoGCP}/${appName}:${imageTag}
                docker logout ${nexusDockerDevRepoGCP} 
            """
        }
    }
    
    stage('Publish to ALI'){
        echo 'publish to ALI'
    }

    stage('Delete Image'){
        echo 'delete image'
        sh """
            docker-compose rm -f
        """ 
    } 

    stage('Deploy to GKE'){
        echo 'deploy to GKE'
        
        sh """
		cat kubernetes/gcp-deployment-template.yaml | sed 's/{APP_NAME}/${appName}/g'  \
		| sed 's/{NEXUS_REPO}/${nexusDockerDevRepoGCP}/g' | sed 's/{IMG_TAG}/${imageTag}/g' \
		| sed 's/{MEMORY_LIMIT}/${memLimit}/g' | sed 's/{CPU_LIMIT}/${cpuLimit}/g' \
		| sed 's/{IMG_PULL_SECRET}/${imagePullSecret}/g' |  sed 's/{SERVICE_TYPE}/${serviceTypeGKE}/g' \
		| kubectl --kubeconfig='${gkeKubeConfig}' apply -n '${namespace}' -f -
		
		kubectl --kubeconfig='${gkeKubeConfig}' rollout status deployment/'${appName}' -n '${namespace}'
		"""
    }

    stage('Deploy to Ali'){
        echo 'deploy to Alicloud'
    }

    stage("Security Check"){
        echo 'security check'
    }

    stage ("Regression Test") {
        echo 'regression test'
        node ('kre-centos') {
			cleanWs deleteDirs: true
            checkout scm: [$class: 'GitSCM', userRemoteConfigs: [[credentialsId: 'ci-cd', url: "${katalonRepoUrl}"]], branches: [[name: "${katalonBranch}"]]]
			
			withCredentials([string(credentialsId: 'katalon-api-key', variable: 'secret')]) {
				echo "workspace : ${workspace}"
				sh """
				pwd
				ls

                /katalon01/katalon-studio-engine/katalonc -noSplash -runMode=console \
                -projectPath='${workspace}/${katalonProjectName}' -retry=0 \
                -testSuitePath="Test Suites/${katalonTestSuiteName}" \
                -executionProfile="default" -browserType="Chrome (headless)" \
                -apiKey=${secret}
				"""
			}
		}
    }
        
    stage ("Jira Update Status") {
        echo 'Jira update status'
    }
}

