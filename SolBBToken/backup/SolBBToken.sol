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

contract SolBBToken is StandardToken, Ownable {

  /**
   * @dev When finished to ask tokens.
   */
    event AskFinished();

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
   * @dev Define if it is possible to ask tokens.
   */
    bool public askFinished = false;

  /**
   * @dev Constructor that gives msg.sender all of existing tokens.
   */
    constructor() public {
        totalSupply_ = initial_supply;
        balances[msg.sender] = initial_supply;
        emit Transfer(address(0), msg.sender, initial_supply);
    }


  /**
   * @dev Function to stop ask tokens.
   * @return True if the operation was successful.
   */
    function finishAsking() onlyOwner public returns (bool) {
        askFinished = true;
        emit AskFinished();
        return true;
    }

  /**
   * @dev Modifier to require that it is possible to ask tokens.
   */
    modifier canAsk() {
        require(!askFinished);
        _;
    }

  /**
   * @dev Function to ask tokens to owner.
   *    Owner will transfer 10 tokens every time it is called.
   *    But only if the to's balance is less then 100. 
   * @param _to The address that will receive the tokens.
   * @return A boolean that indicates if the operation was successful.
   */
    function ask(
        address _to
    )
        canAsk
        public
        returns (bool)
    {
        require(!askFinished);
        
        totalSupply_ = totalSupply_.add(_amount);
        balances[_to] = balances[_to].add(_amount);
        emit Mint(_to, _amount);
        emit Transfer(address(0), _to, _amount);
        return true;
    }


}
