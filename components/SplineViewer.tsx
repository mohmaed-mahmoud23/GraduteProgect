"use client";

import { useEffect, useState } from "react";

interface SplineViewerProps {
  url: string;
  className?: string;
}

export default function SplineViewer({ url, className }: SplineViewerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Import the viewer only on the client side
    import("@splinetool/viewer").then(() => {
      setMounted(true);
    });
  }, []);

  if (!mounted) {
    return (
      <div className={`flex items-center justify-center bg-transparent ${className}`}>
        <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* @ts-ignore - spline-viewer is a custom element */}
      <spline-viewer url={url} />
    </div>
  );
}
