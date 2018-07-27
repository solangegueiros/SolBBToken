# SolBBToken
This is the token for the assignment for the blockchain developer recruitment process. More details can be found [here](https://github.com/brickblock-io/coding-challenge-blockchain)

SolBBToken was published at Ropsten testnet, [here](https://ropsten.etherscan.io/address/0x3730aa313345f4b00e478a5010c2d3b921555520).

## Brief
The token was developed using truffle, openzeppelin, infura.

I think Truffle is very useful to compile, publish, debug and test contracts. I like truffle description: "your ethereum swiss army knife".
I realy like it, but I know how to do the things without it too.

I used ERC20 StandardToken and Ownable from OpenZeppelin because they are very complete, realiable and recognized.  
A lot of organizations collaborating and audits it. More infos about OpenZeppelin [here](https://openzeppelin.org/api/docs/open-zeppelin.html)

Infura was used to to facilitate publication in the testnet without the need to run a node locally.

Also I did an extra functionality to ask tokens to be easy the work of those who will interact and evaluate the project.

## Initial setup

You don't need to do nothing to use the token, ot was published at testnet Ropsten.

But, if you would like to do it by yourself, locally, you need to do this steps:

### 1. Install node and npm
* Go to [node.js](https://nodejs.org/en/) and download the lastest version of node. 
* Install [nodejs and npm](https://docs.npmjs.com/getting-started/installing-node).

### 2. Install truffle and an ethereum client. For local development, try Ganache.
```
npm install -g truffle 

npm install -g ganache
```

### 3. Clone the project


### 4. Install dependencies
- To install all the dependencies go to your directory and run:
```
npm install
```
(this will install all the dependencies a attached to the project)


### 5. Configure project
* Run  Ganache, configure your mnemonic, if you already have one.

* Create truffle-config.js or truffle.js

For Windows System, create truffle-config.js 
If you are using Linux / Mac, use truffle.js

* Put at file:
```
let mnemonic = "";    //For your wallet
let token = "";     //To use infura

const HDWalletProvider = require('truffle-hdwallet-provider');

module.exports = {
  networks: {
    development: {        // Ganache
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    ropsten: {
      provider: new HDWalletProvider(mnemonic, 'https://ropsten.infura.io/' + token, 0),
      network_id: 3,
      gas: 4700000
    }

  }
};
```

mnemonic for your wallet. Use the same mnemonic from ganache, to use local publish.
token to use infura, to publish at testnet.
If you don't have a Infura token, you can get it [here](https://infura.io/register)


## Running
At command prompt, run
```
truffle develop
```

At truffle console, run
```
compile
migrate
```

You can check the tests, at truffle console:
```
test
```

## Using with SolWallet

At SolWallet/src/EthereumSetup.js
Change contractAddress to address of your contract after migrate.






