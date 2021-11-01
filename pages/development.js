import {createClient} from 'contentful';
import { urlObjectKeys } from 'next/dist/next-server/lib/utils';
import Image from 'next/image';
import { useState } from 'react';
import BlogGrid from '../components/BlogGrid';
import DetailHero from '../components/DetailHero';
import TopicFilter from '../components/TopicFilter';
import TopicFilters from '../components/TopicFilter';
import styles from '../styles/DetailPage.module.css';

export async function getStaticProps(){
  //makes connection to contentful space
  const client = createClient({
    space: "3s3fdhgc7v0b",
    accessToken: "ahvnRSE51IUHWn2eEYmaSqxDDC18ombe2r7UXOgrpJk"
  })

  const posts = await client.getEntries({ content_type: 'blogPost'})
  const hero = await client.getEntries({ content_type: 'detailHero'})

  return {
    props:{
      posts: posts.items,
      hero: hero.items[0],
    }
  }
}



export default function DevelopPage ({hero, posts}) {
  var [activeTopics, setActiveTopics] = useState([]);

  function updateTopicFilters(topicName){
    var array = activeTopics;
        if(array.indexOf(topicName) == -1){
            array.push(topicName);
            var updatedArray = array;
            setActiveTopics(updatedArray);
        }else{
            var updatedArray= array.filter(topic => topic != topicName);
            setActiveTopics(updatedArray);
        }
  }

  function groupBlogsByDate(blogs){
    var groupedPosts = new Map();
    blogs.forEach((blog) => {
      var date = new Date(blog.fields.publishDate);
      var blogYear = date.getFullYear()

      if(groupedPosts.has(blogYear)){
        var yearPosts = groupedPosts.get(blogYear);
        yearPosts.push(blog);
        groupedPosts.set(blogYear, yearPosts);
      }else{
        groupedPosts.set(blogYear, [blog])
      }
    });
    return groupedPosts;
  }

  var groupedBlogs = groupBlogsByDate(posts);
  var keyArray = [...groupedBlogs.keys()];


    return (
      <div className={styles.detailPageContainer}>
        <DetailHero hero={hero}/>
        <div className={styles.topicsContainer}>
            <TopicFilter topicName={"React"} callback={updateTopicFilters}/>
            <TopicFilter topicName={"DevOps"} callback={updateTopicFilters}/>
            <TopicFilter topicName={"Dev Culture"} callback={updateTopicFilters}/>
        </div>
        <div className={styles.blogsContainer}>
          {keyArray.map((key)=>(
            <BlogGrid year={key} blogs={groupedBlogs.get(key)}/>
          ))}
        </div>
      </div>
    )
  }