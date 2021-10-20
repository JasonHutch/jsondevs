import {createClient} from 'contentful';
import Image from 'next/image';
import styles from '../../styles/RecipeDetail.module.css'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY
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
  const {featuredImage, title, body } = blogs.fields;
  return (
    <div>
      <div className={styles.banner}>
          <Image src={'https:' + featuredImage.fields.file.url} width={featuredImage.fields.file.details.image.width} height={featuredImage.fields.file.details.image.height}/>
      </div>
      <div className={styles.method}>
        <h3>{documentToReactComponents(body)}</h3>
        
      </div>
    </div>
  )
}