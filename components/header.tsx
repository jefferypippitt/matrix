'use client'

import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'
import { usePathname } from 'next/navigation'

const navLinks = [
  {
    href: '/',
    label: 'home'
  }
]

export default function Header() {
  const pathname = usePathname()
  return (
    <header className='py-4'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <nav className='flex items-center justify-between'>
          <ul className='flex gap-x-5'>
            {navLinks.map(link => (
              <li key={link.href}>
                <Link
                  className={`${
                    pathname === link.href
                      ? 'text-black dark:text-neutral-200'
                      : 'text-neutral-500 dark:text-neutral-400'
                  }`}
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
