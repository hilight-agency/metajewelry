import * as React from 'react'
import Footer from '../components/footer';
import Header from '../components/header';
const Layout = ({ location, children }) => {
  return (<>
    <div className={``}>
      <Header loc={location}/>
      {children}
      <Footer loc={location}/>
    </div>
  </>
  )
}
export default Layout
export const Head = ()=>{
  return (
    <meta name="theme-color" content="#ffffff" />
  )
}
