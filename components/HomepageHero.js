import Link from 'next/link'
import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import styles from '../styles/HomePageHero.module.css'

export default function HomepageHero({hero}){
    const {title, heroDescription, backgroundImage} = hero.fields
    return(
        <div className="hero-image">
            <img className="image" src={'https:' + backgroundImage.fields.file.url}/>
            <div className="hero-text">
                <div className="left">
                    <h2 className="bold"><strong>Jason</strong></h2>
                    <h2>Hutchinson</h2>
                </div>
                <div className="right">
                    <p>Dallas based web developer with a focus in React, CMS, and Search Engine Optimization</p>

                </div>
            </div>
            
            <style jsx>{`
                h1,h2{
                    font-family: "Proxima-Nova";
                    text-transform: uppercase;
                    font-size: 72px;
                }

                h2.bold{
                    font-family: "Proxima-Nova-Bold";
                    text-transform: uppercase;
                    font-size: 72px;
                }

                p{
                    font-family: "AvenirNext";
                }

                h2.thin{
                    font-family: "Proxima-Nova-Thin";
                    text-transform: uppercase;
                }

                .hero-image {
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                    position: relative;
                    background: black;
                }
                
                .hero-text {
                    text-align: left;
                    position: absolute;
                    top: 54%;
                    left: 40%;
                    transform: translate(-50%, -50%);
                    color: black;
                    display: flex;
                    align-items: center
                }

                .image{
                    background: black;
                    object-fit: cover;
                    width: -webkit-fill-available;
                    opacity: 0.5;
                }

                .left{
                    font-family: "Proxima-Nova";
                    border-right: 1px solid white;
                    padding: 20px 50px 60px 150px;
                    font-size: 1em;
                    color: white;
                    font-family: 'Roboto';
                    line-height: .5em;
                }

                .right{
                    font-family: "Proxima-Nova";
                    display: flex;
                    justify-content: start;
                    align-items: center;
                    width: 725px;
                    color:white;
                    padding-left:30px;
                }
            `}</style>
        </div>
    )
}