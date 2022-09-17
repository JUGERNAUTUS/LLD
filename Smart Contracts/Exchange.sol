// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract nftswap is Ownable {

    IERC20 private _token;
    IERC721 private _nftToken;
    

    struct baseAsset {
        address contractAddress;
        uint price;
    }

    //Token symbol of asset to contractAddress and price
    
    mapping(string => baseAsset) public baseAssets;

    constructor(address _nftAddress) { 

         _nftToken = IERC721(_nftAddress);
               
     }



    event tokenSwap(address indexed from, address indexed to, uint tokenId, string baseSymbol, uint price );
    event baseAssetAdded(string baseSymbol, address contractAddress , uint price);

    function nftSwap(uint _nftTokenId, string memory baseSymbol) external {
        require(baseAssets[baseSymbol].contractAddress != address(0), "ERC20 token cannot be used to buy LemuriaLand");

        uint _baseAmount = baseAssets[baseSymbol].price;
        _token = IERC20(baseAssets[baseSymbol].contractAddress);

        require(_token.allowance(msg.sender, address(this)) >= _baseAmount,"Token allowance too low");
        //require(_nftToken.getApproved(_nftTokenId)address(this)) >= _baseAmount,"nft Token allowance not available");


        
        _token.transferFrom(msg.sender, owner(), _baseAmount);
        _nftToken.transferFrom(owner(), msg.sender, _nftTokenId);
        emit tokenSwap(owner(), msg.sender, _nftTokenId, baseSymbol,_baseAmount);
    }


    /*
    For buying with MATIC - optional
    function nftSwap(uint _nftTokenId) public payable {
        uint _buyAmount = baseAssets[symbol].price;
        require(msg.value >=_buyAmount , "Insufficient Matic sent for buying tokens");
        payable(owner()).transfer(msg.value);
        _nftContract.safeTransferFrom(owner(),msg.sender,_nftTokenId);
        emit tokenSwap(owner(), msg.sender, _nftTokenId, _buyAmount , 0);
    }
    */

    function addBaseAsset(string memory baseSymbol, address contractAddress , uint price) onlyOwner external {
         
        baseAsset storage bA = baseAssets[baseSymbol]; 
        
        bA.contractAddress = contractAddress;
        bA.price = price;

        emit baseAssetAdded(baseSymbol, contractAddress, price);
    }


}
 
