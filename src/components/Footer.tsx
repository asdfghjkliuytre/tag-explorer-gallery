
export default function Footer() {
  return (
    <footer className="w-full flex-shrink-0 py-6 text-xs text-muted-foreground/60 flex flex-col sm:flex-row justify-center items-center gap-4 border-t border-border/20 mt-auto bg-background/90 backdrop-blur-sm">
      <div className="flex items-center gap-6">
        <span className="text-center">© {new Date().getFullYear()} Professional Image Gallery</span>
        <div className="hidden sm:flex items-center gap-4 text-xs">
          <a href="#" className="hover:text-foreground transition-colors duration-200 underline-offset-4 hover:underline">Terms</a>
          <a href="#" className="hover:text-foreground transition-colors duration-200 underline-offset-4 hover:underline">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors duration-200 underline-offset-4 hover:underline">Docs</a>
        </div>
      </div>
    </footer>
  );
}
