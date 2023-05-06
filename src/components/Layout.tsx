import React from 'react';
import Header from './Header';
import { ForkMe } from 'fork-me-corner';

const Layout = ({ children }) => {
  return (
    <>
      <ForkMe repo="https://github.com/noramp/noramp-near-demo" />

      <div className="min-h-screen bg-gray-200">
        <Header />
        <div className="container flex justify-center p-4 mx-auto">
          <main className="flex flex-1">{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
