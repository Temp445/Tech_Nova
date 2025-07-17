
import { useTranslations } from "next-intl";
import Link from "next/link";

const Hero = () => {
    const t = useTranslations('Hero')
  return (
    <div className="relative bg-[url('../assets/bg.jpg')] bg-cover bg-center h-screen flex items-center container mx-auto 2xl:h-fit 2xl:py-44 ">

      <div className="relative z-10  text-white max-w-2xl px-4">
        <h1 className="text-4xl md:text-5xl  font-bold mb-4">
          {t('Title')}
        </h1>
        <p className="text-lg md:text-xl mb-6 pr-5">
        {t('Des')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-24">
          <Link href="/products" className="bg-amber-400 hover:bg-amber-500 text-black font-semibold px-6 py-3 rounded-full transition">
            {t('ProductList')}
          </Link>
          <Link href="/products/68789b738e88e69dea3a892f" className="border border-white hover:bg-white hover:text-black text-white font-semibold px-6 py-3 rounded-full transition">
            {t('button')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
