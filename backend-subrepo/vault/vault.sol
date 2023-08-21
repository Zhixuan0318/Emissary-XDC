//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract YLVault is Ownable{
    IERC721 private ylNFTERC721;
    IERC1155 private ylNFTERC1155;
    IERC20 private ylERC20;
    address private treasuryAddress;

    mapping(address => address) public vaultContract;

    event RevertNftToWalletCommissionSetted(uint256 SettedFee, uint256 SettedTime);
    event DepositedNftFromWalletToVaultERC721(address FromAddress, address GamerAddress, address VaultAddress, uint256 TokenId, uint256 DepositedTime);
    event DepositedNftFromWalletToVaultERC1155(address FromAddress, address GamerAddress, address VaultAddress, uint256 TokenId, uint256 Amount, uint256 DepositedTime);

    constructor(IERC721 _ylNFTERC721, IERC1155 _ylNFTERC1155, IERC20 _ylERC20) {
        ylNFTERC721 = _ylNFTERC721;
        ylNFTERC1155 = _ylNFTERC1155;
        ylERC20 = _ylERC20;
        treasuryAddress = owner();
    }

    function storeNftFromWalletToVaultERC721(address gamerAddress, uint256[] memory _tokenIds) external {
        require(_tokenIds.length > 0, "It mustn't 0");
    
        if(vaultContract[gamerAddress] == address(0x0)) {
            Vault newVault = new Vault(ylNFTERC721, ylNFTERC1155, ylERC20, treasuryAddress);
            vaultContract[gamerAddress] = address(newVault);
        }
        for(uint i = 0; i < _tokenIds.length; i++)
        {
            ylNFTERC721.transferFrom(msg.sender, vaultContract[gamerAddress], _tokenIds[i]);
            emit DepositedNftFromWalletToVaultERC721(msg.sender, gamerAddress, vaultContract[gamerAddress], _tokenIds[i], block.timestamp);
        }
    }

    function storeNftFromWalletToVaultERC1155(address gamerAddress, uint256 _tokenId, uint256 _amount) external {
        require(_amount > 0, "It mustn't 0");
    
        if(vaultContract[gamerAddress] == address(0x0)) {
            Vault newVault = new Vault(ylNFTERC721, ylNFTERC1155, ylERC20, treasuryAddress);
            vaultContract[gamerAddress] = address(newVault);
        }
        
        ylNFTERC1155.safeTransferFrom(msg.sender, vaultContract[gamerAddress], _tokenId, _amount, "");
        emit DepositedNftFromWalletToVaultERC1155(msg.sender, gamerAddress, vaultContract[gamerAddress], _tokenId, _amount, block.timestamp);
    }

    function setRevertNftToWalletCommision(uint256 _fee) public onlyOwner returns(uint256){
        emit RevertNftToWalletCommissionSetted(_fee, block.timestamp);
        return _fee;
    }
    
}

contract Vault{

    IERC721 private ylNFTERC721;
    IERC1155 private ylNFTERC1155;
    IERC20 private ylERC20;

    address private treasuryAddress;

    event RevertTransferNftFromVaultToWalletERC721(address VaultAddress, address GamerAddress, uint256 NFTID, uint256 FeeAmount, uint256 RevertedTime);
    event RevertTransferNftFromVaultToWalletERC1155(address VaultAddress, address GamerAddress, uint256 NFTID, uint256 Amount, uint256 FeeAmount, uint256 RevertedTime);

    constructor(IERC721 _ylNFTERC721, IERC1155 _ylNFTERC1155, IERC20 _ylERC20, address _treasuryAddress) {
        ylNFTERC721 = _ylNFTERC721;
        ylNFTERC1155 = _ylNFTERC1155;
        ylERC20 = _ylERC20;
        treasuryAddress = _treasuryAddress;
    }

    function revertNftFromVaultToWalletERC721(uint256[] memory _tokenIds, uint256 _feePerNFT) external {
        require(_tokenIds.length > 0, "It mustn't 0");
        uint256 _fee = _feePerNFT * _tokenIds.length;
        require(ylERC20.balanceOf(msg.sender) >= _fee, "Insufficient balance for fee");
        ylERC20.transferFrom(msg.sender, treasuryAddress, _fee);

        for(uint i=0; i < _tokenIds.length; i++) {
            ylNFTERC721.transferFrom(address(this), msg.sender, _tokenIds[i]); 
            emit RevertTransferNftFromVaultToWalletERC721(address(this), msg.sender, _tokenIds[i], _feePerNFT, block.timestamp);
        }
    }

    function revertNftFromVaultToWalletERC1155(uint256 _tokenId, uint256 _amount, uint256 _feePerNFT) external {
        require(_amount > 0, "It mustn't 0");
        uint256 _fee = _feePerNFT * _amount;
        require(ylERC20.balanceOf(msg.sender) >= _fee, "Insufficient balance for fee");
        ylERC20.transferFrom(msg.sender, treasuryAddress, _fee);

        ylNFTERC1155.safeTransferFrom(address(this), msg.sender, _tokenId, _amount, "");
        emit RevertTransferNftFromVaultToWalletERC1155(address(this), msg.sender, _tokenId, _amount, _fee, block.timestamp);
    }
}