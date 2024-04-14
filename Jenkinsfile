pipeline {
    agent any
    environment{
        name = 'mern'
    }
    stages {
        stage('Build') {
            steps {
             sh '''
             name
             '''
            }
        }
         stage('Environment Variables') {
             environment{
                 username = 'kali'
             }
            steps {
                sh 'echo "${BUILD_ID}"'
                sh 'echo "${name}"'
                
            }
        }
         stage('Printing own variable') {
            steps {
                sh 'echo "${name}"'
            }
        }
        stage('Continue') {
            input{
                message "Should we continue"
                ok "Yes we should"
            }
            steps {
                sh 'echo "${name}"'
            }
        }
        stage('Testing') {
            steps {
                sh 'echo "Testing the code"'
            }
        }
        stage('Git SCM') {
            environment{
                message = 'Successfully connected to GIT SCM'
            }
            steps {
                sh 'echo "${message}"'
            }
        }
        stage('Deploy') {
            steps {
                sh 'echo "Deploying the code"'
            }
        }
    }
     post{
            failure{
                echo 'Failed'
            }
            success{
                echo 'Success'
            }
        }
}
