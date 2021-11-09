import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/RecipeCard.module.css'


export default function PostCard({post}){
    const {title, slug, description, thumbnail, tags, type} = post.fields
    return(
        <div className={styles.card}>
            <div className="featured">
                {/*Automatically optimizes image -- lazy loading -- Must whitelist domain in next config, and specify height and width which can be found on the image item itself*/ }
                <Link href={"/"+ type.toLowerCase() +"/" + slug}>
                    <Image className={styles.featuredImage} src={'https:' + thumbnail.fields.file.url} width={thumbnail.fields.file.details.image.width} height={thumbnail.fields.file.details.image.height}/>
                </Link>
            </div>
            <div className={styles.content}>
                <div className={styles.info}>
                    <p className="tag">{tags && tags.length > 0 ? tags[0].fields.name : "Development"}</p>
                    <style jsx>{`
                        .tag{
                            color:${tags && tags.length > 0 ? tags[0].fields.color : "blue"};
                            font-family: 'AvenirNext-Bold';
                            margin: 0;
                            font-size: 15px;
                        }
                    `}</style>
                    <Link href={"/"+ type.toLowerCase() +"/" + slug}>
                        <h4 className={styles.cardTitle}>{title}</h4>
                    </Link>
                    <p className={styles.cardDescription}>{description}</p>
                </div>
            </div>
        </div>
    )
}