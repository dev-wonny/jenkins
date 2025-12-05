pipeline {
    agent any
    
    triggers {
        githubPush()
    }

    environment {
        // Jenkins Credentials ID
        DOCKERHUB = credentials('dockerhub')

        // Docker Hub repo (본인 계정명/레포명)
        IMAGE_NAME = "devwonny/jenkins-test"
        TAG = "latest"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/dev-wonny/jenkins.git'
            }
        }

        stage('Build') {
            steps {
                echo "🔨 Building..."
                // 예시: npm install, gradle build 등
            }
        }

        stage('Test') {
            steps {
                echo "🧪 Running tests..."
                // 예시: npm test, gradle test 등
            }
        }

        stage('Docker Build') {
            steps {
                sh """
                    docker build -t ${IMAGE_NAME}:${TAG} .
                """
            }
        }

        stage('Docker Login') {
            steps {
                sh """
                    echo "${DOCKERHUB_PSW}" | docker login -u "${DOCKERHUB_USR}" --password-stdin
                """
            }
        }

        stage('Docker Push') {
            steps {
                sh """
                    docker push ${IMAGE_NAME}:${TAG}
                """
            }
        }

        stage('Deploy') {
            steps {
                echo "🚀 Deploying..."
                // 예: SSH로 서버 접속 → docker run 재시작
            }
        }
    }
}
