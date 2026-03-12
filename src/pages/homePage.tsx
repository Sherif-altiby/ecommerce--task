import Hero from "../components/Home/Hero";
import BestSeller from "../components/Home/BestSeller";
import Stats from "../components/Home/Stats";
import Categories from "../components/Home/Categories";

export default function HomePage() {
  
  return (
    <div>
      <Hero />
      <Stats />
      <Categories />

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="border-t border-blue-100 my-10" />
      </div>

      <BestSeller />
    </div>
  );
}
