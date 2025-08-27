"use client";

import { useNFTForm } from "@/hooks/useNFTForm";
import { useWallet } from "@/hooks/useWallet";
import TextInput from "@/components/ui/TextInput";
import ImageUpload from "@/components/ui/ImageUpload";

export default function NFTCreationForm() {
  const { isConnected } = useWallet();
  const { formData, errors, isSubmitting, handleInputChange, handleSubmit } =
    useNFTForm();

  if (!isConnected) {
    return (
      <div className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="rounded-lg bg-yellow-50 p-6 dark:bg-yellow-950/20">
          <p className="text-center text-yellow-800 dark:text-yellow-200">
            Please connect your wallet to create NFTs
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <TextInput
          label="NFT name"
          id="nft-name"
          value={formData.name}
          onChange={(value) => handleInputChange("name", value)}
          error={errors.name}
          placeholder="My Awesome NFT"
          maxLength={50}
          autoComplete="off"
        />

        <TextInput
          label="NFT symbol"
          id="nft-symbol"
          value={formData.symbol}
          onChange={(value) => handleInputChange("symbol", value)}
          error={errors.symbol}
          placeholder="AWESOME"
          maxLength={10}
          autoComplete="off"
        />

        <ImageUpload
          onFileSelect={(file) => handleInputChange("image", file)}
          onFileRemove={() => handleInputChange("image", '')}
          selectedFile={formData.image}
          error={errors.image}
        />
      </div>

      <div className="mt-10">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs transition-colors hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Creating NFT...
            </>
          ) : (
            "Create NFT"
          )}
        </button>
      </div>
    </form>
  );
}
