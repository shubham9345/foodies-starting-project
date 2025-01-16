import { GetMeal } from '@/lib/Meals';
import classes from './page.module.css';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function MealsDetailPage({ params }) {
    const meals = await GetMeal(params.mealSlug); 

   if(!meals){
    notFound();
   }
    const instructions = meals.instructions.replace(/\n/g, '<br/>');

    return (
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image src={meals.image} alt={meals.title} fill />
                </div>
                <div className={classes.headerText}>
                    <h1>{meals.title}</h1>
                    <p className={classes.creator}>
                        by <a href={`mailto:${meals.creator_email}`}>{meals.creator}</a>
                    </p>
                    <p className={classes.summary}>{meals.summary}</p>
                </div>
            </header>
            <main>
                <p
                    className={classes.instructions}
                    dangerouslySetInnerHTML={{
                        __html: instructions, // Use __html key here
                    }}
                ></p>
            </main>
        </>
    );
}
