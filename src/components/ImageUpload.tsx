"use client";

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  onError?: (error: string) => void;
  className?: string;
  maxSize?: number; // in bytes
  accept?: string[];
  label?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onError,
  className = '',
  maxSize = 5 * 1024 * 1024, // 5MB default
  accept = ['image/jpeg', 'image/png', 'image/webp'],
  label = 'Upload Image'
}) => {
  const [preview, setPreview] = useState<string | null>(value || null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    
    // Validate file size
    if (file.size > maxSize) {
      const errorMessage = `File size must be less than ${maxSize / (1024 * 1024)}MB`;
      setError(errorMessage);
      onError?.(errorMessage);
      return;
    }

    // Validate file type
    if (!accept.includes(file.type)) {
      const errorMessage = `File type must be one of: ${accept.join(', ')}`;
      setError(errorMessage);
      onError?.(errorMessage);
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreview(result);
      onChange(result);
      setError(null);
    };
    reader.readAsDataURL(file);
  }, [maxSize, accept, onChange, onError]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxFiles: 1,
    multiple: false
  });

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    onChange('');
    setError(null);
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-lg p-4
          ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300'}
          ${error ? 'border-red-500' : ''}
          ${preview ? 'h-48' : 'h-32'}
          transition-colors duration-200
          cursor-pointer
          hover:border-primary/50
        `}
      >
        <input {...getInputProps()} />
        
        {preview ? (
          <div className="relative w-full h-full">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-contain rounded-md"
            />
            <button
              onClick={handleRemove}
              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
            >
              <XMarkIcon className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <PhotoIcon className="w-8 h-8 mb-2" />
            <p className="text-sm text-center">
              {isDragActive ? (
                "Drop the image here"
              ) : (
                <>
                  Drag and drop an image here, or click to select
                  <br />
                  <span className="text-xs">
                    Supported formats: {accept.map(type => type.split('/')[1]).join(', ')}
                  </span>
                </>
              )}
            </p>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}

      <p className="mt-2 text-xs text-gray-500">
        Maximum file size: {maxSize / (1024 * 1024)}MB
      </p>
    </div>
  );
};

export default ImageUpload; 