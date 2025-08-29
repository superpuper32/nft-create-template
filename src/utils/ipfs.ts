import { NFTStorage } from 'nft.storage';
import { Web3Storage } from 'web3.storage';
import lighthouse from '@lighthouse-web3/sdk';

const NFT_STORAGE_KEY = process.env.NEXT_PUBLIC_NFT_STORAGE_KEY;
const WEB3_STORAGE_KEY = process.env.NEXT_PUBLIC_WEB3_STORAGE_KEY;
const LIGHTHOUSE_KEY = process.env.NEXT_PUBLIC_LIGHTHOUSE_KEY;

export async function uploadToIPFS(file: File) {
    try {
        // Пробуем несколько провайдеров для надежности
        const clients = [
            uploadViaNFTStorage(file),
            uploadViaWeb3Storage(file),
            uploadViaLighthouse(file)
        ];

        // Используем первый успешный результат
        const result = await Promise.any(clients);
        return result.cid;
    } catch (error) {
        console.error("All IPFS uploads failed:", error);
        throw error;
    }
}

async function uploadViaNFTStorage(file: File) {
    const client = new NFTStorage({ token: NFT_STORAGE_KEY });
    const metadata = await client.store({
        name: file.name,
        description: 'NFT asset',
        image: file
    });
    return { cid: metadata.ipnft };
}

async function uploadViaWeb3Storage(file: File) {
    const client = new Web3Storage({ token: WEB3_STORAGE_KEY });
    const cid = await client.put([file]);
    return { cid };
}

async function uploadViaLighthouse(file: File) {
    const response = await lighthouse.upload(file, LIGHTHOUSE_KEY);
    return { cid: response.data.Hash };
}