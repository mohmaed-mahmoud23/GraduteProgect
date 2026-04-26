import HeroPremium from "./_components/HeroPremium";
import CinematicScroll from "./_components/CinematicScroll";
import HorizontalScrollGallery from "./_components/HorizontalScrollGallery";
import AestheticPerfection from "./_components/AestheticPerfection";
import ProductShowcase from "./_components/ProductShowcase";
import REdy from "./_components/RedyTOpridinet";

export default function Homepage() {
  return (
    <main className="flex flex-col w-full bg-background overflow-hidden relative">
      <HeroPremium />
      <CinematicScroll />
      <HorizontalScrollGallery />
      <AestheticPerfection />
      <ProductShowcase />
      <REdy />
    </main>
  );
}
