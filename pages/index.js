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
  const homepageLinks = await client.getEntries({content_type: 'homepageLink'})

  

  return {
    props:{
      posts: posts.items,
      hero: hero.items[0],
      author: authors.items[0],
      homepageLinks: homepageLinks.items
    }
  }
}
export default function Render ({hero, posts, author, homepageLinks}) {
console.log(homepageLinks);
  return (
    <div className={styles.container}>
      <HomepageHero hero={hero} />
      <div className={styles.homepageCardsWrap}>
        <ul className={styles.cardsList}>
          {homepageLinks && homepageLinks.slice(0,3).map((card)=>{
            return <li><HomepageCard card={card}/></li>
          })}
        </ul>
      </div>
      <div className={styles.contentWrap}>
        <div className="main">
          <div className={styles.recentPostsWrap}>
            <div className={styles.cardWrap}>
              <div className={styles.titleWrap}>
                <h2 class="sectionTitle">Development</h2>
              </div>
              <div className={styles.cards}>
                {posts.slice(0,3).map((post)=>{
                  return <PostCard post={post}/>
                })}
              </div>
            </div>
            <div className={styles.cardWrap}>
              <div className={styles.titleWrap}>
                <h2 class="sectionTitle">Gaming</h2>
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
                <a class="twitter-timeline" data-width="300" data-height="800" href="https://twitter.com/Hutch_ii?ref_src=twsrc%5Etfw">Tweets by Hutch_ii</a> 
                </div>
        </div>
      </div>
    </div>
  )
}