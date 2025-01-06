// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

// Import các thư viện từ OpenZeppelin
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface ISeasonManager {
    function getCurrentSeasonEndTime() external view returns (uint256);
    function isSeasonEnded() external view returns (bool);
}

interface IRegionManager {
    function updateStaking(uint256 _regionId, address _token, uint256 _amount) external;
}

contract MultiTokenStaking is Ownable {
    address public seasonManager;
    address public regionManager;

    struct StakeInfo {
        uint256 amount;
        uint256 unlockTime;
        bool claimed;
    }

    address[] public supportedTokens;

    mapping(address => bool) public isSupportedToken;

    mapping(address => mapping(address => StakeInfo[])) public stakes;

    mapping(address => mapping(address => uint256)) public totalStaked;

    mapping(address => mapping(address => uint256)) public totalClaimed;

    event Staked(address indexed user, address indexed token, uint256 amount, uint256 unlockTime);

    event Unstaked(address indexed user, address indexed token, uint256 amount);

    event SeasonManagerUpdated(address indexed oldManager, address indexed newManager);

    event RegionManagerUpdated(address indexed oldManager, address indexed newManager);

    /**
     * @dev Constructor để khởi tạo SeasonManager và RegionManager.
     * @param _seasonManager Địa chỉ của hợp đồng SeasonManager.
     * @param _regionManager Địa chỉ của hợp đồng RegionManager.
     */
    constructor(address _seasonManager, address _regionManager) {
        require(_seasonManager != address(0) && _regionManager != address(0), "Invalid manager addresses");
        seasonManager = _seasonManager;
        regionManager = _regionManager;
        emit SeasonManagerUpdated(address(0), _seasonManager);
        emit RegionManagerUpdated(address(0), _regionManager);
    }

    /**
     * @dev Modifier để chỉ cho phép SeasonManager gọi hàm.
     */
    modifier onlySeasonManager() {
        require(msg.sender == seasonManager, "Caller is not SeasonManager");
        _;
    }

    /**
     * @dev Modifier để chỉ cho phép RegionManager gọi hàm.
     */
    modifier onlyRegionManager() {
        require(msg.sender == regionManager, "Caller is not RegionManager");
        _;
    }

    /**
     * @dev Hàm cập nhật SeasonManager. Chỉ chủ sở hữu có thể gọi.
     * @param _newSeasonManager Địa chỉ SeasonManager mới.
     */
    function updateSeasonManager(address _newSeasonManager) external onlyOwner {
        require(_newSeasonManager != address(0), "Invalid SeasonManager address");
        emit SeasonManagerUpdated(seasonManager, _newSeasonManager);
        seasonManager = _newSeasonManager;
    }

    /**
     * @dev Hàm cập nhật RegionManager. Chỉ chủ sở hữu có thể gọi.
     * @param _newRegionManager Địa chỉ RegionManager mới.
     */
    function updateRegionManager(address _newRegionManager) external onlyOwner {
        require(_newRegionManager != address(0), "Invalid RegionManager address");
        emit RegionManagerUpdated(regionManager, _newRegionManager);
        regionManager = _newRegionManager;
    }

    /**
     * @dev Thêm một token mới vào danh sách hỗ trợ. Chỉ chủ sở hữu có thể gọi.
     * @param _token Địa chỉ của token ERC20.
     */
    function addSupportedToken(address _token) external onlyOwner {
        require(!isSupportedToken[_token], "Tokens are supported");
        supportedTokens.push(_token);
        isSupportedToken[_token] = true;
    }

    /**
     * @dev Xóa một token khỏi danh sách hỗ trợ. Chỉ chủ sở hữu có thể gọi.
     * @param _token Địa chỉ của token ERC20.
     */
    function removeSupportedToken(address _token) external onlyOwner {
        require(isSupportedToken[_token], "Token are not supported");
        isSupportedToken[_token] = false;

        // Tìm và xóa token khỏi mảng supportedTokens
        for (uint256 i = 0; i < supportedTokens.length; i++) {
            if (supportedTokens[i] == _token) {
                supportedTokens[i] = supportedTokens[supportedTokens.length - 1];
                supportedTokens.pop();
                break;
            }
        }
    }

    /**
     * @dev Hàm stake token. Người chơi sẽ stake token và khóa đến khi mùa chơi kết thúc.
     * @param _token Địa chỉ của token ERC20.
     * @param _amount Số lượng token muốn stake.
     */
    function stakeTokens(address _token, uint256 _amount) external {
        require(isSupportedToken[_token], "Token are not supported");
        require(_amount > 0, "The amount must be greater than 0");

        // Gửi token từ người chơi tới hợp đồng
        IERC20(_token).transferFrom(msg.sender, address(this), _amount);

        // Lấy thời gian kết thúc mùa chơi hiện tại từ SeasonManager
        ISeasonManager manager = ISeasonManager(seasonManager);
        uint256 currentSeasonEndTime = manager.getCurrentSeasonEndTime();
        require(currentSeasonEndTime > block.timestamp, "Season has ended");

        // Tạo StakeInfo mới
        StakeInfo memory newStake = StakeInfo({
            amount: _amount,
            unlockTime: currentSeasonEndTime,
            claimed: false
        });

        stakes[msg.sender][_token].push(newStake);
        totalStaked[msg.sender][_token] += _amount;

        // Cập nhật staking trong RegionManager
        // Giả sử bạn biết khu vực nào người chơi stake vào, cần truyền thêm thông tin khu vực
        // Ví dụ: updateStaking(_regionId, _token, _amount);
        // Để đơn giản, chúng ta sẽ bỏ qua phần này hoặc cần thêm thông tin khu vực khi stake

        emit Staked(msg.sender, _token, _amount, currentSeasonEndTime);
    }

    /**
     * @dev Hàm claim token đã unstake sau khi mùa chơi kết thúc.
     * @param _token Địa chỉ của token ERC20.
     * @param _stakeIndex Chỉ số của StakeInfo trong mảng stakes.
     */
    function claimTokens(address _token, uint256 _stakeIndex) external {
        require(isSupportedToken[_token], "Token are not supported");
        require(_stakeIndex < stakes[msg.sender][_token].length, "Invalid stake index");

        StakeInfo storage userStake = stakes[msg.sender][_token][_stakeIndex];
        require(!userStake.claimed, "Token has been claimed");
        require(block.timestamp >= userStake.unlockTime, "Token is still locked");

        uint256 amount = userStake.amount;
        require(amount > 0, "Invalid amount");

        userStake.claimed = true;
        totalClaimed[msg.sender][_token] += amount;

        // Chuyển token trở lại cho người chơi
        IERC20(_token).transfer(msg.sender, amount);

        emit Unstaked(msg.sender, _token, amount);
    }

    /**
     * @dev Hàm xem số lượng token đã stake của người chơi cho một token cụ thể mà vẫn đang bị khóa.
     * @param _user Địa chỉ của người chơi.
     * @param _token Địa chỉ của token ERC20.
     * @return Tổng số lượng token đã stake và chưa claim.
     */
    function getStakedAmount(address _user, address _token) external view returns (uint256) {
        uint256 total = 0;
        StakeInfo[] storage userStakes = stakes[_user][_token];
        for (uint256 i = 0; i < userStakes.length; i++) {
            if (!userStakes[i].claimed && userStakes[i].unlockTime > block.timestamp) {
                total += userStakes[i].amount;
            }
        }
        return total;
    }

    /**
     * @dev Hàm xem tổng số token đã stake của người chơi cho một token cụ thể.
     * @param _user Địa chỉ của người chơi.
     * @param _token Địa chỉ của token ERC20.
     * @return Tổng số lượng token đã stake.
     */
    function getTotalStaked(address _user, address _token) external view returns (uint256) {
        return totalStaked[_user][_token];
    }

    /**
     * @dev Hàm xem tổng số token đã claim của người chơi cho một token cụ thể.
     * @param _user Địa chỉ của người chơi.
     * @param _token Địa chỉ của token ERC20.
     * @return Tổng số lượng token đã claim.
     */
    function getTotalClaimed(address _user, address _token) external view returns (uint256) {
        return totalClaimed[_user][_token];
    }

    /**
     * @dev Hàm xem danh sách các token được hỗ trợ.
     * @return Mảng địa chỉ các token ERC20 được hỗ trợ.
     */
    function getSupportedTokens() external view returns (address[] memory) {
        return supportedTokens;
    }

    /**
     * @dev Hàm thêm staking từ SeasonManager (sau khi mùa chơi kết thúc).
     * @param _user Địa chỉ của người chơi.
     * @param _token Địa chỉ của token ERC20.
     * @param _amount Số lượng token cần thêm vào staking.
     */
    function addStakedTokens(address _user, address _token, uint256 _amount) external onlySeasonManager {
        require(isSupportedToken[_token], "Token are not supported");
        require(_amount > 0, "The amount must be greater than 0");

        // Cập nhật staking
        totalStaked[_user][_token] += _amount;

        // Cập nhật staking trong RegionManager (nếu cần)
        // IRegionManager(regionManager).updateStaking(_regionId, _token, _amount);
    }
}
