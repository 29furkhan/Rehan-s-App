import React from 'react';
import Header from './components/Header';
import Content from './components/Content';

function App() {
  const core_url = "http://localhost:8080/patients"

  return (
    <>
      <Header title="वैद्य. रेहान शेख" />
      <Content core_url={core_url} />
    </>
  );
}

export default App;
