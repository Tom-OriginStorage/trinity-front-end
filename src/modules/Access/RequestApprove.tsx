import { IRequestApproveProps } from "./types"
import bond from "./Bond.json";
import { ethers } from "ethers";

const KOVAN = "https://kovan.infura.io/v3/0cbb090d75d347978dc3111df4e1c83c";
const KOVAN_BOND = "0x23EE98B6aDA65FdA387Aa2707b0825567494F311";
const KOVAN_DAI = "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD";
const ERC_20 = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function balanceOf(address) view returns (uint)",
    "function transfer(address to, uint amount)",
    "function approve(address spender, uint256 amount) public returns (bool)",
    "event Transfer(address indexed from, address indexed to, uint amount)"
    ];
// export const RequestApprove = ({ requestApprove }: IRequestApproveProps) => {
//   return (
//     <>
//       <div className="mx-auto not-allow w-[472px] min-h-[120px] p-6 mt-6 rounded-2xl bg-slate-100">
//         <div className="flex w-full">
//           <img
//             className="max-w-full w-[112px] h-[72px] rounded-lg mr-4"
//             src="/assets/my-assets/accessApprove.en.ab6742bf.gif"
//             alt=""
//           />
//           <div className="reason flex flex-col">
//             <h3 className="text-black text-base font-medium">
//               This asset has not been approved yet
//             </h3>
//             <p className="mt-4 text-base">
//               For the first deposit of one asset, please click the button below to approve it first.
//             </p>
//           </div>
//         </div>
//       </div>
//       <button
//         onClick={requestApprove}
//         className="mx-auto mt-[29px] block rounded-full bg-pink-500 text-white w-[248px] h-[54px]"
//       >
//         Approve
//       </button>
//     </>
//   )
// }

export const RequestApprove = () => {
  const provider = new ethers.providers.JsonRpcProvider(KOVAN);
  const wallet = new ethers.Wallet("beb7c8f678843923a79711f8bdfc8240115f578d6ba0367d9af5b7b1067e935b", provider);
  const address = wallet.address;
  const approveCurrency = ()=>{
        const contract = new ethers.Contract(KOVAN_DAI, ERC_20, wallet);
    const result =  contract.approve(KOVAN_BOND, ethers.utils.parseUnits("10", "ether"));
    console.log(result);
  }
  return (
    <>
      <div className="mx-auto not-allow w-[472px] min-h-[120px] p-6 mt-6 rounded-2xl bg-slate-100">
        <div className="flex w-full">
          <img
            className="max-w-full w-[112px] h-[72px] rounded-lg mr-4"
            src="/assets/my-assets/accessApprove.en.ab6742bf.gif"
            alt=""
          />
          <div className="reason flex flex-col">
            <h3 className="text-black text-base font-medium">
              This asset has not been approved yet
            </h3>
            <p className="mt-4 text-base">
              For the first deposit of one asset, please click the button below to approve it first.
            </p>
          </div>
        </div>
      </div>
      <button
        onClick={approveCurrency}
        className="mx-auto mt-[29px] block rounded-full bg-pink-500 text-white w-[248px] h-[54px]"
      >
        Approve
      </button>
    </>
  )
}
