pipeline {
    agent any

    parameters {
        string(name: 'DOCKER_USERNAME', description: 'Dcoker Username', defaultValue: 'mohamedtabrez')
        string(name: 'DOCKER_PASSWORD', description: 'Dcoker password', defaultValue: 'DockerHub2024')
    }


    environment {
        CI = 'false'
        IMAGE_NAME=''
        BRANCH_NAME = ''
        COMMIT_HASH = ''
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials')
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
                    // env.BRANCH_NAME = bat(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()
                    env.COMMIT_HASH = bat(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                    // echo "Branch Name: ${env.BRANCH_NAME}"
                    echo "Commit Hash: ${env.COMMIT_HASH}"

                    // Define the Docker image name using the commit hash and branch name
                    env.IMAGE_NAME = "mohamedtabrez/adopt-a-dog:${env.COMMIT_HASH}"
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
                        echo "Logging in to Docker Hub..."
                        bat """
                        type pwd.txt | docker login -u ${params.DOCKER_USERNAME} --password-stdin
                        if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%
                        echo "Docker login successful"
                        bat "docker tag  ${env.IMAGE_NAME} mohamedtabrez/adopt-a-dog:v1"
                        echo "Pushing Docker image..."
                        docker push mohamedtabrez/adopt-a-dog:v1
                        if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%
                        echo "Docker image pushed successfully"
                        """
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
