//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Marketplace {
    string public name;
    uint256 public productCount = 0;
    mapping(uint256 => Product) public products;

    struct Product {
        uint256 id;
        string name;
        uint256 price;
        address owner;
        bool purchased;
    }

    event ProductCreated(
        uint256 id,
        string name,
        uint256 price,
        address owner,
        bool purchased
    );

    constructor() public {
        name = "Apollo Marketplace";
    }

    function createProduct(string memory _name, uint256 _price) public {
        require(bytes(_name).length > 0);
        require(_price > 0);
        productCount++;
        products[productCount] = Product(
            productCount,
            _name,
            _price,
            msg.sender,
            false
        );
        emit ProductCreated(productCount, _name, _price, msg.sender, false);
    }

    function purchaseProduct(uint256 _id) public {
        Product memory _product = products[_id];
        address _seller = _prouct.owner;
        _product.owner = msg.sender;
        _product.purchased = true;
        products[_id] = _product; // 1:07:22
    }
}
