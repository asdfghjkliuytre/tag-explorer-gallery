
import React from "react";
import { Images } from "lucide-react";

export default function EmptyGalleryIllustration() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="relative flex flex-col items-center">
        <div className="absolute inset-0 w-44 h-44 bg-accent/10 blur-2xl rounded-full -z-10" />
        <Images className="w-24 h-24 md:w-32 md:h-32 text-accent" />
        <p className="mt-6 text-lg text-muted-foreground text-center font-medium max-w-sm">
          Start by selecting a folder to see your image collection beautifully organized by tags.
        </p>
      </div>
    </div>
  );
}
