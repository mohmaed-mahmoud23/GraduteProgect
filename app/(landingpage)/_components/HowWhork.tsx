"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, ImageIcon, Shield } from "lucide-react";

const cardsData = [
  {
    id: 1,
    icon: MapPin,
    title: "Creative Design",
    description:
      "We provide modern and creative design solutions for your projects.",
  },
  {
    id: 2,
    icon: ImageIcon,
    title: "Innovative Solutions",
    description:
      "Our innovative solutions help your business grow efficiently.",
  },
  {
    id: 3,
    icon: Shield,
    title: "Professional Support",
    description: "We offer professional support to guide you at every step.",
  },
];

export default function HowWork() {
  return (
    <section className=" py-16 bg-background">
      <div className="max-w-7xl mx-auto text-center lg:text-left ">
        <h2 className="text-4xl font-bold text-foreground mb-4">How It Work</h2>
        <p className="text-muted-foreground mb-12 max-w-2xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
          nihil. Discover how our services can transform your ideas into
          reality.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cardsData.map((card) => (
            <Card
              key={card.id}
              className="border border-border shadow-md hover:shadow-xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <CardHeader className="flex flex-col items-center gap-4 pt-6">
                <card.icon size={60} className="text-primary" />
                <CardTitle className="text-xl font-semibold text-center text-foreground">
                  {card.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col items-center gap-2 pb-6">
                <p className="text-center text-muted-foreground px-4">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
