import {createClient} from 'contentful';
import PostCard from '../components/PostCard';
import HomepageHero from '../components/HomepageHero';
import AboutMe from '../components/AboutMe';
import styles from '../styles/RecipeLayout.module.css';

export async function getStaticProps(){
  //makes connection to contentful space
  const client = createClient({
    space: "3s3fdhgc7v0b",
    accessToken: "ahvnRSE51IUHWn2eEYmaSqxDDC18ombe2r7UXOgrpJk"
  })

  const posts = await client.getEntries({ content_type: 'blogPost'})
  const hero = await client.getEntries({ content_type: 'homepageHero'})
  const authors = await client.getEntries({ content_type: 'author'})

  return {
    props:{
      posts: posts.items,
      hero: hero.items[0],
      author: authors.items[0]
    }
  }
}
export default function Render ({hero, posts, author}) {
  return (
    <div className={styles.container}>
      <HomepageHero hero={hero} />
      <div className={styles.recentPostsWrap}>
        <div className={styles.cardWrap}>
          <h2 class="sectionTitle">Recent</h2>
          <div className={styles.cards}>
            {posts.map((post)=>{
              return <PostCard post={post}/>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}