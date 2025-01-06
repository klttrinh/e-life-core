// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

interface ISpecialUnitNFT {
    // Events
    event NFTMinted(address indexed to, uint256 indexed tokenId);
    event RegionManagerSet(address indexed regionManager);

    // Public state variables
    function nextTokenId() external view returns (uint256);

    function regionManager() external view returns (address);

    // Functions
    function setRegionManager(address _regionManager) external;

    function mint(address to) external returns (uint256);

    function burn(uint256 tokenId) external;

    function ownerOf(uint256 tokenId) external view returns (address);

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;
}
