import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import BOND_ABI from "../contract/ABI_Bond.json"

const KOVAN_BOND = "0x93ef7b43217EF54DeA67a6A1600D6333554Df250";

const NftCard = (uri: string, name: string) => {
  return (
    <li>
      <div>{name}</div>
      <img src={uri} width={250} height={250}/>
    </li>
  )
}

export default function Records() {
  const [list, setList] = useState<string[][]>([])

  useEffect(() => {
    async function fetchNfts() {
      const userList: string[][] = [];
      const {ethereum} = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const userAddress = ethers.utils.getAddress(accounts[0]);

        const bondContract = new ethers.Contract(KOVAN_BOND, BOND_ABI, signer);
        const tokens = await bondContract.tokensOwnedBy(userAddress);
        let len = tokens.length;
        const baseuri = await bondContract.baseURI();

        for (let i = 0; i < len; i++) {
          const response = await fetch(baseuri + '/' + tokens[i]);
          const data = await response.json();
          console.log(data.image);
          userList.push([data.image, data.name]);
        }
      }
      setList([...userList]);
    }

    fetchNfts();
  }, []) 

  return (
    <div>
      {list.map(item => NftCard(item[0], item[1]))}
    </div>
  )
}
