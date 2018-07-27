import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import { token, web3 } from "./EthereumSetup";



class App extends Component {

    constructor(props){
        super(props)
    
        this.state={
            name: "",
            symbol: "",
            decimals: "",
            totalSupply: "",
            balance: "",     
            addressTo: "", 
            amount: "", 
            balanceOfAddress: "", 
            balanceOfValue: "", 
            sendToAddress: "", 
            statusAsk: "",
            statusTransfer: ""
        }
        
      }  


    async componentDidMount() {
        const accounts = await web3.eth.getAccounts();
        const balance = web3.utils.fromWei(await token.methods.balanceOf(accounts[0]).call());
        const name = await token.methods.name().call();
        const symbol = await token.methods.symbol().call();
        const decimals = await token.methods.decimals().call();
        const totalSupply = web3.utils.fromWei(await token.methods.totalSupply().call());
        console.log ('Token name: ', name);

        this.setState({ balance, name, symbol, decimals, totalSupply });
    }

    transfer = async event => {
        event.preventDefault();
        this.setState({ 
            statusTransfer: "Transfer in progress...",
            statusAsk: "",
            sendToAddress: "",
            balanceOfAddress: "",
            balanceOfValue: ""            
        });
        try {
        const accounts = await web3.eth.getAccounts();
        const tx = await token.methods
            .transfer(this.state.addressTo, web3.utils.toWei(this.state.amount))
            .send({ from: accounts[0] });
        const balance = web3.utils.fromWei(await token.methods.balanceOf(accounts[0]).call());
        const balanceOfValue = web3.utils.fromWei(await token.methods.balanceOf(this.state.addressTo).call()) + ' ' + this.state.symbol;
        this.setState({
            statusTransfer: "TxHash: " + tx.transactionHash,
            balance: balance,
            balanceOfAddress: this.state.addressTo,
            balanceOfValue: balanceOfValue            
        });
        } catch (error) {
        this.setState({ statusTransfer: error.message });
        }
    };

    getBalance = async event => {
        let balanceOfValue = web3.utils.fromWei(await token.methods.balanceOf(this.state.balanceOfAddress).call()) + ' ' + this.state.symbol;
        console.log ('Balance of ', this.state.balanceOfAddress, ' is ', balanceOfValue);
        this.setState({balanceOfValue});
    };

    askTokens = async event => {
        event.preventDefault();
        this.setState({             
            statusAsk: "Asking in progress...",
            statusTransfer: "",
            addressTo: "",
            amount: "",
            balanceOfAddress: "",
            balanceOfValue: ""
        });
        try {
            const accounts = await web3.eth.getAccounts();
            const tx = await token.methods
            .ask(this.state.sendToAddress)
            .send({ from: accounts[0] });
            const balanceOfValue = web3.utils.fromWei(await token.methods.balanceOf(this.state.sendToAddress).call()) + ' ' + this.state.symbol;
            const balance = web3.utils.fromWei(await token.methods.balanceOf(accounts[0]).call());
            this.setState({
            statusAsk: "TxHash: " + tx.transactionHash,
            balance: balance,
            balanceOfAddress: this.state.sendToAddress,
            balanceOfValue: balanceOfValue
            });
        } catch (error) {
            this.setState({ statusAsk: error.message });
        }
    };


    render() {    
        
        return (

        <div className="App">

            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">{this.state.name}</h1>          
                <h3 className="App-intro">Symbol: {this.state.symbol} {' - '} Decimals: {this.state.decimals} {' - '} Total supply: {this.state.totalSupply} </h3>
            </header>
            <h4 >Your token balance at select Metamask account is {this.state.balance} {' '} {this.state.symbol} </h4>

            <form onSubmit={this.askTokens}>
                <h3>Ask for tokens</h3>
                <p>If you have less then 100  {this.state.symbol}, you can ask for tokens and you will win 10 tokens </p>
                <div>
                    <label>Send to address: </label> {'  '}
                    <input className="App-address"
                        value={this.state.sendToAddress}
                        onChange={event => this.setState({ sendToAddress: event.target.value })}
                    />
                    {' '}
                    <button className="App-button" disabled={!this.state.sendToAddress} >Ask for tokens</button>    
                    <p>{this.state.statusAsk}</p>        
                </div>         
            </form>
            <br/>

            <form onSubmit={this.transfer} >
                <h3>Transfer tokens</h3>
                <div>
                    <label>Address: </label> {'  '}
                    <input className="App-address"
                    value={this.state.addressTo}
                    onChange={event => this.setState({ addressTo: event.target.value })}
                    />
                </div>
                <div>
                    <label>Amount: </label> {'  '}
                    <input className="App-amount"
                    value={this.state.amount}
                    onChange={event => this.setState({ amount: event.target.value })}
                    />
                </div>
                <button className="App-button" disabled={!this.state.addressTo && !this.state.amount}>Transfer</button>
                <p>{this.state.statusTransfer}</p>        
            </form>

            <br/>


            <h3>Check balance</h3>
            <div>
                <label>Balance of address: {' '}</label>
                <input className="App-address"
                    value={this.state.balanceOfAddress}
                    onChange={event => this.setState({ balanceOfAddress: event.target.value })}
                />
                {' '}
                <button className="App-button" onClick={ this.getBalance } disabled={!this.state.balanceOfAddress}> Get balance </button>
                <p> {this.state.balanceOfValue} </p>               
            </div>


        </div>

        );
    }
}

export default App;
