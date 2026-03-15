'use client';

import { useEffect, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface HeroAction {
  label: string;
  href: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
}

interface HeroStat {
  value: string;
  label: string;
}

interface HeroImage {
  src: string;
  alt: string;
}

interface HeroSection9Props {
  badge?: string;
  heading: string;
  description: string;
  actions?: HeroAction[];
  stats?: HeroStat[];
  images?: HeroImage[];
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 0.5 + i * 0.2,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

export default function HeroSection9({
  badge,
  heading,
  description,
  actions = [],
  stats = [],
  images = [],
}: HeroSection9Props) {
  /* ---------- animated gradient ---------- */
  const [gradientStyle, setGradientStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    setGradientStyle({
      backgroundImage:
        'radial-gradient(circle at 20% 50%, rgba(0,48,112,0.08) 0%, transparent 50%),' +
        'radial-gradient(circle at 80% 50%, rgba(0,48,112,0.06) 0%, transparent 50%)',
    });
  }, []);

  /* ---------- image collage ---------- */
  const hasImages = images.length >= 5;

  return (
    <section className="relative overflow-hidden bg-[#FAFAFA] py-12 md:py-20">
      {/* subtle gradient background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={gradientStyle}
      />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* ---- Left column — text ---- */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {badge && (
              <motion.div
                custom={0}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
              >
                <span className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
                  {badge}
                </span>
              </motion.div>
            )}

            <motion.h1
              custom={1}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="mb-4 text-h1 font-bold leading-tight tracking-tight text-foreground md:text-[40px] lg:text-[48px]"
            >
              {heading}
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="mb-8 max-w-xl text-nav leading-relaxed text-muted-foreground md:text-body"
            >
              {description}
            </motion.p>

            {/* CTA buttons */}
            {actions.length > 0 && (
              <motion.div
                custom={3}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                className="mb-10 flex flex-wrap justify-center gap-3 lg:justify-start"
              >
                {actions.map((action, idx) => (
                  <Button
                    key={idx}
                    variant={action.variant || 'default'}
                    size="lg"
                    asChild
                  >
                    <a href={action.href}>{action.label}</a>
                  </Button>
                ))}
              </motion.div>
            )}

            {/* Stats row */}
            {stats.length > 0 && (
              <motion.div
                custom={4}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap justify-center gap-x-10 gap-y-4 lg:justify-start"
              >
                {stats.map((stat, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-h2 font-bold text-primary">
                      {stat.value}
                    </span>
                    <span className="text-caption text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* ---- Right column — image collage ---- */}
          {hasImages && (
            <motion.div
              custom={2}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="relative mx-auto hidden w-full max-w-lg lg:block"
            >
              <div className="relative aspect-[4/5]">
                {/* Large center image */}
                <div className="absolute inset-[10%] z-10 overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src={images[0].src}
                    alt={images[0].alt}
                    fill
                    className="object-cover"
                    sizes="(min-width:1024px) 350px, 0px"
                    priority
                  />
                </div>

                {/* Small surrounding images */}
                {[
                  'top-0 left-0 h-1/3 w-1/3',
                  'top-0 right-0 h-1/3 w-1/3',
                  'bottom-0 left-0 h-1/3 w-1/3',
                  'bottom-0 right-0 h-1/3 w-1/3',
                ].map((pos, idx) => (
                  <div
                    key={idx}
                    className={`absolute ${pos} overflow-hidden rounded-xl shadow-lg`}
                  >
                    <Image
                      src={images[idx + 1].src}
                      alt={images[idx + 1].alt}
                      fill
                      className="object-cover"
                      sizes="160px"
                    />
                  </div>
                ))}

                {/* Decorative ring */}
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full border-4 border-primary/20" />
                <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full border-4 border-primary/10" />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
