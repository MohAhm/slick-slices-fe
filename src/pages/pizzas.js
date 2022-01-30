import { graphql } from 'gatsby';
import React from 'react';
import PizzaList from '../components/PizzaList';
import ToppingsFiler from '../components/ToppingsFiler';

export const query = graphql`
  query PizzaQuery {
    pizzas: allSanityPizza {
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

export default function PizzasPage({ data }) {
  const pizzas = data.pizzas.nodes;

  return (
    <>
      <ToppingsFiler />
      <PizzaList pizzas={pizzas} />
    </>
  );
}
