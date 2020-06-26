
node ('master'){
    def appDockerImg
    def baseTag = '1.1.0'

    def appName = 'pmf-fe'
    def nexusPluginsRepoUrl = 'https://nexus.tapera.go.id/repository/maven-central/'
    def imageTag
    def appPomVersion

	def nexusGoCentral = 'nexus.tapera.go.id/repository/go-central'
    def nexusDockerDevRepoGCP = '10.172.24.50:8082'
    def nexusDockerDevRepoALI = '10.172.24.50:8082'
    //dev
    // def nexusDockerDevRepoGCP = 'http://192.168.43.176:8123'
    // def nexusDockerDevRepoALI = 'http://192.168.43.176:8124'

    def namespace = 'sample'
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
        sh '''
		npm install
		npm run build
		'''
    }

    stage("SonarQube Analysis"){
		echo 'scan sonarqube'
        withSonarQubeEnv(credentialsId: 'sonarqube-token', installationName: 'sonarqube') {
			sh"sonar-scanner -Dsonar.projectKey=pmf-fe -Dsonar.sources=. -Dsonar.qualitygate.wait=true"
		}
		
		//quality gate
		timeout(time: 1, unit: 'HOURS') {
              def qg = waitForQualityGate()
              if (qg.status != 'OK') {
                  error "Pipeline aborted due to quality gate failure: ${qg.status}"
              }
         }
    }
	
	stage('Unit Test') {
        echo 'unit test'
    }

    stage("Security Check"){
    }

    stage('Build Image') {
        echo "Build Image"
        withCredentials([usernamePassword(credentialsId: 'ci-cd', passwordVariable: 'nexusPassword', usernameVariable: 'nexusUsername')]) {
            sh """
            podman login -u ${nexusUsername} -p ${nexusPassword} ${nexusDockerDevRepoGCP} --tls-verify=false
            podman build -t ${nexusDockerDevRepoGCP}/${appName}:latest . --tls-verify=false
            podman push ${nexusDockerDevRepoGCP}/${appName}:latest --tls-verify=false
            podman rmi ${nexusDockerDevRepoGCP}/${appName}:latest -f
            """
        }
    }

    stage('Publish Image To GCP repo'){
        echo 'publish image to gcp repo'
        //docker.withRegistry(nexusDockerDevRepoGCP, imagePullSecret) {
        //    appDockerImg.push(baseTag)
        //}
    }
    
    stage('Publish Image To Ali repo'){
        echo 'publish image to ali repo'
        //docker.withRegistry(nexusDockerDevRepoALI, imagePullSecret) {
        //    appDockerImg.push(baseTag)
        //}
    }

    stage('Delete Image'){
        echo 'delete image'
        //sh "docker rmi tapera.${appName}"
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

    }
}

