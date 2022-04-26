import React from 'react';
import './App.scss';
import ShellsContainer from './containers/ShellsContainer';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Game of Shells</h1>
      </header>
      <main>
        <ShellsContainer />
      </main>
    </div>
  );
}

export default App;
