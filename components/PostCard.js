import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/RecipeCard.module.css'


export default function PostCard({post}){
    const {title, slug, description, thumbnail} = post.fields
    return(
        <div className={styles.card}>
            <div className="featured">
                {/*Automatically optimizes image -- lazy loading -- Must whitelist domain in next config, and specify height and width which can be found on the image item itself*/ }
                <Image className={styles.featuredImage} src={'https:' + thumbnail.fields.file.url} width={thumbnail.fields.file.details.image.width} height={thumbnail.fields.file.details.image.height}/>
            </div>
            <div className={styles.content}>
                <div className={styles.info}>
                    <p className={styles.tag}>React</p>
                    <h4 className={styles.cardTitle}>{title}</h4>
                    <p className={styles.cardDescription}>{description}</p>
                </div>
            </div>
        </div>
    )
}