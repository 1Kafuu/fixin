// components/customer/PostEditor.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { FormInput, FormTextarea, FormSelect, ImageUpload, ContentFilterDisplay, filterContent } from "@/components/customer";
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";
import type { ContentFilterResult } from "./ContentFilter";

export interface PostData {
  title: string;
  content: string;
  brand: string;
  image: File | null;
}

export interface PostEditorProps {
  initialData?: Partial<PostData>;
  onSubmit: (data: PostData) => void;
  isSubmitting?: boolean;
  disabled?: boolean;
  className?: string;
}

const brandOptions = [
  { value: "", label: "Pilih merk (opsional)" },
  { value: "apple", label: "Apple" },
  { value: "samsung", label: "Samsung" },
  { value: "asus", label: "Asus" },
  { value: "lenovo", label: "Lenovo" },
  { value: "hp", label: "HP" },
  { value: "dell", label: "Dell" },
  { value: "acer", label: "Acer" },
  { value: "xiaomi", label: "Xiaomi" },
  { value: "oppo", label: "OPPO" },
  { value: "vivo", label: "Vivo" },
  { value: "other", label: "Lainnya" },
];

const MAX_CONTENT_LENGTH = 2000;

export function PostEditor({ initialData, onSubmit, isSubmitting, disabled, className }: PostEditorProps) {
  const [formData, setFormData] = React.useState<PostData>({
    title: initialData?.title ?? "",
    content: initialData?.content ?? "",
    brand: initialData?.brand ?? "",
    image: initialData?.image ?? null,
  });

  const [errors, setErrors] = React.useState<Partial<Record<keyof PostData, string>>>({});
  const [touched, setTouched] = React.useState<Partial<Record<keyof PostData, boolean>>>({});
  const [contentFilterResult, setContentFilterResult] = React.useState<ContentFilterResult>({ isValid: true, flaggedWords: [], message: "" });

  const validate = React.useCallback((data: PostData): Partial<Record<keyof PostData, string>> => {
    const newErrors: Partial<Record<keyof PostData, string>> = {};
    if (!data.title.trim()) newErrors.title = "Judul wajib diisi";
    else if (data.title.trim().length < 5) newErrors.title = "Judul minimal 5 karakter";
    else if (data.title.trim().length > 100) newErrors.title = "Judul maksimal 100 karakter";
    if (!data.content.trim()) newErrors.content = "Konten wajib diisi";
    else if (data.content.trim().length < 10) newErrors.content = "Konten minimal 10 karakter";
    return newErrors;
  }, []);

  const handleChange = <K extends keyof PostData>(field: K, value: PostData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleContentValidation = (result: ContentFilterResult) => setContentFilterResult(result);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filterResult = filterContent(formData.content);
    setContentFilterResult(filterResult);
    if (!filterResult.isValid) { setErrors((prev) => ({ ...prev, content: filterResult.message })); return; }
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    if (Object.keys(validationErrors).length === 0) onSubmit(formData);
  };

  const isFormValid = formData.title.trim().length >= 5 && formData.content.trim().length >= 10 && contentFilterResult.isValid;

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6", className)}>
      <FormInput label="Judul" value={formData.title} onChange={(e) => handleChange("title", e.target.value)} error={touched.title ? errors.title : undefined} placeholder="Judul postingan Anda..." required disabled={disabled} maxLength={100} />
      <FormSelect label="Merk Perangkat" options={brandOptions} value={formData.brand} onValueChange={(value) => handleChange("brand", value)} placeholder="Pilih merk (opsional)" disabled={disabled} />
      <FormTextarea label="Isi Postingan" value={formData.content} onChange={(e) => handleChange("content", e.target.value)} error={touched.content ? errors.content : undefined} placeholder="Bagikan pengalaman, pertanyaan, atau tips Anda..." required disabled={disabled} showCharCount maxLength={MAX_CONTENT_LENGTH} className="min-h-[200px]" />
      <ContentFilterDisplay text={formData.content} onValidationResult={handleContentValidation} />
      <ImageUpload label="Unggah Foto (Opsional)" value={formData.image} onChange={(file) => handleChange("image", file)} maxSize={5} hint="Ukuran maksimal 5MB. Format: JPG, PNG, WebP" disabled={disabled} />
      <div className="flex gap-3">
        <Button type="submit" size="lg" className="flex-1 gap-2" disabled={disabled || isSubmitting || !isFormValid}>
          {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" />Memposting...</> : <><Send className="h-4 w-4" />Posting Sekarang</>}
        </Button>
        <Button type="button" variant="outline" size="lg" onClick={() => window.history.back()} disabled={isSubmitting}>Batal</Button>
      </div>
    </form>
  );
}
