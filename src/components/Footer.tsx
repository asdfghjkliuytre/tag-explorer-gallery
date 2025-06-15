
export default function Footer() {
  return (
    <footer className="w-full flex-shrink-0 py-5 text-sm text-muted-foreground flex justify-center items-center border-t border-border/40 mt-auto bg-background/80">
      <span>© {new Date().getFullYear()} Professional Image Gallery &mdash; Modern UI Example</span>
    </footer>
  );
}
