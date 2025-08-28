'use client';

import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const { user, isAuthenticated, logout } = useAuth();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  // Don't show navigation on auth pages
  if (pathname?.startsWith('/auth')) {
    return null;
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={isAuthenticated ? "/dashboard" : "/"} className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">SecureInsure</h1>
            </Link>
          </div>

          {/* Navigation Links */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                href="/dashboard" 
                className={`text-sm font-medium ${
                  pathname === '/dashboard' 
                    ? 'text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Dashboard
              </Link>
              <Link 
                href="/payment" 
                className={`text-sm font-medium ${
                  pathname === '/payment' 
                    ? 'text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Payments
              </Link>
              <Link 
                href="/claims" 
                className={`text-sm font-medium ${
                  pathname === '/claims' 
                    ? 'text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Claims
              </Link>
              <Link 
                href="/support" 
                className={`text-sm font-medium ${
                  pathname === '/support' 
                    ? 'text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Support
              </Link>
            </div>
          )}

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-700">
                  Welcome, {user?.name}
                </span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <div className="space-x-2">
                <Link href="/auth/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isAuthenticated && (
          <div className="md:hidden pb-4">
            <div className="flex space-x-4">
              <Link 
                href="/dashboard" 
                className={`text-sm font-medium ${
                  pathname === '/dashboard' 
                    ? 'text-blue-600' 
                    : 'text-gray-700'
                }`}
              >
                Dashboard
              </Link>
              <Link 
                href="/payment" 
                className={`text-sm font-medium ${
                  pathname === '/payment' 
                    ? 'text-blue-600' 
                    : 'text-gray-700'
                }`}
              >
                Payments
              </Link>
              <Link 
                href="/claims" 
                className={`text-sm font-medium ${
                  pathname === '/claims' 
                    ? 'text-blue-600' 
                    : 'text-gray-700'
                }`}
              >
                Claims
              </Link>
              <Link 
                href="/support" 
                className={`text-sm font-medium ${
                  pathname === '/support' 
                    ? 'text-blue-600' 
                    : 'text-gray-700'
                }`}
              >
                Support
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
