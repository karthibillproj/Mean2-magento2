## Software Requirements To Run Locally (there's a Docker option below as well)

* Node.js 4.0.0 or higher
* MongoDB 3.2 or higher

### Running the Application Locally

1. Install Node.js and MongoDB on your dev box

2. Execute 'mongod' to start the MongoDB daemon if it's not already running

3. Install Nodemon: `npm install nodemon -g`

4. Open `config/config.development.json` and change the host from `mongodb` to `localhost`

5. Run `npm install` to install app dependencies

6. Update configuration in `lib/` and `config` folder files 

6. Run `npm start` to compile the TypeScript and start the server

7. Browse to http://localhost:3000 OR Whatever PORT you are running your Application