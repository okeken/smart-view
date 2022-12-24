import {
    arbitrum,
    arbitrumGoerli,
    avalanche,
    avalancheFuji,
    bsc,
    bscTestnet,
    // evmos,
    // evmosTestnet,
    fantom,
    fantomTestnet,
    foundry,
    goerli,
    // gnosis,
    hardhat,
    localhost,
    mainnet,
    optimism,
    optimismGoerli,
    polygon,
    polygonMumbai,
    sepolia,
    taraxa,
    taraxaTestnet,
} from "@wagmi/chains"


const chains =[
    arbitrum,
    arbitrumGoerli,
    avalanche,
    avalancheFuji,
    bsc,
    bscTestnet,
    // evmos,
    // evmosTestnet,
    fantom,
    fantomTestnet,
    foundry,
    goerli,
    // gnosis,
    hardhat,
    localhost,
    mainnet,
    optimism,
    optimismGoerli,
    polygon,
    polygonMumbai,
    sepolia,
    taraxa,
    taraxaTestnet,    
]



export const chainObject = chains.reduce((acc:any, name:any) => {
    acc[name.id] = name
    return acc
}, {})

export default chains