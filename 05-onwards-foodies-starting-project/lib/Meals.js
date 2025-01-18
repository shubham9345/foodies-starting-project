import sql from 'better-sqlite3';
import { error } from 'node:console';
import fs from 'node:fs';
import slugify from 'slugify';
import xss from 'xss';
const db = sql('meals.db');

export async function GetMeals(){
    await new Promise((resolve)=> setTimeout(resolve,2000));
    return db.prepare('SELECT * FROM meals').all();
}

export function GetMeal(slug){
   return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export  async function SaveMeal(meal){
    meal.slug = slugify(meal.title,{lower: true});
    meal.instructions = xss(meal.instructions);
   const extension = meal.image.name.split('.').pop();
   const fileName = `${meal.slug}.${extension}`;
   const stream = fs.createWriteStream(`public/images/${fileName}`);
   const bufferedImage = await meal.image.arrayBuffer();
   stream.write(Buffer.from(bufferedImage),(error)=>{
    if(error){
        throw new Error('Saving Image Failed!');
    }
   });
   meal.image = `/images/${fileName}`;
   db.prepare(`
     INSERT INTO Meals (title, summary, instructions, creator, creator_email, image, slug)
     VALUES (
     @title,
     @summary,
     @instructions,
     @creator,
     @creator_email,
     @image,
     @slug
     )
    `
   ).run(meal)

}