pipeline {
    agent any

    triggers {
        githubPush()
    }

    environment {
        IMAGE_NAME = 'devwonny/jenkins-test'
        TAG = 'latest'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/dev-wonny/jenkins.git'
            }
        }

        stage('Build') {
            steps {
                echo '🔨 Building...'
            }
        }

        stage('Test') {
            steps {
                echo '🧪 Running tests...'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                    docker build -t ${env.IMAGE_NAME}:${env.TAG} .
                """
            }
        }

        stage('Login DockerHub') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    '''
                }
            }
        }

        stage('Push Image to DockerHub') {
            steps {
                sh """
                    docker push ${env.IMAGE_NAME}:${env.TAG}
                """
            }
        }

        stage('Deploy') {
            steps {
                echo '🚀 Deploying...'
                sh """
                    docker pull ${env.IMAGE_NAME}:${env.TAG}
                    docker stop jenkins-app || true
                    docker rm jenkins-app || true
                    docker run -d -p 3000:3000 --name jenkins-app ${env.IMAGE_NAME}:${env.TAG}
                """

                // health check
                sh '''
                    echo "Checking Health..."
                    sleep 3
                    curl -f http://localhost:3000/health
                '''
            }
        }
    }
}
