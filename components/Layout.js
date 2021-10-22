import Link from 'next/link'
import Image from 'next/image';
import {createClient} from 'contentful';
import { useEffect, useState } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Head from 'next/head'

export default function Layout({ children }) {
  let [data, setData] = useState(null);
  let [loading, setLoading] = useState(true);

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
      <Image src={'https:' + data.fields.headerLogo.fields.file.url} width={data.fields.headerLogo.fields.file.details.image.width} height={data.fields.headerLogo.fields.file.details.image.height}/>
        <Link href="/">
          <a>
            <span>
              <h2 className="siteTitle">{documentToReactComponents(data.fields.siteTitle)}</h2>
            </span>
          </a>
        </Link>
        <div className="mainNav">
          <Link href="/">
            <a>
              <span className="navLink active"><strong>HOME</strong></span>
            </a>
          </Link>
          <Link href="/">
            <a>
              <span className="navLink"><strong>BLOG</strong></span>
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