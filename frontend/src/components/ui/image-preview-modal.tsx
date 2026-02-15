"use client";

import * as React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

interface ImagePreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  src: string;
  alt: string;
}

export default function ImagePreviewModal({
  open,
  onOpenChange,
  src,
  alt,
}: ImagePreviewModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[90vw] max-h-[90vh] w-auto p-2 overflow-hidden bg-white/95 border border-border-gray"
        showCloseButton={true}
      >
        <div className="relative w-full max-w-2xl aspect-square mx-auto">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain"
            sizes="90vw"
            unoptimized={src.startsWith("http")}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
