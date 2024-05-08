import * as React from 'react'
import ReactVideo from '../components/reactvideo'
import * as Scroll from 'react-scroll'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import { useIntl } from 'gatsby-plugin-intl-v4'

const Web360Product = ({ pageContext }) => {
  console.log(pageContext)
  const t = useIntl().formatMessage;
  const [playState, setPlayState] = React.useState(false);
  const Item = ({ keyflag, filepath, styleObj }) => {
    return (<>
      <button className={`z-30 cursor-pointer bg-black relative`} onClick={(e) => {
        setPlayState(keyflag);
        if (window && window.document) {
          const elRect = e.target.getBoundingClientRect();
          const elHeight = elRect.bottom - elRect.top;
          const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
          Scroll.animateScroll.scrollTo(window.scrollY + elRect.top - (height - elHeight) / 2)
        }

      }}>
        <div className={`transition-opacity duration-500 absolute bg-black left-0 top-0 w-full h-full z-40
          ${playState && playState !== keyflag ? `opacity-95` : `pointer-events-none opacity-0`}`}></div>
        <div className={`absolute left-0 top-0 w-full h-full z-40`}>
          {playState === keyflag ? <ReactVideo
            width="100%"
            height="100%"
            playing={playState === keyflag}
            controls={true}
            playsinline
            video={`${filepath}.mp4`}
            poster={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=`}
            className={`absolute top-0 z-40`}
            onPause={() => { setPlayState(false); }}
            alt={t({ id: pageContext.title }) + ` by ` + t({ id: `companyname` })} />
            : <></>}
        </div>
        <div className={`before:relative before:pt-[100%] before:inline-block before:content-[''] bg-cover before:w-1 before:h-0 relative `} style={styleObj}>
          <div className={`absolute top-0 left-0 grid justify-center items-end text-center w-full h-full`}>
            <div className={`mb-[10%] lg:mb-[20%] flex flex-col justify-around items-center mix-blend-difference`}>
              <span className={`text-white font-bold tracking-[0.1em] border border-white rounded-full text-sm pt-0.5 px-3 uppercase`}>{t({ id: `Play` })}</span>
            </div>
          </div>
        </div>
      </button>
    </>)
  }
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
    <div className={`transition-opacity duration-500 bg-black fixed z-30 top-0 left-0 w-full h-full ${playState !== false ? `opacity-90` : `pointer-events-none opacity-0`}`}
      onClick={() => { setPlayState(false); }}
      role='button' aria-label='Pause' onKeyDown={()=>{}} tabIndex={0}>
      &nbsp;
    </div>
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
    <div className={`bg-white md:bg-black`}>
      <div className={`grid px-5 last:pb-5 md:px-0 grid-cols-1 gap-5 md:gap-0 md:grid-cols-2 `}>
        {pageContext.works.map((e) => {
          const filepath = `https://cdn.mustbefamily.com/j3d/${pageContext.filepath}/${e}`;
          return (
            <Item key={e} keyflag={e} filepath={filepath} styleObj={{ backgroundImage: `url('${filepath}.jpg')` }}></Item>
          )
        })}
      </div>
    </div>
  </>
  )
}

export default Web360Product
