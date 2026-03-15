"use client"

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, Clock } from "lucide-react";

interface GlassEventCardProps {
  title: string;
  description: string;
  image: string;
  date: string;
  formattedDate: string;
  location: string;
  tags?: string[];
  isPast?: boolean;
  className?: string;
}

export function GlassEventCard({
  title,
  description,
  image,
  date,
  formattedDate,
  location,
  tags,
  isPast = false,
  className,
}: GlassEventCardProps) {
  const eventDate = new Date(date + "T00:00:00");
  const month = eventDate.toLocaleDateString("en-CA", { month: "short" });
  const day = eventDate.getDate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className={cn("w-full", className)}
    >
      <Card
        className={cn(
          "group relative h-full overflow-hidden rounded-2xl border-border/50 bg-card/80 backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10",
          isPast && "opacity-80"
        )}
      >
        {/* Image Section */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className={cn(
              "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
              isPast && "grayscale-[40%] group-hover:grayscale-0"
            )}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

          {/* Date Badge Overlay */}
          <div className={cn(
            "absolute top-4 left-4 flex flex-col items-center rounded-xl px-4 py-2 shadow-lg",
            isPast
              ? "bg-muted-foreground text-white"
              : "bg-primary text-primary-foreground"
          )}>
            <span className="text-small font-semibold uppercase leading-tight tracking-wide">
              {month}
            </span>
            <span className="text-h2 font-bold leading-tight">{day}</span>
          </div>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="absolute bottom-3 left-3 flex gap-2">
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-background/60 text-small backdrop-blur-sm hover:bg-background/80"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex flex-col gap-3 p-5">
          <div className="space-y-2">
            <h3 className="text-h3 font-semibold leading-tight tracking-tight text-foreground transition-colors group-hover:text-primary">
              {title}
            </h3>
            <p className="line-clamp-3 text-nav text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>

          <div className="flex flex-col gap-2 border-t border-border/50 pt-3">
            <div className="flex items-center gap-2 text-caption text-muted-foreground">
              <CalendarDays className="h-4 w-4 shrink-0 text-primary" />
              <span>{formattedDate}</span>
            </div>

            <div className="flex items-center gap-2 text-caption text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0 text-primary" />
              <span className="line-clamp-1">{location}</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
