// components/customer/ContentFilter.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

export interface ContentFilterResult {
  isValid: boolean;
  flaggedWords: string[];
  message: string;
}

// Indonesian forbidden words (expand as needed)
const FORBIDDEN_WORDS = ["kata1", "kata2", "kata3"];

export function filterContent(text: string): ContentFilterResult {
  const normalizedText = text.toLowerCase();
  const flaggedWords: string[] = [];

  for (const word of FORBIDDEN_WORDS) {
    if (normalizedText.includes(word.toLowerCase())) {
      flaggedWords.push(word);
    }
  }

  if (flaggedWords.length > 0) {
    return {
      isValid: false,
      flaggedWords: [...new Set(flaggedWords)],
      message: "Postingan Anda mengandung kata sensitif/dilarang. Harap perbaiki konten Anda.",
    };
  }

  return { isValid: true, flaggedWords: [], message: "" };
}

export interface ContentFilterDisplayProps {
  text: string;
  onValidationResult?: (result: ContentFilterResult) => void;
  className?: string;
}

export function ContentFilterDisplay({ text, onValidationResult, className }: ContentFilterDisplayProps) {
  const [result, setResult] = React.useState<ContentFilterResult>({ isValid: true, flaggedWords: [], message: "" });

  React.useEffect(() => {
    const filterResult = filterContent(text);
    setResult(filterResult);
    onValidationResult?.(filterResult);
  }, [text, onValidationResult]);

  if (!text.trim()) return null;

  return (
    <div className={cn("p-3 rounded-lg border", result.isValid ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/30" : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30", className)}>
      <div className="flex items-start gap-2">
        {result.isValid ? (
          <><span className="text-green-600 dark:text-green-400">✓</span><p className="text-sm text-green-800 dark:text-green-200">Konten valid</p></>
        ) : (
          <><AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-red-800 dark:text-red-200">Postingan Anda mengandung kata sensitif/dilarang. Harap perbaiki konten Anda.</p>
            <p className="text-xs text-red-600 dark:text-red-400 mt-1">Kata yang terdeteksi: {result.flaggedWords.join(", ")}</p>
          </div></>
        )}
      </div>
    </div>
  );
}
