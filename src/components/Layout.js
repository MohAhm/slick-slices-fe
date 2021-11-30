import React from 'react';
import Nav from './Nav';
import Footer from './footer';

export default function Layout({ children }) {
  return (
    <div>
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
