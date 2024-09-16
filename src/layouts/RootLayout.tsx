import * as React from 'react';
import { Container } from 'react-bootstrap';
import TopNavigation from '../components/ui/navbar/TopNavigation';

interface RootLayout {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayout) {
  return (
    <>
      <TopNavigation />
      <Container className="app-layout-container">{children}</Container>
    </>
  );
}
