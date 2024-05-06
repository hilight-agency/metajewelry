import * as React from "react"
import MailForm from "../components/mailform"
import { GatsbySeo } from "gatsby-plugin-next-seo"
import { useIntl } from "gatsby-plugin-intl"

const ContactsPage = () => {
  const t = useIntl().formatMessage;
  return (<>
    <GatsbySeo
      title={t({ id: `contacts.title` })}
      description={t({ id: `contacts.description` })}
      canonical={`https://highlights.mustbefamily.com/contacts`}
      openGraph={{
        url: 'https://highlights.mustbefamily.com/contacts',
      }} />
    <div className={`bg-black text-white px-5 w-full h-screen flex justify-center items-center gap-2`}>
      <div className={`grid lg:px-5 grid-cols-1 gap-5 md:gap-0 md:container md:mx-auto md:grid-cols-2`}>
        <div className={`uppercase`}>
          <h1 className={`text-2xl lg:text-4xl font-bold`}>{t({ id: `contacts.h1` })}</h1>
          <hr className={`hidden lg:block my-5 w-48 border-none h-px text-gray-400 bg-gray-400`} />
          <p className={`uppercase font-thin text-xl lg:text-2xl`}>{t({ id: `contacts.subtext` })}</p>
{/*           <p className={`uppercase font-thin text-base lg:text-2xl`}>
            <span className={`lg:pr-8 font-bold`}>{t({ id: `contacts.email` })}</span><br className="lg:hidden"/>
            <a target={`_blank`} className={`underline`} href={`mailto:highlightsjewelry@gmail.com`}>highlightsjewelry@gmail.com</a>
          </p> */}
        </div>
        <div className={`lg:min-h-[365px]`}>
          <MailForm Styles={{
            sendeddiv: `uppercase text-2xl`,
            form: `font-thin text-xl lg:text-2xl md:max-w-[400px]`,
            myname: `bg-black border-b px-2 mb-2 p-2 -mt-2 w-full uppercase`,
            email: `bg-black border-b p-2 mb-2 mt-4 w-full uppercase`,
            phone: `bg-black border-b p-2 mb-2 mt-4 w-full uppercase`,
            button: `transition-opacity duration-500 opacity-100 uppercase border mt-6 rounded-full pt-1 px-3`,
            errmsg: `text-red-500 md:max-w-[400px]`,
            butloading: `opacity-0`,
            policylink: `underline`,
            fielderr: `text-sm text-red-500 h-0 relative t-[20px] `,
            ps: `text-xs mt-4`
          }} />
        </div>
      </div>
    </div>
  </>)
}

export default ContactsPage
