'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

const LocaleRedirect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  useEffect(() => {
    const stored = localStorage.getItem('preferredLocale');
    if (stored && stored !== currentLocale) {
      const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(?:-[A-Z]{2})?/, '');
      router.replace(`/${stored}${pathWithoutLocale}`);
    }
  }, []);

  return null;
};

export default LocaleRedirect;
