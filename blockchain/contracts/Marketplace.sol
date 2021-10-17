//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Marketplace {
    string public name;
    string public desc;
    uint256 public productCount = 0;
    mapping(uint256 => Product) public products;
    mapping(address => uint256[]) public buyers;

    struct Product {
        uint256 id;
        string name;
        uint256 price;
        string desc;
        string fileURL;
        address seller;
    }

    event ProductCreated(
        uint256 id,
        string name,
        uint256 price,
        string desc,
        string fileURL,
        address seller
    );

    event ProductPurchased(
        uint256 id,
        string name,
        uint256 price,
        address seller
    );

    constructor() public {
        name = "Apollo Marketplace";
    }

    function createProduct(
        string memory _name,
        uint256 _price,
        string memory _desc,
        string memory _fileURL
    ) public {
        require(bytes(_name).length > 0);
        require(bytes(_desc).length > 0);
        require(_price > 0);
        products[productCount] = Product(
            productCount,
            _name,
            _price,
            _desc,
            _fileURL,
            payable(msg.sender)
        );
        productCount++;
        emit ProductCreated(
            productCount,
            _name,
            _price,
            _desc,
            _fileURL,
            payable(msg.sender)
        );
    }

    function getBuyerLength() public view returns (uint256) {
        return buyers[msg.sender].length;
    }

    function purchaseProduct(uint256 _id) public payable {
        // Get the product
        Product memory _product = products[_id];

        // Find the seller(product.seller), in order to pay them
        address _seller = _product.seller;
        // Verify product exists
        // transfer ether to seller from buyer
        //(bool sent, bytes memory data) = _seller.call{value: msg.value}("");
        //require(sent, "Failed to send Ether");
        // require(_product.id > 0 && _product.id < productCount);
        // require(msg.value >= _product.price);
        // require(!_product.purchased);
        // require(_seller != msg.sender);
        payable(_seller).transfer(msg.value); // Transfer ether to seller from buyer

        // Record the sale here
        buyers[msg.sender].push(_id);

        emit ProductPurchased(
            productCount,
            _product.name,
            _product.price,
            payable(msg.sender)
        );
    }
}
