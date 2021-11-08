import Link from 'next/link'
import Image from 'next/image';
import {createClient} from 'contentful';
import { useEffect, useState } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import {GiHamburgerMenu} from 'react-icons/gi';
import {AiOutlineClose} from 'react-icons/ai';
import Head from 'next/head'

export default function Layout({ children }) {
  let [data, setData] = useState(null);
  let [loading, setLoading] = useState(true);
  let [tab, setTab] = useState("home");
  let [menuOpen, setMenuOpen] = useState(false);

  function getModalStyles(){
    if(menuOpen){
      return {"display":"flex"}
    }else{
      return {"display":"none"}
  }
}

function handleModalOpen(){
  setMenuOpen(true);
}

function handleModalClose(){
  setMenuOpen(false);
}
function navigate(link){
  setTab(link);
  handleModalClose()
}

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
            <Link href="/gaming">
              <a onClick={()=>setTab('gaming')}>
                <span className={tab == 'gaming' ? 'navLink active' : 'navLink'}><strong>GAMING</strong></span>
              </a>
            </Link>
            <Link href="/about">
              <a onClick={()=>setTab('about')}>
                <span className={tab == 'about' ? 'navLink active' : 'navLink'}><strong>ABOUT</strong></span>
              </a>
            </Link>
          </div>
          {menuOpen ? (
            <div className="closeWrap" onClick={()=>{handleModalClose()}}>
              <AiOutlineClose color={'#fff'}/>
            </div>
            ):
            (
              <div className="hamburgerWrap" onClick={()=>{handleModalOpen()}}>
                <GiHamburgerMenu color={'#fff'}/>
              </div>
            )}
          
          
      </header>
      <div className="mobileMainNav" style={getModalStyles()}>
            <Link href="/">
              <a onClick={()=>navigate('home')} className="linkWrap">
                <span className={tab == 'home' ? 'navLink active' : 'navLink'}><strong>HOME</strong></span>
              </a>
            </Link>
            <Link href="/development">
              <a onClick={()=>navigate('dev')} className="linkWrap">
                <span className={tab == 'dev' ? 'navLink active' : 'navLink'}><strong>DEVELOPMENT</strong></span>
              </a>
            </Link>
            <Link href="/gaming">
              <a onClick={()=>navigate('gaming')} className="linkWrap">
                <span className={tab == 'gaming' ? 'navLink active' : 'navLink'}><strong>GAMING</strong></span>
              </a>
            </Link>
            <Link href="/about">
              <a onClick={()=>navigate('about')} className="linkWrap">
                <span className={tab == 'about' ? 'navLink active' : 'navLink'}><strong>ABOUT</strong></span>
              </a>
            </Link>
          </div>

      <div className="page-content">
        { children }
      </div>

      <footer>
        <p>Copyright 2021 JSONDevs</p>
      </footer>
    </div>
  ) : <></>
}