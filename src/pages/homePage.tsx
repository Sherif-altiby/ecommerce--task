import BestSeller from "../components/bestSeller/BestSeller";
import Categories from "../components/category/Categories";
import Stats from "../components/category/Stats";
import Hero from "../components/Home/Hero";
 

export default function HomePage() {
  
  return (
    <div>
      <Hero />
      <Stats />
      <Categories />
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="border-t border-blue-100 my-10" />
          </div>
      <BestSeller />
    </div>
  );
}
