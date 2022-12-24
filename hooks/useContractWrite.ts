import { IContract } from "types";
import {
    usePrepareContractWrite,
    useContractWrite as useCTW,
    useFeeData,
    useWaitForTransaction,
  } from "wagmi";

 const useContractWrite = (
    {
        abi,
        address,
        args,
        functionName
    }:IContract
) => {
    const { data: feeData } = useFeeData();
  
    const { config } = usePrepareContractWrite({
        abi,
        address,
        args,
        functionName,
      overrides: {
        gasPrice: feeData?.gasPrice,
      },
      onError(error) {
        // invalid address or ENS name
        // invalid BigNumber value
        const err = JSON.parse(JSON.stringify(error));
        const er = [
          "resolver or addr is not configured for ENS name",
          "missing argument: passed to contract",
          "invalid address or ENS name",
          "invalid BigNumber value",
          "invalid BigNumber string",
        ];
        const ErrorMsg = !!err && er?.includes(err?.reason) ? "" : err?.reason;
        // getErrors?.(ErrorMsg);
      },
    });
  
    const { write, writeAsync, error, data, isLoading, isSuccess } = useCTW(config);
  
    const { data: writeConfirmation, isLoading: sending } = useWaitForTransaction(
      {
        hash: data?.hash,
      }
    );
  
    return {
      write,
      error,
      data,
      isLoading,
      isSuccessSubmitted: isSuccess,
      sending,
      writeAsync,
      writeConfirmation,
    };
  };

  export default useContractWrite