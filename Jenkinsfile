pipeline {
    agent any

    environment {
        CI = 'false'
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials')
        DOCKER_IMAGE = 'mohamedtabrez/adopt-a-dog'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'master', url: 'https://github.com/tabrezsaqib/dog.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    try {
                        bat 'npm install'
                    }
                    catch (Exception e) {
                        echo "Error during npm install: ${e.message}"
                        throw e
                    }
                }
            }
        }

        stage('Build Application') {
            steps {
                script {
                    try {
                        bat 'npm run build'
                    }
                    catch (Exception e) {
                        echo "Error during npm install: ${e.message}"
                        throw e
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    def commitHash = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                    def branchName = sh(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()
                    def imageTag = "${branchName}-${commitHash}"

                    sh """
                    docker build -t ${DOCKER_IMAGE}:${imageTag} .
                    """
                    env.IMAGE_TAG = imageTag
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    bat """
                    echo ${DOCKER_HUB_CREDENTIALS_PSW} | docker login -u ${DOCKER_HUB_CREDENTIALS_USR} --password-stdin
                    docker push ${DOCKER_IMAGE}:${env.IMAGE_TAG}
                    """
                }
            }
        }
    }
}
