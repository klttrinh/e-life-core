pragma solidity >=0.8.9;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract SpecialUnitNFT is ERC721, Ownable {
    uint256 public nextTokenId;
    address public regionManager;

    event NFTMinted(address indexed to, uint256 indexed tokenId);
    event RegionManagerSet(address indexed regionManager);

    constructor() ERC721('SpecialUnitNFT', 'SUNFT') {}

    function setRegionManager(address _regionManager) external onlyOwner {
        require(_regionManager != address(0), 'Invalid RegionManager address');
        regionManager = _regionManager;
        emit RegionManagerSet(_regionManager);
    }

    /**
     * @dev Mint một NFT mới. Chỉ RegionManager mới có thể gọi.
     * @param to Địa chỉ nhận NFT.
     */
    function mint(address to) external returns (uint256) {
        require(msg.sender == regionManager, 'Only RegionManager can mint');
        uint256 tokenId = nextTokenId;
        _safeMint(to, tokenId);
        emit NFTMinted(to, tokenId);
        nextTokenId += 1;
        return tokenId;
    }

    function burn(uint256 tokenId) external {
        require(msg.sender == regionManager, 'Only RegionManager can burn');
        _burn(tokenId);
    }

    function ownerOf(uint256 tokenId) public view override returns (address) {
        return ERC721.ownerOf(tokenId);
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            'ERC721: transfer caller is not owner nor approved'
        );
        _transfer(from, to, tokenId);
    }
}
