import React, { useCallback, useMemo, useRef } from 'react'
import { IInputAccessProps } from './types'
import BOND_ABI from "../../contract/ABI_Bond.json"
import { ethers } from "ethers"

const KOVAN_BOND = "0x93ef7b43217EF54DeA67a6A1600D6333554Df250";

export const InputAccess = ({ useInfoBalance, itemSelected, openTab }: IInputAccessProps) => {
  const inputRef: React.RefObject<HTMLInputElement> = React.createRef()

  const balance = useMemo(() => {
    const value = useInfoBalance[openTab === 1 ? 'balance' : 'available']
    return `${value[itemSelected?.name?.toLowerCase()] || '0'}`
  }, [itemSelected, openTab])

  const SubmitMint = async () => {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const bondContract = new ethers.Contract(KOVAN_BOND, BOND_ABI, signer);
      let amount = 1;
      if (inputRef.current) {
        amount = parseInt(inputRef.current.value) > 0 ? parseInt(inputRef.current.value) : amount;
      }
      let config = {};
      if (itemSelected.contract == "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE") {
        const p = await bondContract.mintPrice("0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE");
        config = {value: p.mul(amount)};
      }
      const result = await bondContract.mintPublic(amount, itemSelected.contract, config);
      console.log(result);
    } else {
      alert("Please connect your Metamask");
    }
  }

  const Redeem = async () => {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const userAddress = ethers.utils.getAddress(accounts[0]);
      console.log("userAddress " + userAddress);

      const bondContract = new ethers.Contract(KOVAN_BOND, BOND_ABI, signer);
      const tokens = await bondContract.tokensOwnedBy(userAddress);
      let len = tokens.length;
      if (inputRef.current) {
        len = parseInt(inputRef.current.value) > 0 ? parseInt(inputRef.current.value) : len;
      }
      for (let i = 0; i < len; i++) {
        await bondContract.burn(tokens[i], {gasLimit: 900000}); 
      }
    } else {
      alert("Please connect your Metamask");
    }
  }

  return (
    <div>
      <div className="w-[496px] mx-auto mt-10 relative z-0">
        <input
          placeholder="Please enter the amount of Bonds"
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
          className="mx-auto mt-[29px] block rounded-full bg-blue-500 text-white w-[248px] h-[54px]"
        >Mint</button>) : (
        <button
          onClick={Redeem}
          className="mx-auto mt-[29px] block rounded-full bg-blue-500 text-white w-[248px] h-[54px]"
        >Redeem</button>
      )}
    </div>
  )
}
