
export default function Footer() {
  return (
    <footer className="w-full flex-shrink-0 py-8 text-sm text-muted-foreground/70 flex flex-col sm:flex-row justify-center items-center gap-6 border-t border-border/30 mt-auto bg-gradient-to-r from-background/95 via-background to-background/95 backdrop-blur-lg">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          <span className="text-center font-medium">© {new Date().getFullYear()} Professional Image Gallery</span>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <a 
            href="#" 
            className="hover:text-foreground transition-all duration-300 underline-offset-4 hover:underline hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded px-2 py-1"
            aria-label="Terms of Service"
          >
            Terms
          </a>
          <a 
            href="#" 
            className="hover:text-foreground transition-all duration-300 underline-offset-4 hover:underline hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded px-2 py-1"
            aria-label="Privacy Policy"
          >
            Privacy
          </a>
          <a 
            href="#" 
            className="hover:text-foreground transition-all duration-300 underline-offset-4 hover:underline hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded px-2 py-1"
            aria-label="Documentation"
          >
            Docs
          </a>
        </div>
      </div>
      <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground/50">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
        <span>Local processing • Privacy guaranteed</span>
      </div>
    </footer>
  );
}
