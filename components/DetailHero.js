import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/DetailHero.module.css'


export default function DetailHero ({hero}) {
    const {heroImage, title} = hero.fields;
      return (
        <div className={styles.detailHeroWrap}>
          <Image src={'https:' + heroImage.fields.file.url} layout="fill"/>
          <div className={styles.centered}>DEVELOPMENT</div>
          <div className={styles.overlay}></div>
        </div>
      )
    }