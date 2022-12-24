

const isUploadSupported =(fileName:string='', supportedImg:string[])=>{
     const dot = fileName.indexOf(".")
    const file  =fileName?.split("").slice(dot+1).join("")
    const isSupported = supportedImg.includes(file)
    return isSupported
  }

  export default isUploadSupported