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
          template
        }
      }
    }`)
  const { createPage } = actions
  data.allCategoriesJson.nodes.forEach(category => {
    const catTemplate = path.resolve(`src/templates/${category.template}.js`)
    createPage({
      path: category.slug,
      component: catTemplate,
      context: {...category},
    })
  })
}
