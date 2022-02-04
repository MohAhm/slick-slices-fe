import path from 'path';
import fetch from 'isomorphic-fetch';

async function turnPizzasIntoPages({ graphql, actions }) {
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');

  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);

  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  const toppingsTemplate = path.resolve('./src/pages/pizzas.js');

  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          id
          name
        }
      }
    }
  `);

  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingsTemplate,
      context: {
        topping: topping.name,
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });
}

async function fetchCoffeeAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  const res = await fetch('https://api.sampleapis.com/coffee/hot');
  const allCoffee = await res.json();

  for (const coffee of allCoffee) {
    const nodeMeta = {
      id: createNodeId(coffee.id),
      parent: null,
      children: [],
      internal: {
        type: 'Coffee',
        mediaType: 'application/json',
        contentDigest: createContentDigest(coffee),
      },
    };

    actions.createNode({
      ...coffee,
      ...nodeMeta,
    });
  }
}

export async function sourceNodes(params) {
  await Promise.all([fetchCoffeeAndTurnIntoNodes(params)]);
}

export async function createPages(params) {
  await Promise.all([
    await turnPizzasIntoPages(params),
    await turnToppingsIntoPages(params),
  ]);
}
