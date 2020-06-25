
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
    def katalonGitRepo = 'https://bitbucket.tapera.go.id/scm/sam/katalon.git'
    def katalonBranch = 'master'
    def katalonProjectName = 'TestPlease.prj'
    def katalonTestSuiteName = 'TestSuiteTapera'
    def jiraIssueKey
    def jiraUrl = 'https://jira.tapera.go.id'

    def branch = 'master'
    
    def gitUrl = 'https://bitbucket.tapera.go.id/scm/pmf/pmf--fe.git'

    stage('Checkout'){
        echo 'Checking out SCM'
        //checkout scm
        checkout scm: [$class: 'GitSCM', userRemoteConfigs: [[credentialsId: 'ci-cd', url: "${gitUrl}"]], branches: [[name: "${branch}"]]]
    }

	stage('Build App'){
        sh '''
		npm install
		npm run build
		'''
    }

    stage("SonarQube Analysis"){
		echo 'scan sonarqube'
        // withSonarQubeEnv(credentialsId: 'sonarqube-token', installationName: 'sonarqube') {
		// 	sh"sonar-scanner -Dsonar.projectKey=pemanfaatan-fe -Dsonar.sources=. -Dsonar.qualitygate.wait=true"
		// }
		
		// //quality gate
		// timeout(time: 1, unit: 'HOURS') {
        //       def qg = waitForQualityGate()
        //       if (qg.status != 'OK') {
        //           error "Pipeline aborted due to quality gate failure: ${qg.status}"
        //       }
        //  }
    }
	
	stage('Unit Test') {
        echo 'unit test'
    }

    stage("Security Check"){
    }

    stage('Build Image') {
        echo "Build Image"
		sh """ 
            docker build -t ${appName}:${imageTag} .
        """
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
        
    stage ("Jira Update Status") {

    }
}

