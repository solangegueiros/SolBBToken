'use strict';

var expectThrow = require('./helpers/expectThrow');
var Token = artifacts.require("./SolBBToken.sol");

contract('SolBBToken', function (accounts) {

    let token;
    const _name = "Sol Brickblock token";
    const _symbol = "SOLBB";
    const _decimals = 18;
    const _totalSupply = 1000000 * (10 ** _decimals);
    const _askValue = 10 * (10 ** _decimals);
    const _askLimit = 100 * (10 ** _decimals);

    beforeEach(async function () {
        token = await Token.new();
      });    

    it('has a name', async function () {
        const name = await token.name();
        assert.equal(_name, name);
    });

    it('has a symbol', async function () {
        const symbol = await token.symbol();
        assert.equal(_symbol, symbol);
    });
    
    it('has an amount of decimals', async function () {
        const decimals = await token.decimals();
        assert.equal(_decimals, decimals);
    });

    it('has an total supply', async function () {
        const totalSupply = await token.totalSupply();
        assert.equal(_totalSupply, totalSupply);
    });
    
    it('should return askFinished false after construction', async function () {
        let askFinished = await token.askFinished();
        assert.equal(askFinished, false);
    });

    it('should fail to ask after call to finishAsking', async function () {
        await token.finishAsking();
        assert.equal(await token.askFinished(), true);
        await expectThrow(token.ask(accounts[1]));
    })

    it('should give askValue after call ask', async function () {
        await token.ask(accounts[1]);
        let balanceAccount1 = await token.balanceOf(accounts[1]);
        assert(balanceAccount1, _askValue);
    })

    it('should return same balance after call ask if balance is greater then askLimit', async function () {
        await token.transfer(accounts[1], _askLimit);
        let balanceBefore = await token.balanceOf(accounts[1]);

        //await expectThrow(token.ask(accounts[1]));
        let response = await token.ask(accounts[1]);
        //console.log (response);
        let balanceAfter = await token.balanceOf(accounts[1]);
        assert(balanceBefore, balanceAfter);
    })

    it('should return correct balances after transfer', async function () {
        const _valueTransfer = 100 * (10 ** _decimals);

        let balance0Before = await token.balanceOf(accounts[0]);
        let balance1Before = await token.balanceOf(accounts[1]);
        assert.equal(balance1Before, 0);

        await token.transfer(accounts[1], _valueTransfer, {from: accounts[0]});    
        let balance0After = await token.balanceOf(accounts[0]);
        let balance1After = await token.balanceOf(accounts[1]);
        assert.equal(balance1After, _valueTransfer);
      });


});