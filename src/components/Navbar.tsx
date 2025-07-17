'use client';

import { FC } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';

const Navbar: FC = () => {
  const pathname = usePathname();
  const currentLocale = useLocale();

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },
  ];

  return (
    <header className="bg-white w-full z-[20]">
      <nav className="container mx-auto flex items-center justify-between px-4 md:px-6 py-3">
        <Link href="/" className="text-xl font-bold text-blue-500 tracking-wide">
          TechNova
        </Link>

        <div className="flex gap-4">
          {languages.map((lang) => (
            <Link
              key={lang.code}
              href={pathname}
              locale={lang.code}
              className={`px-3 py-1 text-sm rounded-md transition ${
                currentLocale === lang.code
                  ? 'bg-blue-100 text-blue-600 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-blue-500'
              }`}
            >
              {lang.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
