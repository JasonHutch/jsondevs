import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/HomepageCard.module.css'


export default function HomepageCard(){
    return(
        <a className={styles.cardLink }href="/development">
            <div className={styles.card}>
                <Image className={styles.cardImage} src="/images/SampleImage.jpg" layout="fill" objectFit="cover"/>
                <div className={styles.textWrapper}>
                    <div className={styles.textWrap}>
                        <h3 className={styles.linkTitle}>Jason's longer title to test how this wraps Title</h3>
                    </div>

                </div>
            </div>
        </a>
        
    )
}