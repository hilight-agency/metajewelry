const path = require("path");
exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    query {
      allCategoriesJson {
        nodes {
          slug
          title
          descr
          price
          works
          filepath
        }
      }
    }`)
  const { createPage } = actions
  const catTemplate = path.resolve(`src/templates/category.js`)
  data.allCategoriesJson.nodes.forEach(category => {
    createPage({
      path: category.slug,
      component: catTemplate,
      context: {
        slug: category.slug,
        filepath: category.filepath,
        title: category.title,
        descr: category.descr,
        price: category.price,
        works: category.works,
      },
    })
  })
}
