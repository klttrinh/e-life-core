// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

// Import các thư viện từ OpenZeppelin
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IRegionManager {
    function determineControl(uint256 regionId) external view returns (string memory);
    function getRegionCount() external view returns (uint256);
}

interface IMultiTokenStaking {
    function getSupportedTokens() external view returns (address[] memory);
    function addStakedTokens(address _user, address _token, uint256 _amount) external;
}

contract SeasonManager is Ownable {
    // Địa chỉ của hợp đồng staking và region manager
    address public stakingContract;
    address public regionManagerContract;

    // Địa chỉ ví phát triển
    address public devWallet;

    // Tỷ lệ phí phát triển và tỷ lệ đốt token
    uint256 public devFeePercentage = 20;
    uint256 public burnPercentage = 5;

    // Thời gian kết thúc mùa chơi hiện tại
    uint256 public currentSeasonEndTime;

    // Thời gian kéo dài mỗi mùa chơi (2 tuần)
    uint256 public constant SEASON_DURATION = 2 weeks;

    // ID của mùa chơi hiện tại
    uint256 public currentSeasonId;

    // Sự kiện khi mùa chơi kết thúc
    event SeasonEnded(uint256 seasonId, string winningSide);
    event SeasonStarted(uint256 seasonId, uint256 startTime, uint256 endTime);

    /**
     * @dev Constructor để khởi tạo các địa chỉ và bắt đầu mùa chơi đầu tiên.
     * @param _stakingContract Địa chỉ của hợp đồng staking.
     * @param _regionManagerContract Địa chỉ của hợp đồng RegionManager.
     * @param _devWallet Địa chỉ ví phát triển.
     */
    constructor(
        address _stakingContract,
        address _regionManagerContract,
        address _devWallet
    ) {
        require(_stakingContract != address(0) && _regionManagerContract != address(0) && _devWallet != address(0), "Invalid addresses");
        stakingContract = _stakingContract;
        regionManagerContract = _regionManagerContract;
        devWallet = _devWallet;

        currentSeasonId = 1;
        currentSeasonEndTime = block.timestamp + SEASON_DURATION;
        emit SeasonStarted(currentSeasonId, block.timestamp, currentSeasonEndTime);
    }

    /**
     * @dev Hàm cập nhật tỷ lệ phí phát triển. Chỉ chủ sở hữu có thể gọi.
     * @param _newPercentage Tỷ lệ mới.
     */
    function setDevFeePercentage(uint256 _newPercentage) external onlyOwner {
        devFeePercentage = _newPercentage;
    }

    /**
     * @dev Hàm cập nhật tỷ lệ đốt token. Chỉ chủ sở hữu có thể gọi.
     * @param _newPercentage Tỷ lệ mới.
     */
    function setBurnPercentage(uint256 _newPercentage) external onlyOwner {
        burnPercentage = _newPercentage;
    }

    /**
     * @dev Hàm cập nhật địa chỉ ví phát triển. Chỉ chủ sở hữu có thể gọi.
     * @param _newDevWallet Địa chỉ mới.
     */
    function setDevWallet(address _newDevWallet) external onlyOwner {
        require(_newDevWallet != address(0), "Invalid dev wallet address");
        devWallet = _newDevWallet;
    }

    /**
     * @dev Hàm kết thúc mùa chơi hiện tại và bắt đầu mùa chơi mới. Chỉ chủ sở hữu có thể gọi.
     */
    function endSeason() external onlyOwner {
        require(block.timestamp >= currentSeasonEndTime, "Current season has not ended yet");

        // Xác định phe thắng
        uint256 totalRegions = IRegionManager(regionManagerContract).getRegionCount();
        uint256 sauronCount = 0;
        uint256 gandalfCount = 0;

        for (uint256 i = 0; i < totalRegions; i++) {
            string memory controller = IRegionManager(regionManagerContract).determineControl(i);
            if (keccak256(bytes(controller)) == keccak256(bytes("Sauron"))) {
                sauronCount += 1;
            } else if (keccak256(bytes(controller)) == keccak256(bytes("Gandalf"))) {
                gandalfCount += 1;
            }
        }

        string memory winningSide;
        if (sauronCount > gandalfCount) {
            winningSide = "Sauron";
        } else if (gandalfCount > sauronCount) {
            winningSide = "Gandalf";
        } else {
            winningSide = "Draw";
        }

        // Phân phối phần thưởng
        distributeRewards(winningSide);

        emit SeasonEnded(currentSeasonId, winningSide);

        // Bắt đầu mùa chơi mới
        currentSeasonId += 1;
        currentSeasonEndTime = block.timestamp + SEASON_DURATION;
        emit SeasonStarted(currentSeasonId, block.timestamp, currentSeasonEndTime);
    }

    /**
     * @dev Hàm phân phối phần thưởng dựa trên phe thắng.
     * @param _winningSide Phe thắng ("Sauron", "Gandalf", hoặc "Draw").
     */
    function distributeRewards(string memory _winningSide) internal {
        IMultiTokenStaking staking = IMultiTokenStaking(stakingContract);
        IRegionManager regionManager = IRegionManager(regionManagerContract);

        address[] memory supportedTokens = staking.getSupportedTokens();

        for (uint256 i = 0; i < supportedTokens.length; i++) {
            address token = supportedTokens[i];
            uint256 totalStaked = IERC20(token).balanceOf(stakingContract);

            // Tính toán phí phát triển và đốt token
            uint256 devFee = (totalStaked * devFeePercentage) / 100;
            uint256 burnAmount = (devFee * burnPercentage) / 100;
            uint256 devTransfer = devFee - burnAmount;

            // Chuyển phí phát triển
            require(IERC20(token).transferFrom(stakingContract, devWallet, devTransfer), "Dev fee transfer failed");

            // Đốt token
            address burnAddress = 0x000000000000000000000000000000000000dEaD;
            require(IERC20(token).transferFrom(stakingContract, burnAddress, burnAmount), "Burn transfer failed");

            // Phần còn lại sẽ được phân phối cho phe thắng
            uint256 distributable = totalStaked - devFee;

            if (keccak256(bytes(_winningSide)) == keccak256(bytes("Sauron"))) {
                // Phân phối cho phe Sauron
                // Cần xác định logic phân phối, ví dụ: phân phối theo tỷ lệ stake
                // Đây là ví dụ đơn giản, bạn cần triển khai logic phù hợp
                // staking.addStakedTokens(...);
            } else if (keccak256(bytes(_winningSide)) == keccak256(bytes("Gandalf"))) {
                // Phân phối cho phe Gandalf
                // Cần xác định logic phân phối, ví dụ: phân phối theo tỷ lệ stake
                // Đây là ví dụ đơn giản, bạn cần triển khai logic phù hợp
                // staking.addStakedTokens(...);
            }
            // Nếu hòa, có thể giữ lại trong hợp đồng hoặc chia đều
        }
    }

    /**
     * @dev Hàm lấy thời gian kết thúc mùa chơi hiện tại.
     * Hợp đồng staking sẽ gọi hàm này để xác định `unlockTime`.
     * @return Thời gian kết thúc mùa chơi hiện tại (Unix timestamp).
     */
    function getCurrentSeasonEndTime() external view returns (uint256) {
        return currentSeasonEndTime;
    }

    /**
     * @dev Hàm kiểm tra xem mùa chơi đã kết thúc hay chưa.
     * @return True nếu mùa chơi đã kết thúc, ngược lại False.
     */
    function isSeasonEnded() external view returns (bool) {
        return block.timestamp >= currentSeasonEndTime;
    }
}
