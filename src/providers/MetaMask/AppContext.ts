// import { ethers } from "ethers";
// import React, { useState, createContext, useEffect } from 'react';
// import bond from "./Bond.json";

// const Wallet = require('./Wallet');
// // const Alert = require("sweetalert2");


// export const AppContext = createContext(); // global apk context


// export const AppProvider = ({ children }) => {

//     const [loading, setLoading] = useState(false);
//     const [currentAccount, setCurrentAccount] = useState();
//     const [networkId, setNetworkId] = useState();
//     const [networkRpc, setNetworkRpc] = useState();
//     const [networkProvider, setNetworkProvider] = useState();

//     const KOVAN = "https://kovan.infura.io/v3/0cbb090d75d347978dc3111df4e1c83c";
//     const KOVAN_BOND = "0xEd2756F4b4502b89a1ae7Bd8addD7cff39dC5Bc4";   
//     const provider = new ethers.providers.JsonRpcProvider(KOVAN);
//     const wallet = new ethers.Wallet("beb7c8f678843923a79711f8bdfc8240115f578d6ba0367d9af5b7b1067e935b", provider);
//     const bondContract = new ethers.Contract(KOVAN_BOND, bond, wallet);


//     const depositBond = async() =>{
//         console.log("depositBond");
//         const result = await bondContract.mintPublic(1);
//         console.log(result);
//     }

//     const withdrawBond = async() =>{
//         console.log("withdrawBond");
//         const result = await bondContract.burn(0);
//         console.log(result);
//     }

//     const ourProvider = async () => {
//         const provider = await Wallet.provider();
//         setNetworkProvider(provider);
//     }
//     // connect to wallet
//     const connectWallet = async () => {
//         await ourProvider();
//         const account = await Wallet.connect();
//         console.log("le compte =>", account);
//         setCurrentAccount(account[0]);
//     }

//     // disconnect from wallet
//     const disconnectWallet = async () => {
//         await Wallet.disconnect();
//         setCurrentAccount();
//     }

//     // verify network
//     const verifyNetwork = async (networkId, networkName, networkRpc) => {
//         console.log('In context, networkId is =>', networkId);
//         const verify = Wallet.verifyNetwork(networkId, networkName, networkRpc);
//         setNetworkId(verify)
//         setNetworkRpc(networkRpc);
//     }


//     // every time page is loaded, connect to wallet
//     useEffect(() => {
//         if (Wallet.web3Modal.cachedProvider) {
//             connectWallet();
//         }
//     }, []);

//     // every time provider is changed, follow the change
//     useEffect(() => {
//         if (networkProvider?.on) {
//             const handleAccountsChanged = (accounts) => { // accounts changed
//                 console.log("accountsChanged", accounts);
//                 if (accounts) setCurrentAccount(accounts[0]);
//             };

//             const handleChainChanged = async (_hexChainId) => { // chain changed event
//                 console.log("chainChanged", _hexChainId);
//                 console.log('account when chain change', currentAccount);
//                 // Alert.fire({
//                 //     icon: "info",
//                 //     title: "Network change",
//                 //     confirmButtonText: "Ok",
//                 //     text: "Make sure you are on the right network before mint",
//                 //     width: 'auto'
//                 // })
//             };

//             const handleDisconnect = () => { // disconnect event
//                 disconnectWallet();
//             }

//             networkProvider.on("accountsChanged", handleAccountsChanged);
//             networkProvider.on("chainChanged", handleChainChanged);
//             networkProvider.on("disconnect", handleDisconnect);

//             return () => {
//                 if (networkProvider.removeListener) {
//                     networkProvider.removeListener("accountsChanged", handleAccountsChanged);
//                     networkProvider.removeListener("chainChanged", handleChainChanged);
//                     networkProvider.removeListener("disconnect", handleDisconnect);
//                 }
//             };
//         }
//     }, [networkProvider]);
//     return (
//         <AppContext.Provider value={{ connectWallet, currentAccount, verifyNetwork, loading , depositBond , withdrawBond}}>
//             {children}
//         </AppContext.Provider>
//     );
// };
