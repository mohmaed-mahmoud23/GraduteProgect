import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Imageone from "../../../public/images/annamed.png";
import Imagetow from "../../../public/images/unndamed.png";
import Imagethres from "../../../public/images/qunnamed.png";
import ImageFor from "../../../public/images/sdrnnamed.png";

// هنا اعملنا المصفوفة 3 اوبجكت
const cardsData = [
  {
    id: 1,
    image: Imageone, // استبدل بالمسار الفعلي للصورة
    title: "Creative Design",
    description:
      "We provide modern and creative design solutions for your projects.",
    buttonText: "Learn More",
  },
  {
    id: 2,
    image: Imagetow,
    title: "Innovative Solutions",
    description:
      "Our innovative solutions help your business grow efficiently.",
    buttonText: "Discover",
  },
  {
    id: 3,
    image: Imagethres,
    title: "Professional Support",
    description:
      "We offer professional support to guide you at every step jfj fpsmv .",
    buttonText: "Get Started",
  },
  {
    id: 4,
    image: ImageFor,
    title: "Professional Support",
    description:
      "We offer professional support to guide you at every step jfj fpsmv .",
    buttonText: "Get Started",
  },
];

export default function FetcherServces() {
  return (
    <div className="px-8 py-12">
      <h1 className="text-4xl text-muted-foreground font-bold mb-10 text-center">
        Our FetcherServces
      </h1>

      <div className="   max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4   ">
        {cardsData.map((card) => (
          <Card
            key={card.id}
            className="border max-w-full w-100% border-transparent shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
          >
            <CardHeader className="flex flex-col items-center gap-4">
              <Image
                src={card.image}
                alt={card.title}
                width={120}
                height={120}
                className="rounded-lg object-cover"
              />
              <CardTitle className="text-xl font-semibold text-center">
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <p className="text-center text-muted-foreground">
                {card.description}
              </p>
              <Button className="w-full">{card.buttonText}</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
