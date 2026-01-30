import React from 'react'
import { MealCard } from '../MealCard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ItemHeader } from './ItemHeader'

const goldColor = "#C0A975";

export interface MealCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  category: string;
}




 export const meals: MealCardProps[] = [
  {
    id: "1",
    title: "Gold Leaf Chocolate",
    description: "Valrhona dark chocolate sphere, edible 24k gold, warm caramel pour.",
    price: 45,
    image: "https://img.freepik.com/free-photo/lavash-rolls-top-view-table_140725-7368.jpg?t=st=1769786235~exp=1769789835~hmac=f4c0f45a3e7934c7fc71a6a9d310bd4d9c9ab908dc4a9dd7fa9f5cfe10c0629e&w=740", // Make sure to add this image to public/images
    rating: 4.9,
    category: "Desserts",
  },
  {
    id: "2",
    title: "Wagyu Truffle Burger",
    description: "A5 Japanese Wagyu beef, shaved black truffle, brioche bun, aged cheddar.",
    price: 85,
    image: "https://img.freepik.com/premium-photo/topdown-view-hearty-meal-grilled-chicken-fries-fresh-salad_1270611-7398.jpg?w=740",
    rating: 4.8,
    category: "Main Course",
  },
  {
    id: "3",
    title: "Lobster Thermidor",
    description: "Whole Maine lobster, cognac cream sauce, gruyère cheese crust, wild rice.",
    price: 120,
    image: "https://img.freepik.com/free-photo/penne-pasta-tomato-sauce-with-chicken-tomatoes-wooden-table_2829-19739.jpg?t=st=1769785824~exp=1769789424~hmac=2bad0778998b4412ad57123a5674d77c5169af3c4ba2485310746818ff3890c4&w=740",
    rating: 5.0,
    category: "Seafood",
  },
  {
    id: "4",
    title: "Saffron Risotto",
    description: "Acquerello rice, Iranian saffron, parmigiano reggiano, gold dust.",
    price: 55,
    image: "https://img.freepik.com/free-photo/lavash-rolls-with-stuffings-tomatoes_114579-3418.jpg?t=st=1769785698~exp=1769789298~hmac=8898fc71e37c1c7a9488a27c0f51b70b96539e93bc65ea3661d68461247d472f&w=740",
    rating: 4.7,
    category: "Vegetarian",
  },
  {
    id: "5",
    title: "Caviar & Blinis",
    description: "Oscietra caviar, buckwheat blinis, crème fraîche, chives, egg mimosa.",
    price: 150,
    image: "https://img.freepik.com/free-photo/lavash-rolls-with-stuffings-tomatoes_114579-3418.jpg?t=st=1769785698~exp=1769789298~hmac=8898fc71e37c1c7a9488a27c0f51b70b96539e93bc65ea3661d68461247d472f&w=740",
    rating: 4.9,
    category: "Appetizers",
  },
  {
    id: "6",
    title: "Matcha Lava Cake",
    description: "Warm ceremonial matcha filling, vanilla bean ice cream, sesame crisp.",
    price: 35,
    image: "https://img.freepik.com/free-psd/roasted-chicken-dinner-platter-delicious-feast_632498-25445.jpg?ga=GA1.1.1221827327.1769762132&semt=ais_hybrid&w=740&q=80",
    rating: 4.6,
    category: "Desserts",
  },
];




const MealItemSection = () => {
  return (
    <section className="bg-zinc-950 py-20">
      <div className="container mx-auto px-4 md:px-6">
        <ItemHeader />
        {/* Section Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-medium tracking-[0.2em] text-[#C0A975] uppercase">
              Curated Menu
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-medium text-white">
              Signature Dishes
            </h2>
          </div>

          {/* <Button
            asChild
            variant="ghost"
            className="group hidden md:inline-flex p-0 text-sm font-medium tracking-widest text-[#C0A975] hover:bg-transparent hover:text-[#D4B988]"
          >
            <Link href="/menu">
              FULL MENU
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button> */}
        </div>

        {/* Meal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {meals.map((meal) => (
            <MealCard
              key={meal.id}
              title={meal.title}
              description={meal.description}
              price={meal.price}
              image={meal.image}
              rating={meal.rating}
              category={meal.category}
            />
          ))}
        </div>

        {/* Mobile View All Button (Bottom) */}
        <div className="mt-12 flex justify-center md:hidden">
          <Button
            asChild
            variant="outline"
            className="border-[#C0A975] text-[#C0A975] hover:bg-[#C0A975] hover:text-black rounded-none px-8 tracking-widest"
          >
            <Link href="/menu">
              VIEW FULL MENU
            </Link>
          </Button>
        </div>
        
      </div>
    </section>
  )
}

export default MealItemSection



