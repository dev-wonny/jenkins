pipeline {
    agent any
    
    triggers {
        githubPush()
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
            }
        }

        stage('Test') {
            steps {
                echo "🧪 Running tests..."
            }
        }

        stage('Deploy') {
            steps {
                echo "🚀 Deploying..."
            }
        }
    }
}
