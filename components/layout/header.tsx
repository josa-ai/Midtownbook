'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, User, LogOut } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { logout } from '@/lib/actions/auth';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Businesses', href: '/businesses' },
  { name: 'Categories', href: '/categories' },
  { name: 'Events', href: '/events' },
  { name: 'Deals', href: '/deals' },
  { name: 'About', href: '/about' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const { user, loading } = useAuth();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="sticky top-0 z-sticky bg-background/95 backdrop-blur-md border-b border-border">
      <Container>
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-primary">
              <span className="text-white font-serif font-bold text-xl">M</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-heading-sm text-foreground group-hover:text-primary-600 transition-colors">
                Midtown Book
              </span>
              <span className="text-label-sm text-muted-foreground -mt-0.5">
                Community Directory
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'px-4 py-2 rounded-lg text-body-md font-medium transition-colors',
                  isActive(item.href)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-50'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
            {!loading && (
              <>
                {user ? (
                  <>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/dashboard">
                        <User className="h-4 w-4" />
                        Dashboard
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleLogout}>
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/auth/login">
                        <User className="h-4 w-4" />
                        Sign In
                      </Link>
                    </Button>
                    <Button variant="primary" size="sm" asChild>
                      <Link href="/for-business">Add Your Business</Link>
                    </Button>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 space-y-2 animate-slide-down">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'block px-4 py-3 rounded-lg text-body-md font-medium transition-colors',
                  isActive(item.href)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-50'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 space-y-2 border-t border-border">
              {!loading && (
                <>
                  {user ? (
                    <>
                      <Button
                        variant="outline"
                        fullWidth
                        asChild
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Link href="/dashboard">
                          <User className="h-4 w-4" />
                          Dashboard
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        fullWidth
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        fullWidth
                        asChild
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Link href="/auth/login">
                          <User className="h-4 w-4" />
                          Sign In
                        </Link>
                      </Button>
                      <Button
                        variant="primary"
                        fullWidth
                        asChild
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Link href="/for-business">Add Your Business</Link>
                      </Button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
