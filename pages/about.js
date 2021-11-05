import {createClient} from 'contentful';
import { urlObjectKeys } from 'next/dist/next-server/lib/utils';
import Image from 'next/image';
import { useState } from 'react';
import BlogGrid from '../components/BlogGrid';
import DetailHero from '../components/DetailHero';
import TopicFilter from '../components/TopicFilter';
import TopicFilters from '../components/TopicFilter';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import styles from '../styles/AboutPage.module.css';

export async function getStaticProps(){
  //makes connection to contentful space
  const client = createClient({
    space: "3s3fdhgc7v0b",
    accessToken: "ahvnRSE51IUHWn2eEYmaSqxDDC18ombe2r7UXOgrpJk"
  })

  const author = await client.getEntries({ content_type: 'author'})

  return {
    props:{
      author: author.items[0]
    }
  }
}



export default function About ({author}) {
    const {name, title, authorImage, company, email, bio } = author.fields;

    return (
      <div className={styles.aboutPageContainer}>
        <div className={styles.banner}>
          <Image src={'https:' + authorImage.fields.file.url} layout="fill"/>
        </div>
        <div className={styles.titleWrap}>
            <h1 className={styles.bioHeading}>A little about me</h1>
            <div className={styles.downloadButton}>Download Resume</div>
        </div>
        <div className={styles.bodyWrap}>
            {documentToReactComponents(bio)}
        </div>
      </div>
    )
  }