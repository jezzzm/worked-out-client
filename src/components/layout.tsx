import React, { ReactNode } from 'react';

const Layout = ({ title, children }: { title: string, children: ReactNode }): JSX.Element => (
  <main className="layout">
    <h1 className="page-title">{title}</h1>
    {children}
  </main>
);

export default Layout;