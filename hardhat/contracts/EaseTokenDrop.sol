// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title EaseTokenDrop: ERC20 Token Contract with Airdrop Functionality
 * @dev Extends ERC20 and Ownable contracts
 */
contract EaseTokenDrop is ERC20, Ownable {
    /**
     * @dev Constructor to initialize the AirDrop contract
     * @param name The name of the ERC20 token
     * @param symbol The symbol of the ERC20 token
     * @param totalSupply The total supply of the ERC20 token
     */
    constructor(
        string memory name,
        string memory symbol,
        uint256 totalSupply
    ) ERC20(name, symbol) {
        _mint(msg.sender, totalSupply * 10 ** decimals());
    }

    /**
     * @dev Airdrop tokens to a list of addresses
     * @param _address Array of recipient addresses
     * @param _amount Token amount to be sent to each address
     * @return A boolean indicating the success of the airdrop
     */
    function doAirDrop(
        address[] memory _address,
        uint256 _amount
    ) public onlyOwner returns (bool) {
        uint256 count = _address.length;
        for (uint256 i = 0; i < count; i++) {
            transfer(_address[i], _amount);
        }
        return true;
    }

    /**
     * @dev Airdrop tokens with individual amounts to a list of addresses
     * @param _recipients Array of recipient addresses
     * @param _values Array of individual token amounts to be sent
     * @return A boolean indicating the success of the airdrop
     */
    function sendBatch(
        address[] memory _recipients,
        uint256[] memory _values
    ) public onlyOwner returns (bool) {
        require(_recipients.length == _values.length);
        for (uint256 i = 0; i < _values.length; i++) {
            transfer(_recipients[i], _values[i]);
        }
        return true;
    }

    /**
     * @dev Transfer the contract's ETH balance to the owner
     * @return A boolean indicating the success of the ETH transfer
     */
    function transferEthToOnwer() public onlyOwner returns (bool) {
        require(payable(owner()).send(address(this).balance));
        return true;
    }

    /**
     * @dev Fallback function to accept ETH
     */
    fallback() external payable {}

    /**
     * @dev Receive function to accept ETH
     */
    receive() external payable {}

    /**
     * @dev Function to self-destruct the contract, transferring any remaining funds to the owner
     */
    function kill() public onlyOwner {
        selfdestruct(payable(owner()));
    }
}
