'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';

interface LocalizedString {
  en: string;
  hi?: string;
  [key: string]: string | undefined; 
}
type Product = {
  image?: string;
  name?: LocalizedString;
  description?: LocalizedString;
};

const ProductPage = () => {
  const { id } = useParams();
     const [product, setProduct] = useState<Product | null>(null);
     const locale = useLocale();
    const translate = (text?: LocalizedString) => text?.[locale] ?? text?.en ?? "";
   const t = useTranslations('Products')
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data);
      } catch {
        
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (!product) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-gray-50">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6 mt-8">
        <Link
          href="/products"
          className="text-sm text-blue-600 hover:underline mb-4 inline-block"
        >
          ← {t('Back')}
        </Link>

          <img
            src={product.image}
            alt={'Product Image'}
            className="w-full h-72 object-cover rounded mb-6"
          />

        <div className="space-y-4 text-gray-700">
          <div>
            <span className="font-medium">{t('Service')}:</span>{' '}
           {translate(product.name)}
          </div>
          <div className='font-medium'>
            {translate(product.description)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
