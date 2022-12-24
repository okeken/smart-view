import { useState, useEffect } from "react"
import { IContract } from "types"
import useContractRead from "./useContractRead"
import useContractWrite from "./useContractWrite"

const useProject =(contractInfo:IContract)=>{
    const [data, setContractData] = useState<any>(contractInfo)
    const [prevData, setData] = useState(contractInfo)
    const response = useContractRead(prevData)
    const [writeInput, setWriteInput] = useState(contractInfo)
    const { writeAsync, ...oter} = useContractWrite(writeInput)
    const [responseArray, setResponseArray] = useState<any>([])
    const [writeArray, setWriteArray] = useState<any>([])
  
    
    useEffect(()=>{
            setData(prev=>({...prev, 
                functionName:data.functionName,
                args:data.args
            }))
    },[data])

    useEffect(()=>{
            const temp = responseArray
            const indx = data.index as number
            temp[indx] = response          
            setResponseArray(temp)

    }, [response])
   
    useEffect(()=>{
        const temp = writeArray
        const indx = data.index as number
        temp[indx] = oter
        setWriteArray(temp)
    }, [oter])
    
    useEffect(()=>{        
        writeAsync?.().then((res:any)=>{
            console.log(res, "reaultsss>>")
        }
        ).catch((err:any)=>{          
            const errr = JSON.parse(JSON.stringify(err))
            alert(errr?.cause?.reason)
            console.log(errr?.cause?.reason, "error writing effecr")
        })
       

    }, [writeInput])

    const viewData =async ({funcName, index, args}:any)=>{
        setContractData((prev:any)=>({...prev, functionName:funcName, index, args}))
             

    }
    
    const writeData =async ({funcName, index, args}:any)=>{        
        setWriteInput((prev:any)=>({...prev, functionName:funcName, index, args}))
        try{
            // await writeAsync?.()
        }
        catch(err){
            console.log(err, "error writing")
            const errr = JSON.parse(JSON.stringify(err))
            console.log(errr, "error writing")
        }
     
    }



    return {viewData, writeData, data:responseArray, writeInfo:writeArray }
}

export default useProject