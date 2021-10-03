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
        address payable owner;
        bool purchased;
    }

    Product[] allProducts;

    event ProductCreated(
        uint256 id,
        string name,
        uint256 price,
        address payable owner,
        bool purchased
    );

    event ProductPurchased(
        uint256 id,
        string name,
        uint256 price,
        address payable owner,
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
            payable(msg.sender),
            false
        );
        emit ProductCreated(
            productCount,
            _name,
            _price,
            payable(msg.sender),
            false
        );
    }

    function purchaseProduct(uint256 _id) public payable {
        Product memory _product = products[_id]; // Get the product
        address payable _seller = _product.owner; // Get the seller
        require(_product.id > 0 && _product.id < productCount);
        require(msg.value >= _product.price);
        require(!_product.purchased);
        require(_seller != msg.sender);
        _product.owner = payable(msg.sender); // Transfer ownership(msg.sender is the user who called the function, in this case the buyer)
        _product.purchased = true; // update product
        products[_id] = _product;
        payable(_seller).transfer(msg.value); // Transfer ether to seller from buyer
        emit ProductPurchased(
            productCount,
            _product.name,
            _product.price,
            payable(msg.sender),
            true
        );
    }

    function getAllProducts() public view returns (Product[] memory) {
        return allProducts;
    }
}
