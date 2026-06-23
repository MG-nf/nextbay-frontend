import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b bg-background">
      <div className="p-4 border-b">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          NextBay
        </Link>
      </div>

      <div className="p-4 flex justify-between items-center">
        <nav className="flex gap-6">
          <Link 
            href="/auctions" 
            className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
            Auctions
          </Link>
        </nav>

        <div className="flex gap-4 items-center">
          <Link href="/login" className="text-sm font-medium">Login</Link>
          <Link href="/register" className="text-sm font-medium px-4 py-2 bg-primary text-primary-foreground rounded-md">
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}