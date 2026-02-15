"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

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
  const [imgError, setImgError] = React.useState(false);

  React.useEffect(() => {
    if (open) setImgError(false);
  }, [open, src]);

  const fullSrc = src?.startsWith("http")
    ? src
    : typeof window !== "undefined"
      ? `${window.location.origin}${src?.startsWith("/") ? "" : "/"}${src || ""}`
      : src;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[90vw] max-h-[90vh] w-full min-w-[280px] min-h-[200px] p-4 overflow-auto bg-white border border-border-gray"
        showCloseButton={true}
      >
        <div className="flex items-center justify-center min-h-[200px] w-full">
          {imgError || !fullSrc ? (
            <p className="text-medium-gray text-sm">Unable to load image</p>
          ) : (
            <img
              src={fullSrc}
              alt={alt}
              className="max-w-full max-h-[70vh] w-auto h-auto object-contain"
              onError={() => setImgError(true)}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
