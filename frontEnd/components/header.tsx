"use client"
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { WalletConnectButton } from './wallet-connect-button'
import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react'

const navLinks = [
  { name: 'Dashboard', path: '/dashboard', requiresAuth: true },
  { name: 'Marketplace', path: '/marketplace', requiresAuth: true },
  { name: 'My Tickets', path: '/tickets', requiresAuth: true },
  { name: 'Create Event', path: '/create-event', requiresAuth: true }
]

function Header() {
  const pathname = usePathname()
  const { isConnected } = useAccount()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Always render the same structure, but conditionally show content after mounting
  return (
    <header className="bg-slate-900/80 backdrop-blur-md border-b border-purple-500/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image 
            src="/tixora-logo.png" 
            alt="Tixora" 
            width={40} 
            height={40} 
            style={{ width: 'auto', height: 'auto' }}
            className="rounded-full"
          />
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Tixora
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {!mounted ? (
            // Show loading skeleton during hydration
            <>
              <div className="w-16 h-6 bg-slate-700 animate-pulse rounded"></div>
              <div className="w-20 h-6 bg-slate-700 animate-pulse rounded"></div>
              <div className="w-24 h-6 bg-slate-700 animate-pulse rounded"></div>
            </>
          ) : isConnected ? (
            // Show authenticated navigation
            navLinks.map((link) => {
              const isActive = pathname === link.path || 
                             (link.path !== '/' && pathname.startsWith(link.path))
              
              return (
                <Link 
                  key={link.path}
                  href={link.path}
                  className={`${
                    isActive 
                      ? 'text-purple-400 font-medium' 
                      : 'text-slate-300 hover:text-purple-400 transition-colors font-medium'
                  }`}
                >
                  {link.name}
                </Link>
              )
            })
          ) : (
            // Show unauthenticated navigation
            <>
              <Link href="https://github.com/DeborahOlaboye/TixoraTicket/blob/main/README.md" target='_blank' className="text-slate-300 hover:text-purple-400 transition-colors font-medium">
                Docs
              </Link>
              <Link href="/resources" className="text-slate-300 hover:text-purple-400 transition-colors font-medium">
                Resources
              </Link>
              <Link href="/#how-it-works" className="text-slate-300 hover:text-purple-400 transition-colors font-medium">
                How It Works
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {!mounted ? (
            <div className="w-32 h-10 bg-slate-700 animate-pulse rounded"></div>
          ) : (
            <WalletConnectButton />
          )}
        </div>
      </div>
    </header>
  )
}

export default Header