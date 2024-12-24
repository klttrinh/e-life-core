struct Token {
    string name;
    string symbol;
    uint256 totalSupply;
    uint256 decimals;
    mapping(address => uint256) balances;
    mapping(address => mapping(address => uint256)) allowances;
}