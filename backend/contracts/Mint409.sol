////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
//                                                                                                            //
//                            ┴┴┴┴┴┴┴┘        "┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴`        "┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴                   //
//                        ▐▒▒▓▓▓▓▓▓▓▓▌     ╠▒╠▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▀╠╠░  ╠▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▌╠╠                //
//                     ╠▄▄▄▄▓▓▓▓▓▓▓▓▓▌     ╠▄▓▓▓▓▓▓▀▀▀▀▀▀▀▀▀▓▓▓▓▄▓▓▌ ▐▄▓▓▓▓▓▓▓▀▀▀▀▀▀▀▀▓▓▓▓▓▄▄▓                //
//                 ,▄▄▄▓▓▓▓▓▓▓▓▓▓▓▓▓▓▌    ╙▓▓▓▓▓▓▓▓▀┴┴┴┴┴┴┴▀▓▓▓▓▓▓▓▄ ║▓▓▓▓▓▓▓▓┴┴┴┴┴┴┴┴▓▓▓▓▓▓▓▓▄               //
//              ╓▄▄▄▄▄▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▄,,╓ ╙▓▓▓▓▓▓▓▓░"""""""▀▓▓▓▓▓▓▓▄ ▀▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓╕               //
//              ╟▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓███ `▓▓▓▓▓▓▓▓        ╠▓▓▓▓▓▓▓█    `▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓m               //
//              ╟▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ,▓▓▓▓▓▓▓▓        ║▓▓▓▓▓▓▓█    ,,,,,,,,,,,,,,▓▓▓▓▓▓▓▓∩               //
//             ╓▄▄▄▄▄▄▄▄▄▄▄▄▄▄▓▓▓▓▓▓▓▓▄▄  ▄▓▓▓▓▓▓▓▀        ▄▓▓▓▓▓▓▓▀    ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▓▓▓▓▓▓▓▓┘               //
//             .--╓╓╓╓╓╓╓╓╓-4▄▓▓▓▓▓▓▓▓╓,  ▄▓▓▓▓▓▓▓▓"¬¬¬¬¬¬╔▓▓▓▓▓▓▓▓▀      ¬  ¬    9▓▀▓▓▓▓▓▓▓▓▓┘               //
//                           ╣▓▓▓▓▓▓▓▌    #███▓▓▓▓▓▀▀▀▀▀▀▀▓▓▓▓▓▓▓██▀     ▀▀▀▀▀▀▀▀▀▓▓▓▓▓▓███+-                 //
//                           ██▀▀▀▀█▀     *~!^█▀▀▀▀▀▀▀▀▀▀▀▀█████▀0≈     ⁿ▀▀▀▀▀▀▀▀▀▀▀█▀▀▀ªªº=%                 //
//                           ┴"┴┴┴┴┴`     ╙┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴^     "┴┴┴┴┴┴┴┴┴""""┴┴┴┘                    //
//                           """""""         `"""""""""""""""""                `"""""""""                     //
//                                                                                                            //
//                                                                             cuatroceronueve                //
//                                                                                                            //
//                                                                                                            //
//                                                                                                            //
//                                                                                                            //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/interfaces/IERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract Mint409 is IERC721, ERC721URIStorage, Ownable, ReentrancyGuard{
    string public baseURI;       
    bytes32 private whitelistMerkleRoot;    
    uint256 [] private tokenMintedID;
    uint256 public tokenCount = 0;    
    uint256 immutable public maxSupply = 409;

    struct token {
        uint tokenId;    
        address owner;
    }

    token [] public tokenMintedOwners;    
    mapping(address => bool) public claimed;
    mapping(address => uint256) public tokenAvatar;    

    event newTokenMinted(address indexed owner, uint256 id); 

    constructor(string memory initBaseURI) ERC721("409 AMIGOS", "AMIGO") {
        baseURI = initBaseURI;
    }
    
    modifier isValidMerkleProof(bytes32[] calldata merkleProof, bytes32 root) {
        require(
            MerkleProof.verify(
                merkleProof,
                root,
                keccak256(abi.encodePacked(msg.sender))
            ),
            "Address does not exist in whitelist"
        );
        _;
    }

    function verifyMerkleTree(bytes32[] calldata merkleProof)
        public
        view
        returns (bool)
    {
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));

        return MerkleProof.verify(merkleProof, whitelistMerkleRoot, leaf);
    }

    function mint(bytes32[] calldata merkleProof, uint256 tokenId)
        public   
        isValidMerkleProof(merkleProof, whitelistMerkleRoot)
        nonReentrant
    {
        require(tokenCount <= maxSupply, "Maximum number of tokens allowed was reached (409)");
        require(!claimed[msg.sender], "Only one token is allowed per address");
        
        _mint(msg.sender, tokenId);
        
        tokenCount++;
        tokenMintedID.push(tokenId);
        tokenAvatar[msg.sender] = tokenId;

        token memory minting = token(tokenId, msg.sender);
        tokenMintedOwners.push(minting);

        if(owner() != msg.sender) 
            claimed[msg.sender] = true;
            
        emit newTokenMinted(msg.sender, tokenId); 
    }

    function transfer(address addressMint, uint256 tokenId)
        public        
        nonReentrant
    {
        require(tokenCount <= maxSupply, "Maximum number of tokens allowed was reached (409)"); 
        
        _mint(addressMint, tokenId);   

        tokenCount++;
        tokenMintedID.push(tokenId);
        tokenAvatar[addressMint] = tokenId;

        token memory minting = token(tokenId, addressMint);
        tokenMintedOwners.push(minting);

        emit newTokenMinted(addressMint, tokenId); 
    }
    
    function tokenURI(uint256 tokenId)
      public
      view
      virtual
      override
      returns (string memory)
    {
      require(_exists(tokenId), "Error: Query for nonexistent token");
      return string(abi.encodePacked(baseURI, Strings.toString(tokenId), ".json"));
    }
    
    function getListTokenID() public view returns (uint256 [] memory){
        return tokenMintedID;
    }

    function getListTokenOwners() public view returns (token [] memory){
        return tokenMintedOwners;
    }

    function setBaseURI(string memory updateBaseURI) public onlyOwner {
        baseURI = updateBaseURI;
    }

    function setWhitelistMerkleRoot(bytes32 merkleRoot) external onlyOwner {
        whitelistMerkleRoot = merkleRoot;
    } 
}