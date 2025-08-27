"use client";

import { useCallback, useState, useRef } from "react";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/solid";

interface ImageUploadProps {
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  selectedFile: File | null;
  error?: string;
}

export default function ImageUpload({
  onFileSelect,
  onFileRemove,
  selectedFile,
  error,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      const imageFile = files.find((file) => file.type.startsWith("image/"));

      if (imageFile) {
        onFileSelect(imageFile);
      }
    },
    [onFileSelect]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && file.type.startsWith("image/")) {
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const handleRemove = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onFileRemove();
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [onFileRemove]
  );

  const previewUrl = selectedFile ? URL.createObjectURL(selectedFile) : null;

  return (
    <div className="sm:col-span-2">
      <label className="block text-sm/6 font-semibold text-gray-900 dark:text-white">
        NFT Image
      </label>

      <div
        className={`mt-2 flex justify-center rounded-lg border-2 border-dashed px-6 py-10 transition-colors ${
          isDragging
            ? "border-indigo-600 bg-indigo-50 dark:border-indigo-500 dark:bg-indigo-950/20"
            : error
            ? "border-red-300 bg-red-50 dark:border-red-400 dark:bg-red-950/20"
            : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="text-center">
          {previewUrl ? (
            <div className="relative">
              <img
                src={previewUrl}
                alt="Preview"
                className="mx-auto max-h-48 max-w-full rounded-lg object-contain"
              />
              <button
                type="button"
                onClick={handleRemove}
                className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white shadow-lg hover:bg-red-600"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              <PhotoIcon className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600" />
              <div className="mt-4 flex text-sm/6 text-gray-600 dark:text-gray-400">
                <span className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:focus-within:outline-indigo-500 dark:hover:text-indigo-300">
                  Upload a file
                </span>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs/5 text-gray-600 dark:text-gray-400">
                PNG, JPG, GIF up to 10MB
              </p>
            </>
          )}

          <input
            ref={fileInputRef}
            id="file-upload"
            name="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="sr-only"
          />
        </div>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      {selectedFile && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Selected: {selectedFile.name} (
          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
        </p>
      )}
    </div>
  );
}
