import { graphql } from 'gatsby';
import React from 'react';
import PizzaList from '../components/PizzaList';
import SEO from '../components/SEO';
import ToppingsFiler from '../components/ToppingsFiler';

export const query = graphql`
  query PizzaQuery($toppingRegex: String) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { regex: $toppingRegex } } } }
    ) {
      nodes {
        name
        id
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fluid(maxHeight: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;

export default function PizzasPage({ data, pageContext }) {
  const pizzas = data.pizzas.nodes;

  return (
    <>
      <SEO
        title={
          pageContext.topping
            ? `Pizzas With ${pageContext.topping}`
            : 'All Pizzas'
        }
      />
      <ToppingsFiler activeTopping={pageContext.topping} />
      <PizzaList pizzas={pizzas} />
    </>
  );
}
