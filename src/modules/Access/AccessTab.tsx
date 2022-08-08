import { faArrowUpRightFromSquare, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback, useMemo, useState, useEffect } from 'react'
import Dropdown from '../../components/Dropdown/Dropdown'
import { Tabs } from '../../components/Tab/Tabs'
import { listCurrency, tabItems, useInfoBalance } from './constants'
import { InputAccess } from './InputAccess'
import { RequestApprove } from './RequestApprove'
import { ITabCurrency } from './types'
import { ethers } from "ethers"
import BOND_ABI from "../../contract/ABI_Bond.json"

const KOVAN_BOND = "0x93ef7b43217EF54DeA67a6A1600D6333554Df250";
const ERC_20 = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function balanceOf(address) view returns (uint)",
    "function allowance(address owner, address spender) view returns (uint256)",
    "function transfer(address to, uint amount)",
    "function approve(address spender, uint256 amount) public returns (bool)",
    "event Transfer(address indexed from, address indexed to, uint amount)"
    ];
  
export const AccessTab = () => {
  const [itemSelected, setItemSelected] = useState<ITabCurrency>(listCurrency[0])
  const [list, setList] = useState<ITabCurrency[]>(listCurrency)
  const [openTab, setOpenTab] = useState(1)
  
  useEffect(() => {
    async function fetchInitialApproveCurrency() {
      const userList: ITabCurrency[] = listCurrency;
    
      const {ethereum} = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const userAddress = ethers.utils.getAddress(accounts[0]);
    
        await Promise.all(userList.map(async (item) => {
          const tokenContract = new ethers.Contract(item.contract, ERC_20, signer);
          if (item.contract != "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE") {
            const allowance = await tokenContract.allowance(userAddress, KOVAN_BOND);
            if (allowance.gte(ethers.utils.parseUnits("1000.00", "ether"))) {
              item.isPermission = true;
              if (item.contract === itemSelected.contract) {
                itemSelected.isPermission = true;
              }
            }
          }
          const bondContract = new ethers.Contract(KOVAN_BOND, BOND_ABI, signer);
          const p = await bondContract.mintPrice(item.contract);
          const price = ethers.utils.formatUnits(p, item.decimal);
          item.price = price;
          if (item.contract === itemSelected.contract) {
            itemSelected.price = price;
          }
        }));
      }
      setList([...userList]);
      setItemSelected({...itemSelected});
    }

    fetchInitialApproveCurrency();
  }, []) 

  const handleRequestApproveCurrency = useCallback(async () => {
    if (itemSelected.isPermission) return;

    // call some thing
    const {ethereum} = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const tokenContract = new ethers.Contract(itemSelected.contract, ERC_20, signer);

      try {
        const tx = await tokenContract.approve(KOVAN_BOND, ethers.utils.parseUnits("1000.00", "ether"));
        const result = await tx.wait();
        if (result["confirmations"] > 0) {
          console.log("Transaction succeeded", itemSelected);
          itemSelected.isPermission = true;
          setItemSelected({...itemSelected});
        }
      } catch (e) {
        alert("TRANSACTION FAILED ❌");
      }
    } else {
      alert("PLEASE CONNECT YOUR METAMASK 🦊");
    }
  }, [itemSelected])

  const dropDownProps = useMemo(() => {
    return {
      list,
      setItemSelected,
      itemSelected,
    }
  }, [itemSelected, list])

  const tabContent = [] // Add some custom component for each tab
  return (
    <div className="lg:mr-10 w-[560px]">
      <Tabs
        tabContent={tabContent}
        tabHeaderProps={{
          openTab,
          setOpenTab,
          tabItems,
        }}
      >
        <div className="w-[320px] mt-[70px] mx-auto">
          <Dropdown {...dropDownProps} />
          <div className="divide w-full h-[1px] bg-gray-200 mt-6"></div>
          <div className="flex justify-between mt-4">
            <div className="text-sm text-gray-400">
              Price: $ {itemSelected?.price || 0}
              <span className="pl-1">
                <FontAwesomeIcon icon={faCircleInfo} />
              </span>
            </div>
            <div className="text-sm text-gray-400 cursor-pointer hover:text-blue-400">
              Market Details
              <span className="pl-1">
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </span>
            </div>
          </div>
        </div>
        <div className="w-full">
          {!!itemSelected?.isPermission || openTab == 2 ? (
            <InputAccess
              useInfoBalance={useInfoBalance}
              itemSelected={itemSelected}
              openTab={openTab}
            />
          ) : (
            <RequestApprove requestApprove={handleRequestApproveCurrency} />
          )}
        </div>
      </Tabs>
    </div>
  )
}
