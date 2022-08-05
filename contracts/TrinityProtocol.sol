// SPDX-License-Identifier: MIT LICENSE
pragma solidity ^0.8.0;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./TrinityRegistry.sol";

contract TrinityProtocol is ERC721A, Ownable, ReentrancyGuard {
    // limits
    uint256 public maxPerTransaction = 8000;
    uint256 public maxPerWallet = 8000;
    uint256 public maxTotalSupply = 8000;
    uint256 public currentMaturity = 1659671309;
    mapping(address => uint256) public maxSupply;
    mapping(address => uint256) public mintPrice;
    mapping(address => uint256) public interest;
    struct Bond {
        address token;
        address atoken;
        uint256 principal;
        uint256 maturity;
    }
    mapping(uint256 => Bond) public bondType;

    address public withdrawAddress = address(0);
    bool public active = true;

    // metadata
    string public baseURI;
    string public nftName = "testbond";
    string public nftSymbol = "TESTBOND";

    TrinityRegistry private trinityRegistry;

    constructor() ERC721A(nftName, nftSymbol) {
        trinityRegistry = new TrinityRegistry();
    } 

    function mintPublic(uint256 amount, address tokenAddress) external payable nonReentrant {
        require(amount > 0, "You must mint at least one");
        require(totalSupply() + amount <= maxTotalSupply, "Exceeds total supply");
        require(amount <= maxPerTransaction, "Exceeds max per transaction");
        require(trinityRegistry.getToken(tokenAddress) != address(0), "Token uneligible");
        require(active, "Bond sale not open");

        uint256 price = mintPrice[tokenAddress];
        uint256 totalAmount = amount * price;

        if (tokenAddress == trinityRegistry.getEthToken()) {
            require(totalAmount  <= msg.value, "Not enough ETH sent for selected amount");
            (bool success, ) = trinityRegistry.getLendingPool().call{ value: msg.value }(abi.encodeWithSignature("deposit(address,uint256,uint16)", tokenAddress, totalAmount, 0));
            if (!success) {
                revert();
            }
        } else {
            IERC20(tokenAddress).transferFrom(msg.sender, address(this), totalAmount);
            IERC20(tokenAddress).approve(trinityRegistry.getLendingPoolCore(), totalAmount);
            (bool success, ) = trinityRegistry.getLendingPool().call{ value: 0 }(abi.encodeWithSignature("deposit(address,uint256,uint16)", tokenAddress, totalAmount, 0));
            if (!success) {
                revert();
            }
        }
        for (uint256 i = 0; i < amount; i++) {
            bondType[i + _nextTokenId()] = Bond(tokenAddress, trinityRegistry.getToken(tokenAddress), price, currentMaturity);
        }
        _safeMint(msg.sender, amount);
    }

    function claimDividend() external {
        // we use ecrecover to distribute dividends
        // remember to prevent replay attack
    }

    function burn(uint256 tokenId) external nonReentrant {
        require(msg.sender == ownerOf(tokenId), "You do not own this bond");
        require(block.timestamp > bondType[tokenId].maturity, "Bond has yet to mature");
        IERC20(bondType[tokenId].atoken).approve(trinityRegistry.getLendingPoolCore(), bondType[tokenId].principal);
        (bool success, ) = bondType[tokenId].atoken.call(abi.encodeWithSignature("redeem(uint256)", bondType[tokenId].principal));
        if (!success) {
            revert();
        }
        IERC20(bondType[tokenId].token).transfer(msg.sender, bondType[tokenId].principal);
        _burn(tokenId);
    }

    function _verifyMessage(bytes32 _hashedMessage, uint8 _v, bytes32 _r, bytes32 _s) public pure returns (address) {
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHashMessage = keccak256(abi.encodePacked(prefix, _hashedMessage));
        address signer = ecrecover(prefixedHashMessage, _v, _r, _s);
        return signer;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function withdraw() external onlyOwner {
        require(withdrawAddress != address(0), "No withdraw address");
        payable(withdrawAddress).transfer(address(this).balance);
    }

    function setCurrentMaturity(uint256 _currentMaturity) external onlyOwner {
        currentMaturity = _currentMaturity;
    }

    function setActive(bool _active) external onlyOwner {
        active = _active;
    }

    function setMintPrice(uint256 _mintPrice, address tokenAddress) external onlyOwner {
        mintPrice[tokenAddress] = _mintPrice;
    }

    function setMaxTotalSupply(uint256 _maxTotalSupply) external onlyOwner {
        maxTotalSupply = _maxTotalSupply;
    }

    function setMaxPerTransaction(uint256 _maxPerTransaction) external onlyOwner {
        maxPerTransaction = _maxPerTransaction;
    }

    function setMaxPerWallet(uint256 _maxPerWallet) external onlyOwner {
        maxPerWallet = _maxPerWallet;
    }

    function setBaseURI(string memory _newBaseURI) external onlyOwner {
        baseURI = _newBaseURI;
    }

    function setWithdrawAddress(address _withdrawAddress) external onlyOwner {
        withdrawAddress = _withdrawAddress;
    }
}
