
import React from "react";
import { Images } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  onClick: () => void;
}
export default function SampleGalleryButton({ onClick }: Props) {
  return (
    <Button
      variant="outline"
      size="lg"
      onClick={onClick}
      className="w-full mt-4 font-semibold text-base border-primary/60 bg-accent/20 hover:bg-accent/40 shadow"
    >
      <Images className="w-5 h-5 mr-2" />
      Load Sample Gallery
    </Button>
  );
}
