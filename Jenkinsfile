pipeline{ 

  agent any

  parameters{

    choice(name:'SCRIPT',choices:['cy:run:reg:login','cy:api','cy:run:test1','cy:run:test2'], description:"Choice script that you want to execute")

  }

  options{
    ansiColor('xterm')
  }

  stages{
    stage('Building'){
       steps {
          echo "Building the application"
       } 
    }
      stage('Testing'){
         steps{
            bat "npm install"
            bat "npm run %SCRIPT%"
         }
      }
         stage('Deploying'){
            steps{
               echo "Deploying the application"
            }
         }
  }
     post{
        success{
           publishHTML ([allowMissing: false,
           alwaysLinkToLastBuild: false,
           keepAll: true,
           reportDir: 'cypress\reports\html',
           reportFiles: 'index.html',
           reportName: 'HTML Report',
           ])
        }
     }
}
