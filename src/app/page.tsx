import BrandCard from "@/components/sections/BrandCard";
import HeroCard from "@/components/sections/HeroCard";
import StepsCard from "@/components/sections/StepsCard";
import FinanceCard from "@/components/sections/FinanceCard";
import RegisterCard from "@/components/sections/RegisterCard";

export default function HomePage() {
  return (
    <main className="grid grid-cols-[1fr_1.5fr] max-lg:grid-cols-1 gap-[1vw] max-md:gap-1 w-full">
      <BrandCard />
      <HeroCard />
      <StepsCard />
      <FinanceCard />
      <RegisterCard />
    </main>
  );
}
