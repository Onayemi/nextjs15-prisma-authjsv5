import { Case } from "@/components/case";
import { Contact } from "@/components/contact";
import { Feature8 } from "@/components/feature";
import { Feature2 } from "@/components/feature2";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Pricing } from "@/components/pricing";

export default function Home() {
  return (
    <div>
      <Hero />
      <Case />
      <Feature8 />
      <Contact />
      <Feature2 />
      <Pricing />
      <Footer />
    </div>
  );
}
