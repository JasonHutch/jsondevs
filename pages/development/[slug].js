import {createClient} from 'contentful';
import Image from 'next/image';
import styles from '../../styles/ArticleDetail.module.css'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

const client = createClient({
  space: "3s3fdhgc7v0b",
  accessToken: "ahvnRSE51IUHWn2eEYmaSqxDDC18ombe2r7UXOgrpJk"
})

//These remind me of lifecylce methods, seems to be apart of next js. get static paths, gets all recipes and then teturns a params object that contains slug for each
export const getStaticPaths = async () =>{
  const res = await client.getEntries({content_type:'blogPost'})

  const paths = res.items.map(item =>{
    return {
      params:{slug:item.fields.slug}
    }
  })

  return {
    paths, // paths of all items in contentful
    fallback: false //if you go to path that does not exist you go to 404 Page
  }
}

// another lifecylce function, passes props to the component below
export async function getStaticProps({ params }){
  const { items } = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': params.slug
  })

  return {
    props: {blogs: items[0]},
    revalidate: 1
  }
}


export default function RecipeDetails({blogs}) {
  const {featuredImage, title, body, publishDate, tags } = blogs.fields;

  var date = new Date(publishDate);
  var dateString = date.toLocaleString('en-US',{
    weekday:'long',
    month: 'short',
    day:'numeric',
    year: 'numeric'
  })

  console.log(tags);
  
  return (
    <div>
      <div className={styles.banner}>
          <Image className={styles} src={'https:' + featuredImage.fields.file.url} layout="fill" objectFit="cover"/>
      </div>
      <div className={styles.body}>
        <div className={styles.detailPageHeader}>
          <p className="topicTag">{tags && tags.length > 0 ? tags[0].fields.name : "Development"}</p>
          <style jsx>{`
               .topicTag{
                 color:${tags && tags.length > 0 ? tags[0].fields.color : "blue"};
                 font-family: "Proxima-Nova-Bold";
                 font-size: 20px;
                 margin: 0px;
               }
            `}</style>
          <h1 className={styles.articleTitle}>{title}</h1>
          <p className={styles.dateString}>{dateString}</p>
          <p className={styles.bodyText}>{documentToReactComponents(body)}</p>
        </div>
      </div>
    </div>
  )
}