"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Send,
  Image,
  X,
  AlertTriangle,
  Check,
  Loader2,
  FileText,
  MessageSquare,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";

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

// Forbidden words for content filter
const forbiddenWords = ["kata1", "kata2", "kata3"];

export default function CreatePostPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    brand: "",
    image: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Content validation
  const [contentValid, setContentValid] = useState<boolean | null>(null);
  const [flaggedWords, setFlaggedWords] = useState<string[]>([]);

  const validateContent = useCallback((text: string) => {
    const lowerText = text.toLowerCase();
    const found: string[] = [];

    for (const word of forbiddenWords) {
      if (lowerText.includes(word.toLowerCase())) {
        found.push(word);
      }
    }

    if (found.length > 0) {
      setContentValid(false);
      setFlaggedWords(found);
    } else {
      setContentValid(true);
      setFlaggedWords([]);
    }
  }, []);

  const handleContentChange = (value: string) => {
    setFormData((prev) => ({ ...prev, content: value }));
    if (value.trim()) {
      validateContent(value);
    } else {
      setContentValid(null);
      setFlaggedWords([]);
    }
    if (errors.content) {
      setErrors((prev) => ({ ...prev, content: "" }));
    }
  };

  const handleImageChange = (file: File | null) => {
    if (!file) {
      setFormData((prev) => ({ ...prev, image: null }));
      setImagePreview(null);
      return;
    }

    // Validate size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, image: "Ukuran maksimal 5MB" }));
      return;
    }

    // Validate type
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setErrors((prev) => ({ ...prev, image: "Format file tidak didukung" }));
      return;
    }

    setErrors((prev) => ({ ...prev, image: "" }));
    setFormData((prev) => ({ ...prev, image: file }));

    // Create preview
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleImageChange(file);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Judul wajib diisi";
    } else if (formData.title.trim().length < 5) {
      newErrors.title = "Judul minimal 5 karakter";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Konten wajib diisi";
    } else if (formData.content.trim().length < 10) {
      newErrors.content = "Konten minimal 10 karakter";
    }

    if (contentValid === false) {
      newErrors.content = "Postingan mengandung kata sensitif/dilarang";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Creating post:", {
      ...formData,
      imageName: formData.image?.name,
    });

    // Success feedback
    setIsSubmitting(false);
    router.push("/customer/community");
  };

  const isFormValid =
    formData.title.trim().length >= 5 &&
    formData.content.trim().length >= 10 &&
    contentValid !== false;

  return (
    <div className="p-4 sm:p-6">
      {/* Back Button */}
      <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-6 gap-2">
        <ArrowLeft className="h-4 w-4" />
        Kembali
      </Button>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-foreground">Buat Postingan</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Bagikan pengalaman atau pertanyaan Anda di komunitas FixIn
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-6">
            {/* Title */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Judul <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, title: e.target.value }));
                  if (errors.title) setErrors((prev) => ({ ...prev, title: "" }));
                }}
                placeholder="Judul postingan Anda..."
                className={`h-11 w-full rounded-lg border bg-background px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.title ? "border-red-500" : "border-input"
                }`}
              />
              {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
              <p className="mt-1 text-xs text-muted-foreground">{formData.title.length}/100 karakter</p>
            </div>

            {/* Brand */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Merk Perangkat
              </label>
              <select
                value={formData.brand}
                onChange={(e) => setFormData((prev) => ({ ...prev, brand: e.target.value }))}
                className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {brandOptions.map((b) => (
                  <option key={b.value} value={b.value}>{b.label}</option>
                ))}
              </select>
            </div>

            {/* Content */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Isi Postingan <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => handleContentChange(e.target.value)}
                placeholder="Bagikan pengalaman, pertanyaan, atau tips Anda..."
                rows={8}
                className={`w-full rounded-lg border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                  errors.content ? "border-red-500" : "border-input"
                }`}
              />
              <div className="mt-1 flex justify-between">
                {errors.content ? (
                  <p className="text-xs text-red-500">{errors.content}</p>
                ) : (
                  <p className="text-xs text-muted-foreground">Minimal 10 karakter</p>
                )}
                <p className="text-xs text-muted-foreground">{formData.content.length}/2000</p>
              </div>
            </div>

            {/* Content Filter Status */}
            {contentValid === true && (
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-800 dark:bg-emerald-950/50">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500" />
                  <p className="text-sm text-emerald-700 dark:text-emerald-300">Konten valid</p>
                </div>
              </div>
            )}

            {contentValid === false && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-950/50">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5 text-red-500" />
                  <div>
                    <p className="text-sm text-red-700 dark:text-red-300">
                      Postingan Anda mengandung kata sensitif/dilarang
                    </p>
                    <p className="mt-1 text-xs text-red-500">
                      Kata terdeteksi: {flaggedWords.join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Image Upload */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Unggah Foto (Opsional)
              </label>

              {imagePreview ? (
                <div className="relative rounded-lg border border-border overflow-hidden">
                  <img src={imagePreview} alt="Preview" className="h-48 w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleImageChange(null)}
                    className="absolute right-2 top-2 rounded-full bg-black/50 p-1.5 text-white hover:bg-black/70 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById("image-input")?.click()}
                  className={`relative cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
                    isDragging
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
                      : errors.image
                      ? "border-red-300"
                      : "border-border hover:border-blue-500 hover:bg-muted/50"
                  }`}
                >
                  <input
                    id="image-input"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                  <Image className={`mx-auto h-10 w-10 ${isDragging ? "text-blue-500" : "text-muted-foreground"}`} />
                  <p className="mt-3 text-sm font-medium text-foreground">
                    {isDragging ? "Lepaskan file di sini" : "Seret & lepas atau klik untuk upload"}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Maksimum 5MB (JPG, PNG, WebP)
                  </p>
                </div>
              )}

              {errors.image && <p className="mt-1 text-xs text-red-500">{errors.image}</p>}
            </div>

            {/* Guidelines */}
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 flex-shrink-0 text-blue-500" />
                <div>
                  <p className="font-medium text-foreground">Panduan Postingan</p>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 flex-shrink-0 mt-0.5 text-emerald-500" />
                      Gunakan bahasa yang sopan dan mudah dipahami
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 flex-shrink-0 mt-0.5 text-emerald-500" />
                      Cantumkan detail perangkat dan masalah yang dialami
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 flex-shrink-0 mt-0.5 text-emerald-500" />
                      Foto yang jelas membantu komunitas memahami masalah Anda
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 flex-shrink-0 mt-0.5 text-emerald-500" />
                      Hindari konten yang melanggar aturan dan norma sosial
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                type="submit"
                size="lg"
                className="flex-1 gap-2"
                disabled={!isFormValid || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Memposting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Posting Sekarang
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => router.back()}
              >
                Batal
              </Button>
            </div>
          </form>
        </div>

        {/* Tips Sidebar */}
        <div>
          <div className="sticky top-4 rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="h-5 w-5 text-blue-500" />
              <h3 className="font-semibold text-foreground">Tips Postingan</h3>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-950/30">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Judul yang Baik</span>
                </div>
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  "Laptop MacBook Pro tidak bisa nyala setelah jatuh"
                </p>
              </div>

              <div className="rounded-lg bg-violet-50 p-3 dark:bg-violet-950/30">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-violet-500" />
                  <span className="text-sm font-medium text-violet-700 dark:text-violet-300">Deskripsi yang Jelas</span>
                </div>
                <p className="text-xs text-violet-600 dark:text-violet-400">
                  Jelaskan merk, model, kapan beli, gejala kerusakan, dan sudah coba apa saja
                </p>
              </div>

              <div className="rounded-lg bg-emerald-50 p-3 dark:bg-emerald-950/30">
                <div className="flex items-center gap-2 mb-2">
                  <Image className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Foto yang Berguna</span>
                </div>
                <p className="text-xs text-emerald-600 dark:text-emerald-400">
                  Sertakan foto kerusakan, foto label perangkat, atau screenshot error
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
