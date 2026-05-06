import { StaticImageData } from "next/image";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image?: string | StaticImageData; // ✅ الحل هنا
  email: string;
  bio?: string;
}
