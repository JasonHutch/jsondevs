import {createClient} from 'contentful';
import RecipieCard from '../components/RecipieCard';
import HomepageHero from '../components/HomepageHero';
import styles from '../styles/RecipeLayout.module.css';

export async function getStaticProps(){
  //makes connection to contentful space
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY
  })

  const posts = await client.getEntries({ content_type: 'blogPost'})
  const hero = await client.getEntries({ content_type: 'homepageHero'})

  return {
    props:{
      posts: posts.items,
      hero: hero.items[0]
    }
  }
}
export default function Render ({hero}) {
  console.log(hero);
  return (
    <div>
      <HomepageHero hero={hero} />
    </div>
  )
}