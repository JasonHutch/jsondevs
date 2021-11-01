import Link from 'next/link'
import Image from 'next/image';
import {createClient} from 'contentful';
import { useEffect, useState } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Head from 'next/head'

export default function Layout({ children }) {
  let [data, setData] = useState(null);
  let [loading, setLoading] = useState(true);
  let [tab, setTab] = useState("home");

   useEffect(() =>{
    const fetchData = async () => {
      const client = createClient({
        space: '3s3fdhgc7v0b',
        accessToken: 'MIOifqTPMi0fiZtKnAlOqBuGolVuHIL9b-HyCfYzw0o'
      })
  
      const {items} = await client.getEntries({ content_type: 'layout'})
      return items[0];
    }
    data = fetchData().then(response => {
      console.log("Data Recieved")
      setData(response);
      setLoading(false);
    });
  },[])

  return !loading ? (
    <div className="layout">
      <Head>
        <link rel="stylesheet" href="/fonts/fonts.css" />
      </Head>

      <header>
        <div>
          <Link href="/">
            <a>
              <span className="siteTitle">
                <span className="site-title-bold">JSON</span><span className="site-title-light">DEVS</span>
              </span>
            </a>
          </Link>
        </div>
          
          <div className="mainNav">
            <Link href="/">
              <a onClick={()=>setTab('home')}>
                <span className={tab == 'home' ? 'navLink active' : 'navLink'}><strong>HOME</strong></span>
              </a>
            </Link>
            <Link href="/development">
              <a onClick={()=>setTab('dev')}>
                <span className={tab == 'dev' ? 'navLink active' : 'navLink'}><strong>DEVELOPMENT</strong></span>
              </a>
            </Link>
            <Link href="/">
              <a onClick={()=>setTab('gaming')}>
                <span className={tab == 'gaming' ? 'navLink active' : 'navLink'}><strong>GAMING</strong></span>
              </a>
            </Link>
            <Link href="/">
              <a onClick={()=>setTab('about')}>
                <span className={tab == 'about' ? 'navLink active' : 'navLink'}><strong>ABOUT</strong></span>
              </a>
            </Link>
          </div>
      </header>

      <div className="page-content">
        { children }
      </div>

      <footer>
        <p>Copyright 2021 JSONDevs</p>
      </footer>
    </div>
  ) : <></>
}