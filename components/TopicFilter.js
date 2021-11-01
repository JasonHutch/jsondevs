import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/TopicFilters.module.css'
import { useEffect, useState } from 'react'

export default function TopicFilter({topicName, callback}){
    var [active, setActive] = useState(false)
    function handleClick(topicName){
        setActive(!active);
        callback(topicName);
    }
    return(
        <div className={active ? styles.topicActive : styles.topic } onClick={() => {handleClick(topicName)}}>
            <span>{topicName}</span>
        </div>
    )
}