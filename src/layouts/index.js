import * as React from 'react'
import Footer from '../components/footer';
import Header from '../components/header';
import { GatsbySeo } from "gatsby-plugin-next-seo"

const Layout = ({ location, children }) => {
  return (<>
    <GatsbySeo
      metaTags={[{
        name: 'theme-color',
        content: '#000000'
      }]} />
    <div className={``}>
      <Header loc={location}/>
      {children}
      <Footer loc={location}/>
    </div>
  </>
  )
}
export default Layout
