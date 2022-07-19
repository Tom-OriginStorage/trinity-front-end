import React, { useCallback, useMemo, useRef } from 'react'
import { IInputAccessProps } from './types'
import BOND_ABI from "../../contract/ABI_Bond.json";
import { ethers } from "ethers";

const KOVAN_BOND = "0x23EE98B6aDA65FdA387Aa2707b0825567494F311";
const KOVAN_ADAI = "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD";

export const InputAccess = ({ useInfoBalance, itemSelected, openTab }: IInputAccessProps) => {
  const inputRef: React.RefObject<HTMLInputElement> = React.createRef()

  const balance = useMemo(() => {
    const value = useInfoBalance[openTab === 1 ? 'balance' : 'available']
    return `${value[itemSelected?.name?.toLowerCase()] || '0'}`
  }, [itemSelected, openTab])

  const SubmitMint = async ()=>{
    const {ethereum} = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const bondContract = new ethers.Contract(KOVAN_BOND, BOND_ABI, signer);
      const result = await bondContract.mintPublic(1);
      console.log(result);
    } else {
      alert("Please connect your Metamask");
    }
  }

  const Redeem = async ()=>{
    const {ethereum} = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();

      const bondContract = new ethers.Contract(KOVAN_BOND, BOND_ABI, signer);
      const result = await bondContract.totalSupply();

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const userAddress = ethers.utils.getAddress(accounts[0]);

      let userBonds: Array<Number> = [];
      for (let i = 1; i <= result; i++) {
        const owner = await bondContract.ownerOf(ethers.BigNumber.from(i)._hex);
        if (ethers.utils.getAddress(owner) === userAddress) {
          userBonds.push(i);
        }
      }
      userBonds.forEach(async id => {
        await bondContract.burn(id);
      })
    } else {
      alert("Please connect your Metamask");
    }
  }

  return (
    <div>
      <div className="w-[496px] mx-auto mt-10 relative z-0">
        <input
          placeholder="Please enter the amount of Bonds to purchase"
          className="rounded-xl border-gray-300 border-[1px] px-4 pr-[106px] h-16 w-full focus:border-blue-500 focus:shadow-inputAmount"
          ref={inputRef}
        />
        <button className="absolute right-4 top-1/2 -translate-y-1/2 uppercase text-blue-600 h-11 px-5 font-medium rounded-[22px] border-transparent bg-blue-50">
          max
        </button>
      </div>
      {openTab == 1 ? (
      <button 
        onClick={SubmitMint}
        className="mx-auto mt-[29px] block rounded-full bg-pink-500 text-white w-[248px] h-[54px]"
      >Mint</button>) : (
      <button
        onClick={Redeem}
        className="mx-auto mt-[29px] block rounded-full bg-pink-500 text-white w-[248px] h-[54px]"
      >Redeem</button>
      )}
    </div>
  )
}
