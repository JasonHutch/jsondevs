import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/HomepageCard.module.css'


export default function HomepageCard({card}){
    const {linkTitle, link, cardImage, pageLink} = card.fields;

    var title = linkTitle && linkTitle != "" ? linkTitle : pageLink.fields.title;
    var cardLink = link && link != "" ? link : "/"+pageLink.fields.type.toLowerCase()+"/"+pageLink.fields.slug;
    var image = "";

    if(cardImage == undefined && pageLink != undefined){
        image = pageLink.fields.thumbnail.fields.file.url
    }
    else if(pageLink == undefined && cardImage != undefined){
        image = cardImage.fields.file.url;
    }

    return(
       
            <div className={styles.card}>
                <Image className={styles.cardImage} src={'https:'+image} layout="fill" objectFit="cover"/>
                <div className={styles.textWrapper}>
                    <a href={cardLink} className={styles.cardLink}>
                        <div className={styles.textWrap}>
                            <h3 className={styles.linkTitle}>{title}</h3>
                        </div>
                    </a>
                </div>
            </div>
        
    )
}