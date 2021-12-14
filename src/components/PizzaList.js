import React from 'react';
import Pizza from './Pizza';

export default function PizzaList({ pizzas }) {
  return (
    <div>
      {pizzas.map((pizza) => (
        <Pizza key={pizza.id} pizza={pizza} />
      ))}
    </div>
  );
}
