
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { PromotionalBannerData } from '@/types';

interface PromotionalBannerProps {
  banner: PromotionalBannerData;
}

const PromotionalBanner: React.FC<PromotionalBannerProps> = ({ banner }) => {
  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-lg my-8">
      <Image
        src={banner.imageUrl}
        alt={banner.title}
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-500 hover:scale-105"
        data-ai-hint={banner.imageHint || "promotional event"}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white drop-shadow-md">
          {banner.title}
        </h2>
        {banner.subtitle && (
          <p className="mt-2 text-lg md:text-xl text-gray-200 drop-shadow-sm max-w-2xl">
            {banner.subtitle}
          </p>
        )}
        {banner.ctaText && banner.ctaLink && (
          <Button asChild size="lg" className="mt-6 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href={banner.ctaLink}>{banner.ctaText}</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default PromotionalBanner;
