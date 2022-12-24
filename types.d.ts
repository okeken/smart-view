export interface IElementProps {
    children?: React.ReactElement;
    className?: string;
    // All other props
    [x: string]: any;
  }
  

  export interface IProject {
    title: string;
    contractAddress:any;
    abi:any;
    chainId:number;
}


export interface IAbi {
  abi:any[]
}

export interface IContract {
  abi:any
  address:string
  args?:[]
  functionName?:string
}


  
  
