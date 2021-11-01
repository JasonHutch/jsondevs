import Link from 'next/link'
import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import styles from '../styles/HomePageHero.module.css'

export default function HomepageHero({hero}){
    const {title, heroDescription, backgroundImage} = hero.fields
    return(
        <div className="hero-image">
            <div className="hero-text">
                <p>Dallas based web developer with a focus in React, CMS, and product development</p>
            </div>
            <style jsx>{`
                p{
                    font-family: "AvenirNext-Bold";
                    font-size: 20px;
                    color: #fff;
                }
                .hero-image {
                    display:flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 400px;
                    background: #14274E;
                    margin-bottom: 2em;
                }
                .hero-text{
                    width: 500px;
                    text-align: center;
                }
            `}</style>
        </div>
    )
}