"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Briefcase, User as UserIcon } from "lucide-react";

import { TeamMember } from "@/app/interfaces/team";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TeamCardProps {
  member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden bg-background/40 backdrop-blur-sm border-border/40 hover:border-primary/50 transition-colors duration-300 shadow-lg hover:shadow-primary/10">
        <CardContent className="p-0 flex flex-col h-full">
          {/* Image Container */}
          <div className="relative h-64 w-full bg-muted/30 overflow-hidden group">
            {member.image && !imgError ? (
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-secondary/20">
                <UserIcon className="w-20 h-20 text-muted-foreground/50" />
              </div>
            )}
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-grow">
            <div className="mb-4">
              <h3 className="text-xl font-semibold tracking-tight text-foreground mb-1 line-clamp-1">
                {member.name}
              </h3>
              <div className="flex items-center text-sm font-medium text-primary/80 mb-3">
                <Briefcase className="w-4 h-4 mr-2" />
                <span className="line-clamp-1">{member.role}</span>
              </div>
              
              {member.bio && (
                <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                  {member.bio}
                </p>
              )}
            </div>

            <div className="mt-auto pt-4 border-t border-border/40">
              <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground" asChild>
                <a href={`mailto:${member.email}`}>
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="truncate">{member.email}</span>
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
