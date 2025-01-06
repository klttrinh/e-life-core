// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import {ISpecialUnitNFT} from '../token/ERC721/interfaces/INFT.sol';

contract RegionManager is Ownable {
    enum Faction {
        None,
        Sauron,
        Gandalf
    }
    struct Region {
        uint256 istarStaked;
        uint256 ringStaked;
        uint256 nftCount;
        Faction controlledBy;
    }

    Region[] public regions;

    uint256 public deltaIncreasePercentage = 10;

    mapping(uint256 => Faction) public nftFaction;

    address public nftContract;

    event NFTAllocated(
        uint256 indexed regionId,
        uint256 nftCount,
        Faction faction
    );
    event FactionControlChanged(uint256 indexed regionId, Faction newFaction);

    event DeltaIncreasePercentageUpdated(uint256 newPercentage);

    constructor(uint256 _numberOfRegions, address _nftContract) {
        for (uint256 i = 0; i < _numberOfRegions; i++) {
            regions.push(Region(0, 0, 0, Faction.None));
        }
        nftContract = _nftContract;
    }

    function allocateNFT(
        uint256 _regionId,
        uint256 _tokenId,
        Faction _faction
    ) external {
        require(_regionId < regions.length, 'Invalid region ID');
        require(
            _faction == Faction.Sauron || _faction == Faction.Gandalf,
            'Invalid faction'
        );

        ISpecialUnitNFT nft = ISpecialUnitNFT(nftContract);
        require(nft.ownerOf(_tokenId) == msg.sender, 'You do not own this NFT');
        nft.transferFrom(msg.sender, address(this), _tokenId);

        regions[_regionId].nftCount += 1;

        nftFaction[_tokenId] = _faction;

        _updateRegionFaction(_regionId);

        emit NFTAllocated(_regionId, regions[_regionId].nftCount, _faction);
    }

    /**
     * @dev Hàm cập nhật phe kiểm soát khu vực dựa trên số lượng stake và NFTs.
     * @param _regionId ID của khu vực.
     */
    function _updateRegionFaction(uint256 _regionId) internal {
        require(_regionId < regions.length, 'Invalid region ID');
        uint256 requiredDelta = getRequiredDelta(_regionId);
        uint256 delta;
        Faction newFaction;

        if (regions[_regionId].istarStaked > regions[_regionId].ringStaked) {
            delta =
                regions[_regionId].istarStaked -
                regions[_regionId].ringStaked;
            if (delta >= requiredDelta) {
                newFaction = Faction.Gandalf;
            } else {
                newFaction = Faction.None;
            }
        } else {
            delta =
                regions[_regionId].ringStaked -
                regions[_regionId].istarStaked;
            if (delta >= requiredDelta) {
                newFaction = Faction.Sauron;
            } else {
                newFaction = Faction.None;
            }
        }

        // Cập nhật phe kiểm soát nếu có sự thay đổi
        if (regions[_regionId].controlledBy != newFaction) {
            regions[_regionId].controlledBy = newFaction;
            emit FactionControlChanged(_regionId, newFaction);
        }
    }

    /**
     * @dev Gỡ bỏ một NFT khỏi khu vực, giảm số lượng NFT và delta token cần thiết.
     * Nếu phe của NFT vẫn kiểm soát khu vực, NFT sẽ được chuyển trả lại cho chủ sở hữu.
     * Nếu phe của NFT không kiểm soát khu vực, NFT sẽ bị đốt.
     * @param _regionId ID của khu vực.
     * @param _tokenId ID của NFT.
     */
    function deallocateNFT(
        uint256 _regionId,
        uint256 _tokenId
    ) external onlyOwner {
        require(_regionId < regions.length, 'Invalid region ID');
        require(regions[_regionId].nftCount > 0, 'No NFTs to deallocate');

        // Lấy phe của NFT
        Faction faction = nftFaction[_tokenId];
        require(
            faction == Faction.Sauron || faction == Faction.Gandalf,
            'Invalid faction for NFT'
        );

        // Xác định phe kiểm soát hiện tại của khu vực
        Faction currentController = determineControl(_regionId);
        Faction currentFaction;

        if (currentController == Faction.Sauron) {
            currentFaction = Faction.Sauron;
        } else if (currentController == Faction.Gandalf) {
            currentFaction = Faction.Gandalf;
        } else {
            currentFaction = Faction.None;
        }

        // Giảm số lượng NFT trong khu vực
        regions[_regionId].nftCount -= 1;

        ISpecialUnitNFT nft = ISpecialUnitNFT(nftContract);

        if (faction == currentFaction) {
            address owner = msg.sender;
            nft.transferFrom(address(this), owner, _tokenId);
        } else {
            nft.burn(_tokenId);
        }

        // Xóa mapping phe của NFT
        delete nftFaction[_tokenId];

        emit FactionControlChanged(_regionId, currentFaction);
    }

    function setDeltaIncreasePercentage(
        uint256 _newPercentage
    ) external onlyOwner {
        deltaIncreasePercentage = _newPercentage;
        emit DeltaIncreasePercentageUpdated(_newPercentage);
    }

    function getRequiredDelta(uint256 _regionId) public view returns (uint256) {
        require(_regionId < regions.length, 'Invalid region ID');
        uint256 baseDelta = 1000;
        uint256 increase = (baseDelta *
            regions[_regionId].nftCount *
            deltaIncreasePercentage) / 100;
        return baseDelta + increase;
    }

    function determineControl(uint256 _regionId) public view returns (Faction) {
        require(_regionId < regions.length, 'Invalid region ID');
        uint256 requiredDelta = getRequiredDelta(_regionId);
        uint256 delta;
        Faction controller;

        if (regions[_regionId].istarStaked > regions[_regionId].ringStaked) {
            delta =
                regions[_regionId].istarStaked -
                regions[_regionId].ringStaked;
            if (delta >= requiredDelta) {
                controller = Faction.Gandalf;
            } else {
                controller = Faction.None;
            }
        } else {
            delta =
                regions[_regionId].ringStaked -
                regions[_regionId].istarStaked;
            if (delta >= requiredDelta) {
                controller = Faction.Sauron;
            } else {
                controller = Faction.None;
            }
        }

        return controller;
    }

    function getNFTCount(uint256 _regionId) external view returns (uint256) {
        require(_regionId < regions.length, 'Invalid region ID');
        return regions[_regionId].nftCount;
    }

    function getRegionInfo(
        uint256 _regionId
    ) external view returns (uint256 istar, uint256 ring, uint256 nft, Faction faction) {
        require(_regionId < regions.length, 'Invalid region ID');
        Region storage region = regions[_regionId];
        return (
            region.istarStaked,
            region.ringStaked,
            region.nftCount,
            region.controlledBy
        );
    }

    function updateStaking(
        uint256 _regionId,
        address _token,
        uint256 _amount
    ) external onlyOwner {
        require(_regionId < regions.length, 'Invalid region ID');
        if (_token == address(istarToken)) {
            regions[_regionId].istarStaked += _amount;
        } else if (_token == address(ringToken)) {
            regions[_regionId].ringStaked += _amount;
        }
        _updateRegionFaction(_regionId);
    }

    // Địa chỉ của các token
    address public istarToken;
    address public ringToken;

    /**
     * @dev Hàm thiết lập các token. Chỉ chủ sở hữu có thể gọi.
     * @param _istarToken Địa chỉ của token $ISTAR.
     * @param _ringToken Địa chỉ của token $RING.
     */
    function setTokens(
        address _istarToken,
        address _ringToken
    ) external onlyOwner {
        require(
            _istarToken != address(0) && _ringToken != address(0),
            'Invalid token addresses'
        );
        istarToken = _istarToken;
        ringToken = _ringToken;
    }
}
