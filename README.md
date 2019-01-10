Project Management Software for Teams 
===

Main features:

* Kanaban Board
* Event Calendar
* Group Chat

> #### Check demo: [click here](http://teamflow.evcode.pl)

## Quick Instruction

What you need:
* MongoDB Server
* Redis Server
* Node with typescript

#### Server (node-server):

##### 0. Install required packages:

* package.json
```
npm install
```
* Globally
```
npm install -g typescript ts-node rimraf mocha
```

##### 1. Setup main configuration in *./config* dir
* Copy files with "." on beginning to without ".".
```
cp .dev.application.yaml dev.application.yaml &&
cp .dev.database.yaml dev.database.yaml &&
cp .dev.environment.yaml dev.environment.yaml &&
cp .prod.application.yaml prod.application.yaml &&
cp .prod.database.yaml prod.database.yaml &&
cp .prod.environment.yaml prod.environment.yaml
```
* Generate certs in ./certs/jwt dir. Using these commands:
```shell
openssl ecparam -name secp256r1 -genkey -out ./certs/jwt/private.pem
openssl ec -in ./certs/jwt/private.pem -pubout -out ./certs/jwt/public.pem
```
* Configure config files:
	* (prod/dev).application.yaml
	* (prod/dev).database.yaml
	* (prod/dev).environment.yaml
	
*
	
##### 2. Configure privileges (linux)
	* chmod +x logs
	* chmod +x -R storage
	
##### 3. Boot application
For non-build mode:
```
npm run dev
```
For hot watch mode (nodemon):
```
npm run watch
```
For build app:
```
npm run build
```
For start app:
```
npm run start
```

#### 4. Short tips
1. If you using nginx or apache reverse proxy, remember to add custom header for real client address: ***X-Real-IP***

Nginx:
```
proxy_set_header X-Real-IP $remote_addr
```

#### Client (angular-client):

##### 0. Install required packages:

* From package.json
```
npm install
```

##### 1. Setup configuration in ./src/environments
* `environment(.prod).ts`
* `meta.ts`

#### 2. Build for production
```
ng run build --prod
```

## Screenshots:
> todo


#### Dependencies: [click here](https://github.com/boski-src/teamflow-project-management/network/dependencies)
