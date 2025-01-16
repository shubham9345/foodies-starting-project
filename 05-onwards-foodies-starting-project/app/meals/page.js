import Link from "next/link";
import classes from "./page.module.css";
import MealsGrids from "@/Components/meal/meals-grid";
import { GetMeals } from "@/lib/Meals";
import { Suspense } from "react";

async function Meals() {
 const meals = await GetMeals();
 return <MealsGrids meals={meals} />
}


export default function MealPage() {

  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meal created{' '}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>Choose your favorite recipe and cook by yourself. It is easy and fun!</p>
        <p className={classes.cta}>
          <Link href="/meals/share">
            <p>Share your Favorite Recipe</p>
          </Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<p className={classes.loading}>Fetching Meals.....</p>}>
        <Meals/>
        </Suspense>
      
      </main>
    </>
  );
}
