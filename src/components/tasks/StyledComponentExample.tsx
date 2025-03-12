import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
`;

const Navbar = styled.nav`
  background-color: #282c34;
  padding: 10px;
  display: flex;
  gap: 15px;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const PageTitle = styled.h1`
  color: #282c34;
`;

// Components for Routes
const Home = () => (
  <Container>
    <PageTitle>Home Page</PageTitle>
    <p>Welcome to the home page!</p>
  </Container>
);

const About = () => (
  <Container>
    <PageTitle>About Page</PageTitle>
    <p>This is the about page!</p>
  </Container>
);

// Main App Component with Router
export const App: React.FC = () => (
  <Router>
    <Navbar>
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/about">About</StyledLink>
    </Navbar>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </Router>
);




// Generic-функція, яка повертає перший елемент будь-якого масиву
function getFirstElement<T>(arr: T[]): T | undefined {
    return arr[0];
  }
  
  // Використання з масивом чисел
  const numbers = [1, 2, 3, 4];
  const firstNumber = getFirstElement(numbers); // тип: number | undefined
  console.log(firstNumber); // 1
  
  // Використання з масивом рядків
  const strings = ['apple', 'banana', 'orange'];
  const firstString = getFirstElement(strings); // тип: string | undefined
  console.log(firstString); // 'apple'
  