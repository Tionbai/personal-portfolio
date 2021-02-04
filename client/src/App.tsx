import React, { useState } from 'react';
import './App.scss';
import NavBar from './components/NavBar/NavBar';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';

const App: React.FC = () => {
  const [contactState, setContactState] = useState(false);

  return (
    <div className="App">
      <NavBar contactState={contactState} setContactState={setContactState} />
      <Content contactState={contactState} setContactState={setContactState} />
      <Footer setContactState={setContactState} />
    </div>
  );
};

export default App;
