export function Footer() {
  return (
    <footer className="w-full border-t border-dashed text-center text-sm">
      <div className="mx-auto max-w-5xl lg:border-x lg:border-dashed px-6 sm:px-8 lg:px-10  py-8">
        <p className="text-muted-foreground tracking-tight">
          &copy; {new Date().getFullYear()} Nabil Afkar . All rights reserved.
        </p>
      </div>
    </footer>
  );
}
