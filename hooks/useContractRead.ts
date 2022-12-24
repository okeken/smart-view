import { IContract } from 'types'
import { useContractRead as useSM } from 'wagmi'



const useContractRead = ({
    abi,
    address,
    args,
    functionName
}:IContract )=>{
   
    const response = useSM({
        address,
        abi,
        args,
        functionName
      })

    return {...response, functionName}
}


export default useContractRead