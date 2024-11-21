pipeline {
    agent any
    environment{
        SONAR_HOME = tool "Sonar"
    }
    stages {
        stage('Code - Github') {
            steps {
                 script {
                    git branch: 'main',
                        credentialsId: 'Github',
                        url: 'https://github.com/iamdurlove/mern-admin.git'
                }
            }
        }
        stage('Test1 - SonarQube QA') {
            steps {
                withSonarQubeEnv("Sonar"){
                    sh "${SONAR_HOME}/bin/sonar-scanner -Dsonar.projectName=mern -Dsonar.projectKey=mern"
                }
            }
        }
        stage('Test2 - OWASP Dependency Check') {
             steps{
                dependencyCheck additionalArguments: '--scan ./', odcInstallation: 'OWASP'
                dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
            }
        }
        stage('Test3 - Sonar Quality Gate Scan') {
            steps {
               timeout(time: 2, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: false
                }
            }
        }
        stage('Test4 - Trivy File System Scan') {
            steps {
                sh "trivy fs --format table -o trivy-fs-report.html ."
            }
        }
         stage("Docker Build & Push"){
            steps{
                script{
                   withDockerRegistry(credentialsId: 'docker', toolName: 'docker'){   
                       sh "docker-compose build"
                       sh "docker push durlavparajuli/mern_frontend:v1 "
                       sh "docker push durlavparajuli/mern_backend:v1 "
                    }
                }
            }
        }
        
    }
    // post {
    //  always {
    //     emailext attachLog: true,
    //         subject: "'${currentBuild.result}'",
    //         body: "Project: ${env.JOB_NAME}<br/>" +
    //             "Build Number: ${env.BUILD_NUMBER}<br/>" +
    //             "URL: ${env.BUILD_URL}<br/>",
    //         to: 'no-reply@durlavparajuli.com.np',                
    //         attachmentsPattern: 'trivyfs.txt,trivyimage.txt'
    //     }
    // }
}
