import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import SEO from '../components/SEO';

const CoffeeStyles = styled.div`
  padding: 2rem 0;
  border-bottom: 1px solid var(--grey);
`;

export const query = graphql`
  query {
    coffee: allCoffee {
      nodes {
        id
        title
        description
        ingredients
      }
    }
  }
`;

export default function CoffeePage({ data }) {
  return (
    <>
      <SEO title={`Coffee! We have ${data.coffee.nodes.length} in stock`} />
      <h2 className="center">
        We have {data.coffee.nodes.length} Coffee available.
      </h2>
      <div>
        {data.coffee.nodes.map((coffee) => {
          console.log(coffee);

          return (
            <CoffeeStyles key={coffee.id}>
              <h3>{coffee.title}</h3>
              <p>{coffee.description}</p>
              <p>Ingredients: {`${coffee.ingredients.join(', ')}`}</p>
            </CoffeeStyles>
          );
        })}
      </div>
    </>
  );
}
