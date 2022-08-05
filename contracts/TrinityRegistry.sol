// SPDX-License-Identifier: MIT LICENSE
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract TrinityRegistry is Ownable, ReentrancyGuard {
    // Kovan
    address constant public lendingPool = 0x580D4Fdc4BF8f9b5ae2fb9225D584fED4AD5375c;
    address constant public lendingPoolCore = 0x95D1189Ed88B380E319dF73fF00E479fcc4CFa45;

    mapping(address => address) public tokenAtoken;
    address constant public ethTokenAddress = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;
    address constant public daiTokenAddress = 0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD;
    address constant public usdcTokenAddress = 0xe22da380ee6B445bb8273C81944ADEB6E8450422;
    address constant public susdTokenAddress = 0xD868790F57B39C9B2B51b12de046975f986675f9;
    address constant public tusdTokenAddress = 0x1c4a937d171752e1313D70fb16Ae2ea02f86303e;
    address constant public usdtTokenAddress = 0x13512979ADE267AB5100878E2e0f485B568328a4;
    address constant public batTokenAddress = 0x2d12186Fbb9f9a8C28B3FfdD4c42920f8539D738;
    address constant public kncTokenAddress = 0x3F80c39c0b96A0945f9F0E9f55d8A8891c5671A8;
    address constant public lendTokenAddress = 0x1BCe8A0757B7315b74bA1C7A731197295ca4747a;
    address constant public linkTokenAddress = 0xAD5ce863aE3E4E9394Ab43d4ba0D80f419F61789;
    address constant public manaTokenAddress = 0x738Dc6380157429e957d223e6333Dc385c85Fec7;
    address constant public mkrTokenAddress = 0x61e4CAE3DA7FD189e52a4879C7B8067D7C2Cc0FA;
    address constant public repTokenAddress = 0x260071C8D61DAf730758f8BD0d6370353956AE0E;
    address constant public snxTokenAddress = 0x7FDb81B0b8a010dd4FFc57C3fecbf145BA8Bd947;
    address constant public wbtcTokenAddress = 0x3b92f58feD223E2cB1bCe4c286BD97e42f2A12EA;
    address constant public zrxTokenAddress = 0xD0d76886cF8D952ca26177EB7CfDf83bad08C00C;

    address constant public aethTokenAddress = 0xD483B49F2d55D2c53D32bE6efF735cB001880F79;
    address constant public adaiTokenAddress = 0x58AD4cB396411B691A9AAb6F74545b2C5217FE6a;
    address constant public ausdcTokenAddress = 0x02F626c6ccb6D2ebC071c068DC1f02Bf5693416a;
    address constant public asusdTokenAddress = 0xb9c1434aB6d5811D1D0E92E8266A37Ae8328e901;
    address constant public atusdTokenAddress = 0x4c76f1b48316489E8a3304Db21cdAeC271cF6eC3;
    address constant public ausdtTokenAddress = 0xA01bA9fB493b851F4Ac5093A324CB081A909C34B;
    address constant public abatTokenAddress = 0x5ad67de6Fb697e92a7dE99d991F7CdB77EdF5F74;
    address constant public akncTokenAddress = 0xB08EC9EdB6BD7971220FEa04644174f3EbfbDe96;
    address constant public alendTokenAddress = 0xcBa131C7FB05fe3c9720375cD86C99773faAbF23;
    address constant public alinkTokenAddress = 0xEC23855Ff01012E1823807CE19a790CeBc4A64dA;
    address constant public amanaTokenAddress = 0xe68204D69Cbfaf6124190EFa65ad9C591C0D48e4;
    address constant public amkrTokenAddress = 0xfB762B5BAb463f7F35610Ba65e2534993a1c09C6;
    address constant public arepTokenAddress = 0x0578469469Db1129271f4eb3EB9D97426506c44c;
    address constant public asnxTokenAddress = 0xb4D480f963f4F685F1D51d2B6159D126658B1dA8;
    address constant public awbtcTokenAddress = 0xCD5C52C7B30468D16771193C47eAFF43EFc47f5C;
    address constant public azrxTokenAddress = 0x0F456900c6bdFddfA27E1E4E4c84EB823a2eE13c;

    constructor() {
        tokenAtoken[address(ethTokenAddress)] = aethTokenAddress;
        tokenAtoken[address(daiTokenAddress)] = adaiTokenAddress;
        tokenAtoken[address(usdcTokenAddress)] = ausdcTokenAddress;
        tokenAtoken[address(susdTokenAddress)] = asusdTokenAddress;
        tokenAtoken[address(tusdTokenAddress)] = atusdTokenAddress;
        tokenAtoken[address(usdtTokenAddress)] = ausdtTokenAddress;
        tokenAtoken[address(batTokenAddress)] = abatTokenAddress;
        tokenAtoken[address(kncTokenAddress)] = akncTokenAddress;
        tokenAtoken[address(lendTokenAddress)] = alendTokenAddress;
        tokenAtoken[address(linkTokenAddress)] = alinkTokenAddress;
        tokenAtoken[address(manaTokenAddress)] = amanaTokenAddress;
        tokenAtoken[address(mkrTokenAddress)] = amkrTokenAddress;
        tokenAtoken[address(repTokenAddress)] = arepTokenAddress;
        tokenAtoken[address(snxTokenAddress)] = asnxTokenAddress;
        tokenAtoken[address(wbtcTokenAddress)] = awbtcTokenAddress;
        tokenAtoken[address(zrxTokenAddress)] = azrxTokenAddress;
    }

    function setToken(address tokenAddress, address atokenAddress) external onlyOwner {
        tokenAtoken[tokenAddress] = atokenAddress;
    }

    function getToken(address tokenAddress) public view returns (address) {
        return tokenAtoken[tokenAddress];
    }

    function getEthToken() public pure returns (address) {
        return ethTokenAddress;
    }

    function getLendingPoolCore() public pure returns (address) {
        return lendingPoolCore;
    }

    function getLendingPool() public pure returns (address) {
        return lendingPool;
    }
}
