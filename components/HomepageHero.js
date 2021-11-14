import Link from 'next/link'
import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import styles from '../styles/HomePageHero.module.css'
import { useEffect, useState } from 'react'

export default function HomepageHero({hero}){
    var [screenWidth, setScreenWidth] = useState(window.innerWidth);
    var [imgWidth, setImgWidth] = useState(247);
    const {title, heroDescription, backgroundImage} = hero.fields;
    

    function handleResize(){
        setScreenWidth(window.innerWidth);
        setImgWidth(screenWidth * .15)
        console.log(screenWidth);
    }

    useEffect(()=>{
        window.addEventListener("resize", handleResize)
    })
    return(
        <div className="hero-image-wrap">
            <div>
                <Image src={'https:' + backgroundImage.fields.file.url} width={247} height={102}/>
            </div>
            <div className="hero-text">
                <p>Dallas based web developer with a focus in React, CMS, and product development</p>
            </div>
            <style jsx>{`
                p{
                    font-family: "AvenirNext-Bold";
                    font-size: 20px;
                    color: #fff;
                    font-size: 1.5vw;
                }
                .hero-image-wrap {
                    display:flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 51vh;
                    background: #14274E;
                    margin-bottom: 2em;
                    margin-top: 2vw;
                }
                .hero-text{
                    width: 500px;
                    text-align: center;
                }
                @media (max-width: 768px){
                    p{
                        font-size: 2.5vw;
                    }
                    .hero-text{
                        width: 300px;
                    }
                }
            `}</style>
        </div>
    )
}