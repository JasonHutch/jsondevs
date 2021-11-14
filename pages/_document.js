import Document, {Html, Head, Main, NextScript} from 'next/document'
import {GA_TRACKING_ID, GA_Tracking_ID} from '../lib/gtag'

export default class MyDocument extends Document {
    render(){
        return(
            <Html>
                <Head>
                    <script data-ad-client="ca-pub-8586017200531248" async src="https://pagead2.goolesyndication.com/pagead/js/adsbygoogle.js"></script>
                    <script
                        async
                        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js',new Date())
                            gtag('config','${GA_TRACKING_ID}'), {
                             page_path: window.location.pathname,   
                            });`,
                        }}
                    />
                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        )
    }
}