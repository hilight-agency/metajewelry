import * as React from "react";
import { GatsbySeo } from "gatsby-plugin-next-seo";
import { useIntl } from "gatsby-plugin-intl-v4";
import Viewer3d from "../components/3dviewer";

const Web360Product = ({ pageContext }) => {
  const t = useIntl().formatMessage;

  return (
    <>
      <GatsbySeo
        title={pageContext.title}
        description={pageContext.descr}
        canonical={`https://highlightsjewelry.com/${pageContext.slug}`}
        openGraph={{
          url: `https://highlightsjewelry.com/${pageContext.slug}`,
          images: [
            {
              url: `https://highlightsjewelry.com/images/${pageContext.slug}.jpg`,
              width: 720,
              height: 720,
              alt: t({ id: pageContext.descr }),
            },
          ],
        }}
      />
      <div className={`bg-black w-full h-auto lg:h-screen`}>
        <div className={`pt-[46px] lg:pt-0 lg:container lg:mx-auto `}>
          <div
            className={`w-full h-0 pb-[100%] relative md:pb-0 md:h-screen flex justify-center items-end bg-contain bg-center bg-no-repeat`}
            style={{
              backgroundImage: `url('/images/${pageContext.slug}.jpg')`,
            }}
          >
            <div className={`h-1/5 absolute bottom-0 z-50 md:relative`}>
              <h1
                className={`py-[10px] font-black text-2xl text-center text-white md:text-5xl uppercase`}
              >
                {t({ id: pageContext.title })}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className={`bg-white`}>
        <div className={`lg:container py-12 lg:mx-auto lg:py-20`}>
          <p
            className={`lg:text-xl px-5 lg:max-w-[1040px] lg:mx-auto text-sm uppercase`}
          >
            {t({ id: pageContext.descr })}
          </p>
          {/* <p>&nbsp;</p>
        <p className={`lg:text-xl px-5 lg:max-w-[1040px] lg:mx-auto text-sm uppercase`}>{t({ id: pageContext.price })}</p> */}
        </div>
      </div>
      <div className={`bg-white`}>
        <Viewer3d />
      </div>
    </>
  );
};

export default Web360Product;
