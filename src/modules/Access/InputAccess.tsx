import React, { useCallback, useMemo, useRef } from 'react'
import { IInputAccessProps } from './types'
import bond from "./Bond.json";
import { ethers } from "ethers";
import { ethereum } from '@graphprotocol/graph-ts';

const KOVAN = "https://kovan.infura.io/v3/0cbb090d75d347978dc3111df4e1c83c";
const KOVAN_BOND = "0x23EE98B6aDA65FdA387Aa2707b0825567494F311";
const KOVAN_DAI = "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD";

export const InputAccess = ({ useInfoBalance, itemSelected, openTab }: IInputAccessProps) => {
  const inputRef: React.RefObject<HTMLInputElement> = React.createRef()

  const balance = useMemo(() => {
    const value = useInfoBalance[openTab === 1 ? 'balance' : 'available']
    return `${value[itemSelected?.name?.toLowerCase()] || '0'}`
  }, [itemSelected, openTab])

  // const handleSetMaxValueInput = useCallback(
  //   (event: React.MouseEvent<HTMLButtonElement>) => {
  //     (inputRef?.current as any).value = balance
  //     event.preventDefault()
  //   },
  //   [balance]
  // )

  const {ethereum} = window ;
  // const provider = new ethers.providers.JsonRpcProvider(KOVAN);
  const provider = new ethers.providers.Web3Provider(ethereum) ;
  // const wallet = new ethers.Wallet("beb7c8f678843923a79711f8bdfc8240115f578d6ba0367d9af5b7b1067e935b", provider);


  const SubmitMint = async ()=>{
    const signer = provider.getSigner()  ;
    const bondContract = new ethers.Contract(KOVAN_BOND, bond, signer);
    const result = await bondContract.mintPublic(1);
    console.log(result);
  }
  return (
    <div>
      <div className="w-[496px] mx-auto mt-10 relative z-0">
        <input
          placeholder="Please enter the withdraw amount"
          className="rounded-xl border-gray-300 border-[1px] px-4 pr-[106px] h-16 w-full focus:border-blue-500 focus:shadow-inputAmount"
          ref={inputRef}
        />
        <button className="absolute right-4 top-1/2 -translate-y-1/2 uppercase text-blue-600 h-11 px-5 font-medium rounded-[22px] border-transparent bg-blue-50">
          max
        </button>
      </div>

      <button
        // onClick={handleSetMaxValueInput}
        onClick={SubmitMint}

        className="mx-auto mt-[29px] block rounded-full bg-pink-500 text-white w-[248px] h-[54px]"
      >
        Deposit 
      </button>
    </div>
  )
}
