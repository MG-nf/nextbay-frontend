import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import { isAuthenticated } from '@/lib/auth';
import { logoutAction } from '@/lib/authActions';

export async function Header() {
  const loggedIn = await isAuthenticated();

  return (
    <header className="border-b bg-background">
      <div className="px-4 py-4 border-b flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          NextBay
        </Link>
        <ThemeToggle />
      </div>

      <div className="px-4 py-4 flex justify-between items-center">
        <nav className="flex gap-6">
          <Link 
            href="/auctions" 
            className="px-4 py-1.5 rounded-md bg-muted text-muted-foreground hover:bg-muted/80 transition-all font-medium text-sm"
          >
            Auctions
          </Link>
        </nav>

        <div className="flex gap-4 items-center">
          {loggedIn ? (
            <form action={logoutAction}>
              <button 
                type="submit" 
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Logout
              </button>
            </form>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium">Login</Link>
              <Link href="/register" className="text-sm font-medium px-4 py-2 bg-primary text-primary-foreground rounded-md">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}