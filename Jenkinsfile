pipeline {
    environment {
        registry = "vegsociety"
        imageName = "vegsociety"
        VERSION = "${BUILD_NUMBER}"
        BUILD_URL = 'http://vegsociety.softdemonew.info:8080/job/vegsociety/'
        DOCKER_BUILDKIT = '1'
    }

    agent any

    stages {
        stage('Cloning Git Repository') {
            steps {
                git branch: 'main', credentialsId: 'VIK_GITHUB_CRED', url: 'https://github.com/kvishal04/veg-society.git'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'SonarScanner'
                    withSonarQubeEnv('sonarqube') {
                        sh """
                            ${scannerHome}/bin/sonar-scanner \
                            -Dsonar.projectKey=vegsociety
                        """
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                script {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Building Docker Image') {
            steps {
                script {
                    // Build the Docker image
                    sh 'export DOCKER_BUILDKIT=0 && docker build -t ${registry}:${BUILD_NUMBER} .'
                }
            }
        }

        stage('Deploy Docker Image') {
            steps {
                script {
                    sshagent(['server_creds']) {
                        def containerExists = sh(script: "docker inspect -f '{{.State.Running}}' vegsociety-app", returnStatus: true) == 0
                        if (containerExists) {
                            echo 'Stopping and removing the existing container...'
                            sh "docker stop vegsociety-app || true"
                            sh "docker rm vegsociety-app || true"
                        }
                        echo 'Starting the new Docker container...'
                        sh "docker run -p 8055:8055 --name vegsociety-app -d --log-driver json-file ${registry}:${env.BUILD_NUMBER}"
                        echo 'Cleaning up the Docker image...'
                        sh "docker rmi --force ${registry}:${BUILD_NUMBER}"
                        sh 'docker logs vegsociety-app'
                        sh 'docker update --restart always vegsociety-app'
                        sh "docker image prune -a -f"
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'This will always run'
        }
        success {
            echo 'Build was successful!'
            emailext attachLog: true, 
                body: """<b><big>vegsociety</big></b><br>\n<br><b>Build Number:</b> ${env.BUILD_NUMBER} <br><b>URL build:</b> ${env.BUILD_URL}<br>""", 
                recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']], 
                from: '', mimeType: 'text/html', replyTo: '', 
                subject: "vegsociety Build Success: ${currentBuild.fullDisplayName}", 
                to: "rvishal.kumar@123789.org, robin.goyal@123789.org"
        }
        failure {
            echo 'Build Failed'
            emailext attachLog: true, 
                body: """<b><big>vegsociety</big></b><br>\n<br><b>Build Number:</b> ${env.BUILD_NUMBER} <br><b>URL build:</b> ${env.BUILD_URL}<br>""", 
                recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']], 
                from: '', mimeType: 'text/html', replyTo: '', 
                subject: "vegsociety Build Failure: ${currentBuild.fullDisplayName}", 
                to: "vishal.kumar@123789.org, robin.goyal@123789.org"
        }
    }
}
