import {createClient} from 'contentful';
import PostCard from '../components/PostCard';
import HomepageHero from '../components/HomepageHero';
import AboutMe from '../components/AboutMe';
import styles from '../styles/RecipeLayout.module.css';
import HomepageCard from '../components/HomepageCard';
import Glide from '@glidejs/glide'
import { useEffect } from 'react';

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
      <div className={styles.homepageCardsWrap}>
        <div className={styles.titleWrap}>
          <h2 class="sectionTitle">Home</h2>
        </div>
        <ul className={styles.cardsList}>
          <li><HomepageCard/></li>
          <li><HomepageCard/></li>
          <li><HomepageCard/></li>
        </ul>
      </div>
      <div className={styles.contentWrap}>
        <div className="main">
          <div className={styles.recentPostsWrap}>
            <div className={styles.cardWrap}>
              <div className={styles.titleWrap}>
                <h2 class="sectionTitle">Recent Development</h2>
              </div>
              <div className={styles.cards}>
                {posts.slice(0,3).map((post)=>{
                  return <PostCard post={post}/>
                })}
              </div>
            </div>
            <div className={styles.cardWrap}>
              <div className={styles.titleWrap}>
                <h2 class="sectionTitle">Recent Gaming</h2>
              </div>
              <div className={styles.cards}>
                {posts.slice(0,3).map((post)=>{
                  return <PostCard post={post}/>
                })}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.rail}>
                <div className={styles.twitterWrapper}>
                <a class="twitter-timeline" data-width="300" data-height="600" href="https://twitter.com/Hutch_ii?ref_src=twsrc%5Etfw">Tweets by Hutch_ii</a> 
                </div>
        </div>
      </div>
    </div>
  )
}