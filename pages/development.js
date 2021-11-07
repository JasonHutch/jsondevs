import {createClient} from 'contentful';
import { urlObjectKeys } from 'next/dist/next-server/lib/utils';
import { getFontDefinitionFromNetwork } from 'next/dist/next-server/server/font-utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import BlogGrid from '../components/BlogGrid';
import DetailHero from '../components/DetailHero';
import PostCard from '../components/PostCard';
import TopicFilter from '../components/TopicFilter';
import TopicFilters from '../components/TopicFilter';
import styles from '../styles/DetailPage.module.css';

export async function getStaticProps(){
  //makes connection to contentful space
  const client = createClient({
    space: "3s3fdhgc7v0b",
    accessToken: "ahvnRSE51IUHWn2eEYmaSqxDDC18ombe2r7UXOgrpJk"
  })

  const posts = await client.getEntries({ content_type: 'blogPost', 'fields.type':'Development', order: '-fields.publishDate'})
  const hero = await client.getEntries({ content_type: 'detailHero', 'fields.pageTitle':'Development'})
  const tags = await client.getEntries({content_type:'tag', 'fields.type':'Development'})

  return {
    props:{
      posts: posts.items,
      hero: hero.items[0],
      tags: tags.items
    }
  }
}



export default function DevelopPage ({hero, posts, tags}) {
  var [activeTopics, setActiveTopics] = useState([]);

  function updateTopicFilters(topicName){
    var array = activeTopics;
        if(array.indexOf(topicName) == -1){
            array.push(topicName);
            var updatedArray = [...array];
            setActiveTopics(updatedArray);
        }else{
            var updatedArray= array.filter(topic => topic != topicName);
            setActiveTopics(updatedArray);
        }
  }

  function getFilteredPosts(posts){
    if(activeTopics.length == 0){
      return posts
    }else{
      var filteredArray = posts.filter(post => hasActiveTag(post));
      return filteredArray;
    }   
}

function getBlogTags(posts){
  var tags = [];
  posts.forEach((post)=>{
    var postTagName = post.fields.tags[0].fields.name;
    if(tags.indexOf(postTagName) == -1){
      tags.push(postTagName);
    }
  })
  return tags;
}

function hasActiveTag(blog){
  return activeTopics.includes(blog.fields.tags[0].fields.name);
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
  var blogTags = getBlogTags(posts);
  var groupedBlogs = groupBlogsByDate(getFilteredPosts(posts));
  var keyArray = [...groupedBlogs.keys()];

    return (
      <div className={styles.detailPageContainer}>
        <DetailHero hero={hero}/>
        <div className={styles.topicsContainer}>
          {blogTags && blogTags.map((tagName)=>(
            <TopicFilter topicName={tagName} callback={updateTopicFilters}/>
          ))}
        </div>
        <div className={styles.blogsContainer}>
          {keyArray.map((key)=>(
            <BlogGrid year={key} blogs={groupedBlogs.get(key)} page="development"/>
          ))}
        </div>
      </div>
    )
  }