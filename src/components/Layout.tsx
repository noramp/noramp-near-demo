import React from 'react';
import Header from './Header';
import { ForkMe } from 'fork-me-corner';

const Layout = ({ children }) => {
  return (
    <>
      <ForkMe repo="https://github.com/noramp/noramp-demo-app" />

      <div className="bg-gray-200 min-h-screen">
        <Header />
        <div className="container flex p-4 mx-auto justify-center">
          <main className="flex flex-1">{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
