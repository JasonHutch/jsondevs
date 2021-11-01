import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/BlogGrid.module.css'
import PostCard from './PostCard'


export default function BlogGrid({year, blogs}){
    return(
        <div className={styles.blogGridContainer}>
            <div className={styles.titleWrap}>
                <h1 className={styles.yearTitle}>{year}</h1>
            </div>
            <div className={styles.cardsWrap}>
                {blogs.map((blog)=>(
                    <PostCard post={blog}/>
                ))}
            </div>
        </div>
    )
}