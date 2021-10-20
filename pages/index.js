import {createClient} from 'contentful';
import RecipieCard from '../components/RecipieCard';
import styles from '../styles/RecipeLayout.module.css';

export async function getStaticProps(){
  //makes connection to contentful space
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY
  })

  const res = await client.getEntries({ content_type: 'recipe'})

  return {
    props:{
      recipies: res.items,
    }
  }
}
export default function Recipes({recipies}) {
  console.log(recipies);
  return (
    <div className={styles.recipeList}>
      {recipies.map(recipe =>(
        <RecipieCard key={recipe.sys.id} recipe={recipe}/>
      ))}
    </div>
  )
}