import { useEffect } from "react";
import { ConnectKitButton } from "connectkit";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

export const CustomConnect = () => {
    const {isConnected} = useAccount()
    const router = useRouter()

  useEffect(()=>{

    if(isConnected){
        router.push('/contracts')
    } else {
        router.push('/')
    }
     
  },[isConnected])
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show,   }) => {
        return (
          <div className="flex flex-col">
           <div className="flex">
           Please connect first <img src='/flash.svg' alt='arrow' className='w-6 h-6 ml-3 ' />
           </div>
            <div className="text-center">
             <button onClick={show} className='p-1 px-4 mt-3 rounded-lg outline-red-500 outline outline-1 outline-offset-2 '>
            {isConnected ? "Connected" : "Connect"}
          </button>
          {
            isConnected ? '':''
          }
            </div>
          </div>
        );
      }}
    </ConnectKitButton.Custom>
  );
};