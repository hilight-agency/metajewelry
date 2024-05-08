import * as React from 'react'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import { useIntl } from 'gatsby-plugin-intl-v4'
import Carousel from '../components/imageview'

const Stillimages = ({ pageContext }) => {
  const t = useIntl().formatMessage;

  return (<>
    <GatsbySeo
      title={pageContext.title}
      description={pageContext.descr}
      canonical={`https://highlights.mustbefamily.com/${pageContext.slug}`}
      openGraph={{
        url: `https://highlights.mustbefamily.com/${pageContext.slug}`,
        images: [{
          url: `https://highlights.mustbefamily.com/images/${pageContext.slug}.jpg`,
          width: 720,
          height: 720,
          alt: t({ id: pageContext.descr }),
        }],
      }} />
    <div className={`bg-black w-full h-auto lg:h-screen`}>
      <div className={`pt-[46px] lg:pt-0 lg:container lg:mx-auto `}>
        <div className={`w-full h-0 pb-[100%] relative lg:pb-0 lg:h-screen flex justify-center items-end bg-contain bg-center bg-no-repeat`} style={{ backgroundImage: `url('/images/${pageContext.slug}.jpg')` }}>
          <div className={`h-1/5 absolute bottom-0 z-50 lg:relative`}>
            <h1 className={`py-[10px] font-black text-2xl text-center text-white lg:text-5xl uppercase`}>{t({ id: pageContext.title })}</h1>
          </div>
        </div>
      </div>
    </div>
    <div className={`bg-white`}>
      <div className={`lg:container py-12 lg:mx-auto lg:py-20`}>
        <p className={`lg:text-xl px-5 lg:max-w-[1040px] lg:mx-auto text-sm uppercase`}>{t({ id: pageContext.descr })}</p>
{/*         <p>&nbsp;</p>
        <p className={`lg:text-xl px-5 lg:max-w-[1040px] lg:mx-auto text-sm uppercase`}>{t({ id: pageContext.price })}</p> */}
      </div>
    </div>
    <div className={`bg-black`}> 
    <h2 className={`py-[10px] font-black text-xl text-center text-white lg:text-4xl uppercase`}>{t({ id: "ourworks" })}</h2>    
    <Carousel slides={pageContext.works.map((e) => {
      const basepath = `https://cdn.mustbefamily.com/j3d/${pageContext.filepath}/${e}`
      const image={
        src: `${basepath}.jpg`,
        alt: `work #${e}`,
        width: 3000,
        height: 3000,
        srcSet: [
          { src: `${basepath}-1500.jpg`, width: 1500, height: 1500 },
          { src: `${basepath}-1000.jpg`, width: 1000, height: 1000 },
          { src: `${basepath}-600.jpg`, width: 600, height: 600 },
        ],
      }
      return image
    })}/>
       {/* <div className={`grid px-5 last:pb-5 md:px-0 grid-cols-1 gap-5 md:gap-0 md:grid-cols-2 `}>
       { pageContext.works.map((e) => {
          const filepath = `https://cdn.mustbefamily.com/j3d/${pageContext.filepath}/${e}`;
          return (
            <Item key={e} keyflag={e} filepath={filepath} styleObj={{ backgroundImage: `url('${filepath}.jpg')` }}></Item>
          )
        })}
      </div> */}
    </div>
    <div className={`bg-black`}>
      <div className={`lg:container lg:mx-auto px-5 text-slate-100`}>
        <h2 className={`uppercase text-xl lg:text-2xl font-bold py-8 text-center`}>{t({ id: `creationstages` })}</h2>
        <div className={`grid grid-cols-1 gap-5 lg:grid-cols-3 pb-6`}>
          <div className={`flex flex-row`}>
            <div className={`text-5xl text-right mr-4 leading-none flex-grow-0 flex-shrink-0 basis-10 lg:text-6xl lg:basis-14`}>1.</div>
            <div className={``}>
              <p className={`leading-normal`}>{t({ id: `cstage1` })}</p>
            </div>
          </div>
          <div className={`flex flex-row`}>
            <div className={`text-5xl text-right mr-4 leading-none flex-grow-0 flex-shrink-0 basis-10 lg:text-6xl lg:basis-14`}>2.</div>
            <div className={``}>
              <p className={`leading-normal`}>{t({ id: `cstage2` })}</p>
            </div>
          </div>
          <div className={`flex flex-row`}>
            <div className={`text-5xl text-right mr-4 leading-none flex-grow-0 flex-shrink-0 basis-10 lg:text-6xl lg:basis-14`}>3.</div>
            <div className={``}>
              <p className={`leading-normal`}>{t({ id: `cstage3` })}</p>
            </div>
          </div>
          <div className={`flex flex-row`}>
            <div className={`text-5xl text-right mr-4 leading-none flex-grow-0 flex-shrink-0 basis-10 lg:text-6xl lg:basis-14`}>4.</div>
            <div className={``}>
              <p className={`leading-normal`}>{t({ id: `cstage4` })}</p>
            </div>
          </div>
          <div className={`flex flex-row`}>
            <div className={`text-5xl text-right mr-4 leading-none flex-grow-0 flex-shrink-0 basis-10 lg:text-6xl lg:basis-14`}>5.</div>
            <div className={``}>
              <p className={`leading-normal`}>{t({ id: `cstage5` })}</p>
            </div>
          </div>
          <div className={`flex flex-row`}>
            <div className={`text-5xl text-right mr-4 leading-none flex-grow-0 flex-shrink-0 basis-10 lg:text-6xl lg:basis-14`}>6.</div>
            <div className={``}>
              <p className={`leading-normal`}>{t({ id: `cstage6` })}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default Stillimages
