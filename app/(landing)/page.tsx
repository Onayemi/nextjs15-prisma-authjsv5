// import { Case } from "@/components/case";
import { Blog } from "@/components/blog";
import { Case2 } from "@/components/case2";
import { Contact } from "@/components/contact";
import { FAQ2 } from "@/components/faq2";
import { Feature8 } from "@/components/feature";
import { Feature2 } from "@/components/feature2";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Pricing } from "@/components/pricing";
import { Stats1 } from "@/components/stats1";

export default function Home() {
  return (
    <div>
      <Hero />
      <Case2 />
      <Stats1 />
      <Blog />
      <Feature8 />
      <Contact />
      <Feature2 />
      <FAQ2 />
      <Pricing />
      <Footer />
    </div>
  );
}
