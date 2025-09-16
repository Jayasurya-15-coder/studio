import { Logo } from "@/components/icons/logo";

export default function Header() {
  return (
    <header className="p-4 border-b">
      <div className="max-w-4xl mx-auto flex items-center gap-3">
        <Logo className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-headline tracking-wide text-foreground">
          Saathi
        </h1>
      </div>
    </header>
  );
}
