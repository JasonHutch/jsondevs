import {createClient} from 'contentful';
import RecipieCard from '../components/RecipieCard';
import styles from '../styles/RecipeLayout.module.css';

export async function getStaticProps(){
  //makes connection to contentful space
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY
  })

  const res = await client.getEntries({ content_type: 'blogPost'})

  return {
    props:{
      posts: res.items,
    }
  }
}
export default function Recipes({posts}) {
  console.log(posts);
  return (
    <div className={styles.recipeList}>
      {posts.map(post =>(
        <RecipieCard key={post.sys.id} post={post}/>
      ))}
    </div>
  )
}