pipeline {
    agent any

    environment {
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
                sh 'pwd && ls -al'
                sh 'node -v && npm -v'
                sh 'npm install'
            }
        }

        stage('Build Application') {
            steps {
                sh 'npm run build'
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
                    sh """
                    echo ${DOCKER_HUB_CREDENTIALS_PSW} | docker login -u ${DOCKER_HUB_CREDENTIALS_USR} --password-stdin
                    docker push ${DOCKER_IMAGE}:${env.IMAGE_TAG}
                    """
                }
            }
        }
    }
}
