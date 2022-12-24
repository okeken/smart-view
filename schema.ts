import { string, object, mixed  } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import isUploadSupported from "@utils/isUploadSupported";


export function validationOpt(schema:any) {
  return { mode: "all", resolver: yupResolver(schema) }
};


export const projectSchema = object().shape({
  title: string()
    .required("project title is required")
    .min(8, "title must be more than 4 characters"),
     contractAddress: string()
    .required("Contract Address is required")
    .matches(/^0x[a-fA-F0-9]{40}$/, 'Contract Address is not valid'),
    abi:mixed() 
  .test("abi", "abi is required", (value, ot) => {
    const abiFromApi = ot.parent.abiFromApi
    if (!!abiFromApi?.length) return true  
    if (!!!value?.length) return false // attachment is required
    return true
  }) 
  
  .test({
    message: "unsupported, only json files are supported",
    test: (file,ot) => {  
    
      const abiFromApi = ot.parent.abiFromApi
    if (!!abiFromApi?.length) return true 
       const isValid = isUploadSupported(file?.[0]?.name, ["json"]) 
      return isValid;
    }
  })
 
//   .test({
//     message: `File too big, can't exceed ${ millify(MAX_FILE_SIZE, {
//       units: ["B", "KB", "MB", "GB", "TB"],
//       space: true,
//     })}`,
//     test: (file) => {
    
//       const isValid = file[0]?.size < MAX_FILE_SIZE;
//       return isValid;
//     }
//   })
 
    
})






