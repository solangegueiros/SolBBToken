pragma solidity 0.4.24;

import 'openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol';
import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';


/**
 * @title SolBBToken is a Standard ERC20 token
 *
 * @dev SolBBToken is a Standard ERC20 token to Brickblock Coding Challenge - Ethereum
 *  All tokens are pre-assigned to the creator.
 *  They can distribute these tokens later, as they wish, using 'transfer' and other 'ERC20 StandardToken' functions.
 * 
 * Using:
 *  Truffle
 *  StandardToken from OpenZeppelin
 *  StandardToken is    
 *      ERC20 (interface) is ERC20Basic (interface)
 *      BasicToken is ERC20Basic (interface) and SafeMath
 *  SafeMath is very important to do math operations using uint256 with safety checks
 *  Ownable are functions to manipulate the ownership 
 */
 
/* , Ownable */
contract SolBBToken is StandardToken {

  /**
   * @dev Token's name.
   */
    string public constant name = "Sol Brickblock token ";

  /**
   * @dev Token's symbol.
   *    This is the number of tokens created when this contract is deployed.
   */
    string public constant symbol = "SOLBB";

  /**
   * @dev Token's decimals.
   *    It determines the degree to which this token can be subdivided. 
   */
    uint8 public constant decimals = 18;

  /**
   * @dev Token's initial supply.
   *    This is the number of tokens created when this contract is deployed.
   */
    uint256 public constant initial_supply = 1000000 * (10 ** uint256(decimals));

  /**
   * @dev Constructor that gives msg.sender all of existing tokens.
   */
    constructor() public {
        totalSupply_ = initial_supply;
        balances[msg.sender] = initial_supply;
        emit Transfer(address(0), msg.sender, initial_supply);
    }

}
