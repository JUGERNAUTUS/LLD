// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;


import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LemuriaLand is Ownable, ERC721Enumerable ,ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    address nftSwapExchange;

    constructor( LLandparameters[] memory LLP) ERC721("LemuriaLand", "LLD") {
        address to = msg.sender;
        PreMint(to,LLP);
    }

	struct LLandparameters {
	string coordinatesURI;
    uint plotID;
    // uint surveyNumber;
	string zone; //make an Enum later
	string URI;
    string assetType;
}

    mapping(uint256 => LLandparameters) private metadataMaster;

//event exchangeChanged(address exchange, address oldexchange);
event premintComplete(LLandparameters[] L);


    function PreMint(address to,LLandparameters[] memory LLP) internal {
        
        for (uint i=0;i<LLP.length;i++){
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId );
        _setTokenURI(tokenId, LLP[i].URI);
		metadataMaster[tokenId] = LLP[i] ;
        }

        emit premintComplete(LLP);
    }


    function fetchLandMetadata(uint256 tokenId)view  public returns(LLandparameters memory) {
        return metadataMaster[tokenId];
    }

    function _baseURI() internal pure override returns (string memory) {
        return "/ipfs/";
    }

/*
Optional - To transfer assets from contract address
    function _addExchange(address nftSwap) external onlyOwner  {
     setApprovalForAll(nftSwapExchange, false);
     setApprovalForAll(nftSwap, true);       
     nftSwapExchange = nftSwap;       
    emit exchangeChanged(nftSwap,nftSwapExchange);
  }
*/
  //Function overrides for conflicts

  function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

   function _burn(uint256 tokenId) internal override(ERC721,ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721,ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    } 
}