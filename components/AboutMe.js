import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/AboutCard.module.css';


export default function AboutMe({author}){
    const {authorImage} = author.fields
    console.log(authorImage);
    return(
        <div className={styles.aboutContainer}>
            <div className={styles.imageWrap}>
                <Image  className={styles.authorImage} src={'https:' + authorImage.fields.file.url} width={800} height={800}/>
            </div>

            <div className={styles.contentWrap}>
                <div className={styles.aboutTabs}>
                    <div className={styles.tabWrapperActive}>
                        <span className={styles.tabsActive}>ABOUT ME</span>
                    </div>
                    <div className={styles.tabWrapper}>
                        <span className={styles.tabs}>EXPERIENCE</span>
                    </div>
                    <div className={styles.tabWrapper}>
                        <span className={styles.tabs}>SKILLS</span>
                    </div>
                </div>


                <div className={styles.aboutContent}>
                </div>
            </div>
        </div>
    )
}