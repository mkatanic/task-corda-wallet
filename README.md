# Task Corda Wallet
This is an web app written in NodeJs using Express framework, for communicating with an example obligation-cordapp running on a corda node. Repository contains my app (vault-client) and example codapp (obligation-cordapp). Only change I made to example corda app is added method to its web api that initiates a CashPayment flow.
This web wallet allows it's operator to do the following
1. See cash ballances in different currencies
2. Transfer cash to another party
3. Issue some cash to itself
4. See all recorded obligations
5. Pay (part of) an obligation where operator is borrower
6. Issue new obligation as a borrower

# Instructions for setting up
## enviroment requirements
Java and some other tools are required to run a corda network. For how to install them, see https://docs.corda.net/quickstart-index.html#setting-up-a-development-environment.
To run client app NodeJS and npm are needed. For instructions on installing them on Ubuntu see https://linuxize.com/post/how-to-install-node-js-on-ubuntu-18.04/.
## running corda network
To run example network navigate to obligations-cordapp/ folder, and run deployNodes graddle task:
``` 
./gradlew deployNodes 
```
when the deployment is complet, network can be started with:
```
./kotlin-source/build/nodes/runnodes
```
This will run 3 actor nodes, notary node and web servers for the nodes, they listen on:
1. PartyA: `http://localhost:10007`
2. PartyB: `http://localhost:10010`
3. PartyC: `http://localhost:10013`

## running client app
To run the client app navigate to vault-cient folder. If dependacies are not installed, install them with
```
npm install
```
Then app can be started with
```
npm start
```
it will listen on `http://localhost:3000`, and by default it will work with node of PartyB, but this can be changed by pointing `cordaApiUrl` field in `common.js` to an url of another node.

## running tests
Once dependancies are installed, unit tests can be run with
```
npm test
```


