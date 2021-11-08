import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/DetailHero.module.css'


export default function DetailHero ({hero}) {
    const {heroImage, title} = hero.fields;
      return (
        <div className={styles.detailHeroWrap}>
          <div className={styles.detailHeroImageWrap}>
            <Image src={'https:' + heroImage.fields.file.url} layout="fill" objectFit="cover"/>
          </div>
          <div className={styles.centered}>{title}</div>
          <div className={styles.overlay}></div>
        </div>
      )
    }