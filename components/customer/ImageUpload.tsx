// components/customer/ImageUpload.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Upload, X, AlertCircle } from "lucide-react";

export interface ImageUploadProps {
  label?: string;
  error?: string;
  hint?: string;
  value?: File | null;
  onChange?: (file: File | null) => void;
  maxSize?: number;
  accept?: string;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  className?: string;
}

const MAX_SIZE_MB_DEFAULT = 5;

export function ImageUpload({
  label, error, hint, value, onChange, maxSize = MAX_SIZE_MB_DEFAULT, accept = "image/jpeg,image/png,image/webp", disabled, required, id, className
}: ImageUploadProps) {
  const uploadId = id ?? React.useId();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [validationError, setValidationError] = React.useState<string | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  const maxSizeBytes = maxSize * 1024 * 1024;

  React.useEffect(() => {
    if (value) {
      const url = URL.createObjectURL(value);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreview(null);
    }
  }, [value]);

  const validateFile = (file: File): string | null => {
    if (!accept.split(",").some(type => file.type.includes(type.split("/")[1]))) {
      return "Format file tidak didukung. Gunakan JPG, PNG, atau WebP.";
    }
    if (file.size > maxSizeBytes) {
      return `Gagal mengunggah, ukuran gambar maksimal ${maxSize}MB`;
    }
    return null;
  };

  const handleFileChange = (file: File | null) => {
    if (!file) {
      setValidationError(null);
      onChange?.(null);
      return;
    }
    const err = validateFile(file);
    if (err) {
      setValidationError(err);
      onChange?.(null);
      return;
    }
    setValidationError(null);
    onChange?.(file);
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); handleFileChange(e.dataTransfer.files[0] || null); };
  const handleRemove = () => { if (inputRef.current) inputRef.current.value = ""; handleFileChange(null); };

  const displayError = error || validationError;

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={uploadId} className="block text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-destructive ml-0.5">*</span>}
        </label>
      )}
      {preview ? (
        <div className="relative rounded-md border overflow-hidden">
          <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
          <button type="button" onClick={handleRemove} disabled={disabled} className="absolute top-2 right-2 p-1.5 rounded-full bg-background/80 hover:bg-background disabled:opacity-50">
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
          className={cn("relative border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors", isDragging && "border-primary bg-primary/5", displayError && "border-destructive", className)}
          onClick={() => inputRef.current?.click()}>
          <input ref={inputRef} id={uploadId} type="file" accept={accept} onChange={(e) => handleFileChange(e.target.files?.[0] || null)} disabled={disabled} className="hidden" />
          <Upload className={cn("h-8 w-8", isDragging ? "text-primary" : "text-muted-foreground")} />
          <div className="text-center">
            <p className="text-sm font-medium">{isDragging ? "Lepaskan file di sini" : "Seret & lepas atau klik untuk upload"}</p>
            <p className="text-xs text-muted-foreground mt-1">Maksimum {maxSize}MB (JPG, PNG, WebP)</p>
          </div>
        </div>
      )}
      {displayError && <p className="flex items-center gap-1 text-sm text-destructive"><AlertCircle className="h-3.5 w-3.5" />{displayError}</p>}
      {hint && !displayError && <p className="text-sm text-muted-foreground">{hint}</p>}
    </div>
  );
}
