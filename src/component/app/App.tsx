import React from 'react';
import './App.scss';

function App() {
  return (
    <div className="App">
      <h2>現在のゲスト</h2>
      <div className="guests">
        <ul>
          <li>googleネーム/switchネーム（0）</li>
          <li>googleネーム/switchネーム（0）</li>
          <li>googleネーム/switchネーム（0）</li>
        </ul>
      </div>
      <h2>次回のゲスト</h2>
      <div className="guests">
        <ul>
          <li>googleネーム/switchネーム（0）</li>
          <li>googleネーム/switchネーム（0）</li>
          <li>googleネーム/switchネーム（0）</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
