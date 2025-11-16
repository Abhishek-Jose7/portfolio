"use client"

import DomeGallery from "@/components/ui/DomeGallery"

export function SketchesContent() {
  const sketchImages = [
    "/sketches/1.jpg",
    "/sketches/2.jpg",
    "/sketches/3.jpg",
    "/sketches/4.jpg",
    "/sketches/5.jpg",
    "/sketches/6.jpg",
    "/sketches/7.jpg",
    "/sketches/8.jpg",
    "/sketches/9.jpg",
    "/sketches/10.jpg",
    "/sketches/11.jpg",
    "/sketches/12.jpg",
    "/sketches/13.jpg",
    ];

  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      <DomeGallery 
        images={sketchImages}
        grayscale={false}
        imageBorderRadius="20px"
        openedImageBorderRadius="20px"
      />
    </div>
  )
}
