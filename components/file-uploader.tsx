"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import Image from "next/image"
import { X } from "lucide-react"

interface FileUploaderProps {
  onFileChange: (file: File | null) => void
  imagePreview: string | null
}

export function FileUploader({ onFileChange, imagePreview }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setIsDragging(false)
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        onFileChange(file)
      }
    },
    [onFileChange],
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxFiles: 1,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
  })

  const removeImage = () => {
    onFileChange(null)
  }

  return (
    <div className="w-full">
      {!imagePreview ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragging ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary/50 hover:bg-gray-50"}`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="p-4 bg-gray-100 rounded-full">
              <svg
                className="w-10 h-10 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700">Drag and drop your image here</p>
              <p className="text-sm text-gray-500 mt-1">or click to browse (JPG, PNG)</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden border border-gray-200">
          <div className="aspect-video relative">
            <Image src={imagePreview || "/placeholder.svg"} alt="Preview" fill className="object-contain" />
          </div>
          <button
            onClick={removeImage}
            className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded-full hover:bg-black/90 transition-colors"
            aria-label="Remove image"
          >
            <X size={20} />
          </button>
        </div>
      )}
    </div>
  )
}
