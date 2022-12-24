import { useContractReads } from 'wagmi'
import sampleABI from '../abis/sample.json'



const mlootContract = {
 address: '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
 abi: sampleABI,
}

const useContractsRead = ()=>{
    const { data, isError, isLoading } = useContractReads({
        contracts: [
        {
        ...mlootContract,
        functionName: 'getWaist',
        args: [69],
        },
        ],
        })

    return { data, isError, isLoading }
}


export default useContractsRead