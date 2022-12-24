// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import puppeteer from 'puppeteer';
import {chainObject} from "@config/chains"

type Data = {
   abi?:string | null
  address:string | string[] | undefined
  message?:string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const {chain, address } = req.query
  if(!chain || !address){
    return res.status(400).json({ address, abi:null, message:'chain and address are required' })
  }
  const currentChain = chainObject[chain as string]
  const browser = await puppeteer.launch(({headless: false}));
     try{
      
  // const browser = await puppeteer.launch();
  
const page = await browser.newPage();
await page.setDefaultNavigationTimeout(60000);
// page.setDefaultNavigationTimeout(0); 
const networkScan =currentChain.blockExplorers.default.url
const url =`${networkScan}/address/${address}#code`

await page.goto(url,  { waitUntil: 'load' });

await page.waitForSelector('#js-copytextarea2');

  const abi = await page.$eval('#js-copytextarea2', el => el.textContent);
  await browser.close();
   return res.status(200).json({ address, abi, message:'success' })
     }
     catch(err:any){
      await browser.close();
      const errMsg = err.message.toLowerCase()
      if(errMsg.includes('30000ms exceeded') || errMsg.includes('timeout') || errMsg.includes('timed out') || errMsg.includes('navigation timeout of 30000 ms exceeded')){
        return res.status(500).json({ address, abi:null, message:'abi not found' })
      }
     
       return res.status(500).json({ address, abi:null, message:err.message })
     }
}
