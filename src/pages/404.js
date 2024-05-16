import * as React from "react";
import { GatsbySeo } from "gatsby-plugin-next-seo";
import { Link } from "gatsby";

const NotFoundPage = () => {
  return (
    <>
      <GatsbySeo
        title={`Error 404. Page not found`}
        noindex={true}
        nofollow={true}
        description={`Error 404. Page not found`}
        canonical={`https://highlightsjewelry.com/404`}
        openGraph={{
          url: "https://highlightsjewelry.com/404",
        }}
      />
      <div
        className={`w-full bg-black px-5 h-screen flex justify-center items-center`}
      >
        <div>
          <div className={`lg:container pb-12 lg:mx-auto lg:py-10 text-center`}>
            <h1 className={`text-white text-3xl py-4`}>
              Error 404. Page not found
            </h1>
            <Link
              to={`/`}
              className={`text-white uppercase font-bold text-xl border border-white rounded-full pt-0.5 px-3`}
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
