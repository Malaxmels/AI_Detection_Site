import { Progress } from "@/components/ui/progress"
import type { DetectionResult } from "./image-detector"
import { AlertCircle, CheckCircle } from "lucide-react"

interface ResultsPanelProps {
  results: DetectionResult
}

export function ResultsPanel({ results }: ResultsPanelProps) {
  const { isAiGenerated, confidenceScore, explanation, details } = results

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          {isAiGenerated ? (
            <AlertCircle className="h-6 w-6 text-amber-500" />
          ) : (
            <CheckCircle className="h-6 w-6 text-green-500" />
          )}
          <h3 className="text-xl font-semibold">{explanation}</h3>
        </div>

        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">AI Probability</span>
            <span className="text-sm font-medium text-gray-900">{confidenceScore}%</span>
          </div>
          <Progress
            value={confidenceScore}
            className="h-2"
            indicatorClassName={confidenceScore > 50 ? "bg-amber-500" : "bg-green-500"}
          />
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Detection Details</h4>
            <div className="bg-gray-50 rounded-md p-4">
              {details.detectedModels.length > 0 ? (
                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-700 mb-1">Detected AI Models:</p>
                  <ul className="list-disc list-inside text-sm text-gray-600 pl-2">
                    {details.detectedModels.map((model, index) => (
                      <li key={index}>{model}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  {isAiGenerated ? "Generation Hints:" : "Analysis:"}
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600 pl-2">
                  {details.generationHints.map((hint, index) => (
                    <li key={index}>{hint}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
