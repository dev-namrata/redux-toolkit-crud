import React from 'react';
import logo from './logo.svg';
import './App.css';
import { UserDetail } from './component/userDetail';

function add(a: number, b: any) {
  return a + b;
}

const res = add(2, '4');
console.log(res);

localStorage.setItem('name', 'namrata');
console.log(localStorage.getItem(' name'));

function App() {
  return (
    <>
      <UserDetail />
    </>
  );
}

export default App;
