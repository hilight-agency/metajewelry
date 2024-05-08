import { Link } from 'gatsby'
import * as React from 'react'
import { useIntl } from "gatsby-plugin-intl-v4"

const Footer = ({ loc }) => {
  const t = useIntl().formatMessage;
  return (<>
    <footer className={`bg-white py-5`}>
      {loc.pathname !== `/contacts` ? <div className={`lg:container pb-12 lg:mx-auto lg:py-10 text-center`}>
        <Link to={`/contacts`} className={`text-black uppercase font-bold text-base border border-black rounded-full pt-0.5 px-3`}>{t({ id: `getfreesample` })}</Link>
      </div> : <></>}
      <div className={`lg:container lg:mx-auto px-5 grid lg:grid-cols-3 grid-cols-none items-start lg:items-center grid-flow-row-dense`}>
        <div className={`pb-2`}>
          <div className='flex flex-row items-center'>
            <a href={'https://instagram.com/highlightsjewelry'} target={`_blank`} className={`h-[19px]`}>
              <img alt={`instagram`} src={`/images/instagram.jpg`} type={`image/jpg`} width={`19`} height={`19`} />
            </a>
          </div>
        </div>
        <div className={`text-center col-[1_/_3] lg:col-auto pt-4 md:pt-0`}>
          {new Date().getFullYear()} <span className={`relative -top-0.5`}>&copy;</span> {t({ id: `companyname` })+`. `+t({ id: `All rights reserved` })}
        </div>
        <div className={`text-right`}>
          <div>
            <a href={`/privacy-policy`} target={`_blank`} className={`uppercase text-sm`}>{t({ id: `privacypolicy` })}</a>
          </div>
        </div>
      </div>
    </footer>
  </>
  )
}
export default Footer
