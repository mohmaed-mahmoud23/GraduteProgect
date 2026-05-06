import { Metadata } from "next";
import { TeamGrid } from "@/components/team/TeamGrid";
import { TeamMember } from "@/app/interfaces/team";

import logo from "@/public/images/IMG_2239.JPG.jpeg";
import loogo2 from "@/public/images/image (28).png";
import loogo3 from "@/public/images/IMG_0625.JPG.jpeg";
export const metadata: Metadata = {
  title: "Team | Dashboard",
  description: "Manage your team members and roles.",
};

// Mock data for initial implementation
const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Mohamed Mahmoud",
    role: "Full Stack Developer",
    email: "mohamed@example.com",
    bio: "Passionate about building scalable web applications and intuitive user interfaces.",
image: loogo2 

},
  {
    id: "2",
    name: "muahb mohamed",
    role: "UI/UX Designer",
    email: "esraa@example.com",
    bio: "Creating beautiful and accessible digital experiences that users love.",
    image: logo,
  },
  {
    id: "3",
    name: "Ahmed Hassan",
    role: "Backend Engineer",
    email: "ahmed@example.com",
    bio: "Specializing in cloud architecture and high-performance APIs.",
    image: loogo3,
  },
  {
    id: "4",
    name: "Sarah Jones",
    role: "Product Manager",
    email: "sarah@example.com",
    bio: "Bridging the gap between engineering and business to deliver value.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
  },
];

export default function TeamPage() {
  return (
    <div className="flex flex-col space-y-8 w-full max-w-7xl mx-auto pb-10">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Team Members
        </h1>
        <p className="text-muted-foreground text-lg">
          Manage your team directory, roles, and contact information.
        </p>
      </div>

      {/* Grid Container */}
      <TeamGrid members={mockTeamMembers} />
    </div>
  );
}