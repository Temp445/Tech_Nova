'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function BlogRedirectButton() {
  const router = useRouter();
  const pathname = usePathname();

  const [locale, setLocale] = useState('en');

  useEffect(() => {
    // Try to detect locale from pathname (/en/..., /fr/..., etc.)
    const match = pathname.match(/^\/([a-z]{2})\b/);
    if (match) setLocale(match[1]);
    else {
      // Try localStorage fallback
      const stored = localStorage.getItem('locale');
      if (stored) setLocale(stored);
    }
  }, [pathname]);

  const handleRedirect = () => {
    // Go to /[locale]/blog
    router.push(`/${locale}/blog`);
  };

  return (
    <button
      onClick={handleRedirect}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Go to Blog
    </button>
  );
}
