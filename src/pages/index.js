import * as React from "react"
import { Link } from "gatsby"
import useWindowSize from '../utils/useWindowSize'
import ReactVideo from "../components/reactvideo"
import { graphql } from 'gatsby'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import { useIntl } from "gatsby-plugin-intl-v4"
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import { Tween } from 'react-gsap'
gsap.registerPlugin(TextPlugin)
export const query = graphql`
query IndexPageQuery {
  allCategoriesJson {
    nodes {
      slug
      title
    }
  }
}`
const IndexPage = ({ data }) => {
  const t = useIntl().formatMessage;
  const Item = ({ to, label, styleObj }) => {
    return (<>
      <Link className={`px-5 md:px-0 cursor-pointer`} to={to}>
        <div className={`before:relative before:pt-[100%] before:inline-block before:content-[''] before:w-1 before:h-0 bg-cover relative`} style={styleObj}>
          <div className={`absolute top-0 left-0 grid justify-center items-end text-center w-full h-full`}>
            <div className={`mb-[10%] lg:mb-[20%] flex flex-col justify-around items-center`}>
              <span className={`text-white uppercase pb-3 lg:pb-5`}>{label}</span>
              <span className={`text-white font-bold border border-white rounded-full text-sm pt-0.5 px-3 uppercase`}>{t({ id: `index.explore` })}</span>
            </div>
          </div>
        </div>
      </Link>
    </>)
  }
  const { ar } = useWindowSize();
  const texts = [
    t({ id: `index.main_h1_1` }),
    t({ id: `index.main_h1_2` }),
    t({ id: `index.main_h2_1` }),
    t({ id: `index.main_h2_2` }),
    t({ id: `index.main_h2_1a` }),
    t({ id: `index.main_h2_2a` }),
  ];
  return (<>
    <GatsbySeo
      title={t({ id: `index.title` }, {title: t({ id: `companynameshort` })})}
      titleTemplate={`%s`}
      description={t({ id: `index.descr` })}
      canonical={`https://highlights.mustbefamily.com`}
      openGraph={{
        url: 'https://highlights.mustbefamily.com',
        images: [{
          url: `https://highlights.mustbefamily.com/images/social_main.jpg`,
          width: 720,
          height: 720,
          alt: t({ id: `index.descr` }),
        }],
      }} />
    <div className={`absolute top-0 -z-10 left-0 react-player-wrapper w-full h-screen`}>
      <ReactVideo
        width="100%"
        height="100%"
        playing={true}
        playsinline
        loop={true}
        muted={true}
        video={(ar > 1) ? `/videos/horiz.mp4` : `/videos/vert.mp4`}
        poster={(ar > 1) ? `/videos/horiz.png` : `/videos/vert.png`}
        className={`coverinner`}
        alt={t({ id: `index.descr` })} />
    </div>
    <div className={``}>
      <div className={`lg:container lg:mx-auto`}>
        <div className={`w-full px-5 h-screen flex justify-center items-center`}>
          <div>
            <Tween 
              from={{ text: texts[0] }}
              to={{ text: texts[1] }}
              duration={1} 
              repeat={-1} 
              repeatDelay={3}
              delay={3}
              padSpace
              yoyo>
                <h1 className={`py-[10px] font-black text-2xl text-center text-white lg:text-5xl uppercase`}>{texts[0]}</h1>
            </Tween>
            <h2 className={`pt-[10px] pb-[30px] font-bold text-sm text-center text-white lg:text-xl uppercase`}>
            <Tween 
              from={{ text: texts[2] }} 
              to={{ text: texts[3] }} 
              duration={1} 
              repeat={-1} 
              repeatDelay={3}
              delay={3}
              padSpace
              yoyo>
                <span>{texts[2]}</span>
            </Tween>            
            <br/><Tween 
              from={{ text: texts[4] }} 
              to={{ text: texts[5] }} 
              duration={1} 
              repeat={-1} 
              repeatDelay={3}
              delay={3}
              padSpace
              yoyo>
                <span>{texts[4]}</span>
            </Tween>   
            </h2> 
          </div>
        </div>
      </div>
      <div className={`bg-white`}>
        <div className={`lg:container py-12 lg:mx-auto lg:py-20`}>
          <p className={`lg:text-xl px-5 lg:max-w-[1040px] lg:mx-auto text-sm uppercase`}>{t({ id: `index.descr` })}</p>
        </div>
      </div>
      <div className={`bg-white md:bg-black`}>
        <div className={`grid grid-cols-1 pb-5 md:pb-0 gap-5 md:gap-0 md:container md:mx-auto md:grid-cols-3`}>
          {data.allCategoriesJson.nodes.map((e) => {
            return (
              <Item to={`/${e.slug}`} label={e.title} styleObj={{ backgroundImage: `url('/images/${e.slug}.jpg')` }}></Item>
            )
          })}
        </div>
      </div>
      <div className={`bg-black`}>
        <div className={`lg:container lg:mx-auto px-5 text-slate-100`}>
          <h2 className={`uppercase text-xl font-bold py-10 lg:text-center`}>{t({ id: `index.tb_h2` })}</h2>
          <div className={`grid grid-cols-1 lg:gap-5 lg:grid-cols-3`}>
            <div>
              <h3 className={`uppercase font-bold leading-normal`}>{t({ id: `index.tb_h3_1` }, { br: <br /> })}</h3>
              <div className={`py-4`}>
                <p className={`leading-normal`}>
                  {t({ id: `index.tb_p1` }, { br: <><br /><br /></> })}
                </p>
              </div>
            </div>
            <div>
              <h3 className={`uppercase font-bold leading-normal`}>{t({ id: `index.tb_h3_2` }, { br: <br /> })}</h3>
              <div className={`py-4`}>
                <p className={`leading-normal`}>
                  {t({ id: `index.tb_p2` }, { br: <><br /><br /></> })}
                </p>
              </div>
            </div>
            <div>
              <h3 className={`uppercase font-bold leading-normal`}>{t({ id: `index.tb_h3_3` }, { br: <br /> })}</h3>
              <div className={`py-4`}>
                <p className={`leading-normal`}>
                  {t({ id: `index.tb_p3` }, { br: <><br /><br /></> })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default IndexPage
