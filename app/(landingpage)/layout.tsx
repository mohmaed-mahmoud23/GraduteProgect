import { ReactNode } from "react";
import Navbar from "./_components/Navbar";
import Foter from "./_components/Foter";
import SmoothScroll from "./_components/SmoothScroll";

export default function layoutlandingpage({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SmoothScroll>
      <div>
        <Navbar/>
        {children}
        <Foter/>
      </div>
    </SmoothScroll>
  );
}
