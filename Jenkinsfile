pipeline {
    agent any

    environment {
        CI = 'false'
        BRANCH_NAME = ''
        COMMIT_HASH = ''
        IMAGE_NAME = ''
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials')
        DOCKER_IMAGE = 'mohamedtabrez/adopt-a-dog'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'master', url: 'https://github.com/tabrezsaqib/dog.git'
            }
        }

        stage('Set Git Variables') {
            steps {
                script {
                    // Capture the branch name and commit hash
                    env.BRANCH_NAME = bat(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()
                    env.COMMIT_HASH = bat(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                    echo "Branch Name: ${env.BRANCH_NAME}"
                    echo "Commit Hash: ${env.COMMIT_HASH}"

                    // Define the Docker image name using the commit hash and branch name
                    env.IMAGE_NAME = "mohamedtabrez/adopt-a-dog:${env.COMMIT_HASH}-${env.BRANCH_NAME}"
                    echo "Docker Image Name: ${env.IMAGE_NAME}"
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    try {
                        bat 'npm install --verbose'
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
                        bat 'npm run build --verbose'
                    }
                    catch (Exception e) {
                        echo "Error during npm run build: ${e.message}"
                        throw e
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    try {
                        // Run the Docker build command to build the image and tag it
                        bat "docker build -t ${env.IMAGE_NAME} ."
                    }
                    catch (Exception e) {
                        echo "Error during docker build: ${e.message}"
                        throw e
                    }
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    try {
                        // Log in to Docker Hub
                        withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                            bat """
                            echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USERNAME} --password-stdin
                            docker push ${env.IMAGE_NAME}
                            """
                        }
                    }
                    catch (Exception e) {
                        echo "Error during docker push: ${e.message}"
                        throw e
                    }
                }
            }
        }
        
    }
}
