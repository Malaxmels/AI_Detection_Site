"use client"

import { useState } from "react"
import { FileUploader } from "./file-uploader"
import { ResultsPanel } from "./results-panel"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"

// Types for our detection results
export type DetectionResult = {
  isAiGenerated: boolean
  confidenceScore: number
  explanation: string
  details: {
    detectedModels: string[]
    generationHints: string[]
  }
}

export default function ImageDetector() {
  const [file, setFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<DetectionResult | null>(null)

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile)
    setResults(null)

    if (selectedFile) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(selectedFile)
    } else {
      setImagePreview(null)
    }
  }

  const handleSubmit = async () => {
    if (!file) return

    setIsLoading(true)

    // Simulate API call with a timeout
    setTimeout(() => {
      // Generate random results for the prototype
      const isAiGenerated = Math.random() > 0.5
      const confidenceScore = isAiGenerated ? Math.floor(65 + Math.random() * 35) : Math.floor(5 + Math.random() * 30)

      const mockResults: DetectionResult = {
        isAiGenerated,
        confidenceScore,
        explanation: isAiGenerated ? "This image is likely AI-generated" : "This image appears to be human-made",
        details: {
          detectedModels: isAiGenerated ? ["Stable Diffusion", "Midjourney"] : [],
          generationHints: isAiGenerated
            ? ["Unnatural lighting patterns", "Inconsistent textures", "Unusual finger proportions"]
            : ["No signs of AI manipulation detected"],
        },
      }

      setResults(mockResults)
      setIsLoading(false)
    }, 2000)
  }

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6">
        <FileUploader onFileChange={handleFileChange} imagePreview={imagePreview} />

        <div className="mt-6 flex justify-center">
          <Button onClick={handleSubmit} disabled={!file || isLoading} className="px-8 py-6 text-lg">
            {isLoading ? "Scanning..." : "Scan Image"}
          </Button>
        </div>

        {isLoading && (
          <div className="mt-8 flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-t-primary rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Analyzing image...</p>
          </div>
        )}

        {results && !isLoading && (
          <div className="mt-8">
            <ResultsPanel results={results} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
