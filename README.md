# Example combine laravel with reactJS #

Built with:
* webpack
* karma
* sass
* babel
* react
* redux
* redux-saga
* axios
* i18next
* moment
* lodash

## Envirenement ##
In file .env.example

NODE_ENV='name_env' #example: development, production, ..
API_URL='url_api' #example http://localhost:8080/apibo/

this file is just an example
you must create two files (.env.dev) and (.env.prod) with same conf here

for env.dev ===> use this command to build (folder /back-office) the project with webpack.config.dev.js ==> 
##### npm run-script dev

for env.prod ===> use this command to build (folder /build) the project with webpack.config.prod.js ==> 
##### npm run-script prod

## How do I get set up? ##

* Run 'npm install' to get app dependancies
* Run 'npm start' to run app in development 
* Run 'npm test' to run unit tests and watch for changes
* Run 'npm run test:single-run' for a single run of unit tests
* ~~Run 'npm run-script build prod' o generate a production build~~ 

##************* ReactJs ************* ##
##### => Required : 
nodeJS : for our developpement server 
npm : manage dependancies
babel : transfer ECMAScript 5 to  ECMAScript 6

##### => Instalation :
* 1
npm install -g create-react-app

OR

npm install -g create-react-app

create-react-app admin-app

* 2 

  npm start :
    Starts the development server.

  npm run build : 
    Bundles the app into static files for production.

  npm test : 
    Starts the test runner.

  npm run eject : 
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!
