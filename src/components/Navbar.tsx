'use client';

import { FC } from 'react';
import { useLocale } from 'next-intl';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Navbar: FC = () => {
  const currentLocale = useLocale();
  const router = useRouter();

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },
  ];

  const handleLocaleChange = (locale: string) => {
    setCookie('NEXT_LOCALE', locale, { path: '/' });
    router.refresh();
  };

  return (
    <header className="bg-white w-full z-[20]">
      <nav className="container mx-auto flex items-center justify-between px-4 md:px-6 py-3">
        <Link href="/" className="text-xl font-bold text-blue-500 tracking-wide">
          TechNova
        </Link>

        <div className="flex gap-4">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLocaleChange(lang.code)}
              className={`px-3 py-1 text-sm rounded-md transition ${
                currentLocale === lang.code
                  ? 'bg-blue-100 text-blue-600 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-blue-500'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
