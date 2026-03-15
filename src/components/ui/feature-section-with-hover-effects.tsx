'use client';

import type { ReactNode } from 'react';
import { cn } from "@/lib/utils";

export interface Feature {
  title: string;
  description: string;
  icon: ReactNode;
}

interface FeaturesSectionProps {
  features?: Feature[];
}

/**
 * Reusable feature section with hover effects.
 * Accepts a `features` array of { title, description, icon } objects
 * so the parent can pass translated content.
 */
export function FeaturesSectionWithHoverEffects({ features = [] }: FeaturesSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <FeatureCard key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

interface FeatureCardProps extends Feature {
  index: number;
}

function FeatureCard({ title, description, icon, index }: FeatureCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature border-neutral-200",
        (index === 0 || index === 4) && "lg:border-l border-neutral-200",
        index < 4 && "lg:border-b border-neutral-200"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-primary [&>svg]:w-8 [&>svg]:h-8">
        {icon}
      </div>
      <div className="text-h3 font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 group-hover/feature:bg-primary transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800">
          {title}
        </span>
      </div>
      <p className="text-body leading-[1.7] text-neutral-600 max-w-sm relative z-10 px-10">
        {description}
      </p>
    </div>
  );
}
