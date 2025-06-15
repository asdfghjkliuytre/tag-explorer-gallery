
import { Info } from "lucide-react";

export const FolderOnboardingSidebar = () => (
  <aside className="bg-muted/60 border border-border/80 rounded-2xl px-6 py-6 shadow-lg sticky top-24">
    <div className="flex items-center gap-3 mb-3">
      <Info className="h-6 w-6 text-primary" />
      <span className="font-semibold text-lg text-primary">Quick Tips</span>
    </div>
    <ul className="space-y-4 text-base text-muted-foreground">
      <li>
        <span className="font-bold text-primary">Privacy:</span><br />
        <span>Your images are never uploaded and stay fully local.</span>
      </li>
      <li>
        <span className="font-bold text-primary">Folder Structure:</span><br />
        <span>
          Subfolders are supported – images from all subfolders will be included.
        </span>
      </li>
      <li>
        <span className="font-bold text-primary">Pro Tip:</span><br />
        <span>
          Keep filenames descriptive for best tagging results.
        </span>
      </li>
      <li>
        <span className="font-bold text-primary">Need Help?</span><br />
        <span>
          Ask your AI assistant in the chat panel below for usage advice.
        </span>
      </li>
    </ul>
  </aside>
);
