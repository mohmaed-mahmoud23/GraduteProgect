"use client";

import { useState, useMemo } from "react";
import { Search, Plus, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { TeamMember } from "@/app/interfaces/team";
import { TeamCard } from "./TeamCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TeamGridProps {
  members: TeamMember[];
}

export function TeamGrid({ members }: TeamGridProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = useMemo(() => {
    return members.filter((member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [members, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Controls Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-card/30 p-4 rounded-xl border border-border/40 backdrop-blur-sm">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-background/50 border-border/50 focus-visible:ring-primary/30"
          />
        </div>
        
        <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105">
          <Plus className="mr-2 h-4 w-4" /> Add Member
        </Button>
      </div>

      {/* Grid */}
      {filteredMembers.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredMembers.map((member) => (
              <motion.div
                key={member.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <TeamCard member={member} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* Empty State */
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20 px-4 text-center bg-card/20 rounded-2xl border border-dashed border-border/50"
        >
          <div className="h-20 w-20 rounded-full bg-muted/30 flex items-center justify-center mb-6">
            <Users className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-2xl font-semibold mb-2 tracking-tight">No team members found</h3>
          <p className="text-muted-foreground max-w-md mb-6">
            We couldn&apos;t find anyone matching your search for &quot;{searchQuery}&quot;. Try adjusting your filters or add a new team member.
          </p>
          <Button variant="outline" onClick={() => setSearchQuery("")}>
            Clear Search
          </Button>
        </motion.div>
      )}
    </div>
  );
}
