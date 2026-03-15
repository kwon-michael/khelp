"use client"

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CalendarDays, User, BookOpen } from "lucide-react";

interface GlassArticleCardProps {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  formattedDate: string;
  author?: string;
  tags?: string[];
  className?: string;
}

export function GlassArticleCard({
  title,
  excerpt,
  image,
  date,
  formattedDate,
  author,
  tags,
  className,
}: GlassArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className={cn("w-full", className)}
    >
      <Card className="group relative flex h-full flex-col overflow-hidden rounded-2xl border-border/50 bg-card/80 backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
        {/* Image Section */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
              {tags.slice(0, 3).map((tag, index) => (
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

          {/* Hover Read Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-caption font-semibold text-white shadow-lg shadow-primary/25">
              <BookOpen className="h-5 w-5" />
              Read Article
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex-1 space-y-2">
            <h2 className="text-h3 font-semibold leading-tight tracking-tight text-foreground transition-colors group-hover:text-primary">
              {title}
            </h2>
            <p className="line-clamp-3 text-nav text-muted-foreground leading-relaxed">
              {excerpt}
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-border/50 pt-3">
            {author && (
              <div className="flex items-center gap-2 text-caption text-muted-foreground">
                <User className="h-4 w-4 shrink-0 text-primary" />
                <span className="font-medium">{author}</span>
              </div>
            )}

            <div className="flex items-center gap-2 text-caption text-muted-foreground">
              <CalendarDays className="h-4 w-4 shrink-0 text-primary" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
