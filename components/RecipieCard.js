import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/RecipeCard.module.css'

export default function RecipieCard({recipe}){
    const {title, slug, cookingTime, thumbnail} = recipe.fields
    return(
        <div className={styles.card}>
            <div className="featured">
                {/*Automatically optimizes image -- lazy loading -- Must whitelist domain in next config, and specify height and width which can be found on the image item itself*/ }
                <Image src={'https:' + thumbnail.fields.file.url} width={thumbnail.fields.file.details.image.width} height={thumbnail.fields.file.details.image.height}/>
            </div>
            <div className={styles.content}>
                <div className={styles.info}>
                    <h4>{title}</h4>
                    <p>Takes approx. {cookingTime} mins to make</p>
                    <div className={styles.actions}>
                        <Link href={'/recipes/' + slug}><a>Cook This</a></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}