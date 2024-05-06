module.exports = {
  siteMetadata: {
    title: `Jewelry 3D by Highlights jewelry`,
    siteUrl: `https://highlights.mustbefamily.com/`
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-layout",
    "gatsby-transformer-json",
    {
      resolve: 'gatsby-plugin-next-seo',
      options: {
        title: '',
        titleTemplate: '%s | Jewelry 3D by Highlights jewelry',
        language: 'ru',
        openGraph: {
          type: 'website',
          locale: 'ru_RU',
          url: 'https://highlights.mustbefamily.com/',
          site_name: 'Jewelry 3D by Highlights jewelry',
          images: [{
            url: 'https://highlights.mustbefamily.com/images/social_all.jpg',
            width: 720,
            height: 720,
            alt: 'Jewelry 3D by Highlights jewelry',
          }],
        },
        twitter: {
          handle: '@mustbefamily',
          site: '@mustbefamily',
          cardType: 'summary_large_image',
        },
      },
    }, {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "./src/data/",
      },
    }, {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require('postcss-import'),
          require('tailwindcss/nesting'),
          require('tailwindcss'),
          require('autoprefixer'),
        ]
      }
    }, {
      resolve: `gatsby-plugin-yandex-metrika`,
      options: {
        trackingId: 88079194,
        afterBody: true,
        defer: true,
      },
    }, {
      resolve: "gatsby-plugin-sitemap",
      options: {
        output: "/"
      }
    }, {
      resolve: `gatsby-plugin-intl`,
      options: {
        // language JSON resource path
        path: `${__dirname}/src/intl`,
        // supported language
        languages: [`en`],
        // language file path
        defaultLanguage: `en`,
        // option to redirect to `/ko` when connecting `/`
        redirect: false,
      },
    }]
};
