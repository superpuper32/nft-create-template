export interface NFTFormData {
    name: string;
    symbol: string;
    image: File | null;
}

export interface NFTFormErrors {
    name?: string;
    symbol?: string;
    image?: string;
}
