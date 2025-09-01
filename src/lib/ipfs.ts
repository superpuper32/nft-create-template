'use server';

import { NFTStorage } from 'nft.storage';

const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY;

export async function uploadToIPFS(file: File): Promise<string> {
    try {
        if (!file || !file.type.startsWith('image/')) {
            throw new Error('Invalid file type. Please upload an image.');
        }

        if (file.size > 10 * 1024 * 1024) {
            throw new Error('File size must be less than 10MB');
        }

        const client = new NFTStorage({ token: NFT_STORAGE_KEY! });

        const metadata = await client.store({
            name: file.name,
            description: 'NFT asset uploaded via NFT Creator',
            image: file,
            properties: {
                type: file.type,
                size: file.size,
                created: new Date().toISOString(),
            }
        });

        return metadata.ipnft;

    } catch (error) {
        console.error('IPFS upload failed:', error);
        throw new Error(`Failed to upload to IPFS: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

export async function uploadMetadataToIPFS(metadata: object): Promise<string> {
    try {
        const client = new NFTStorage({ token: NFT_STORAGE_KEY! });

        const metadataBlob = new Blob([JSON.stringify(metadata)], {
            type: 'application/json'
        });
        const metadataFile = new File([metadataBlob], 'metadata.json');

        const uploaded = await client.store({
            ...metadata,
            image: metadata.image,
        });

        return uploaded.ipnft;
    } catch (error) {
        console.error('Metadata upload failed:', error);
        throw new Error('Failed to upload metadata to IPFS');
    }
}
