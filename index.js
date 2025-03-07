import React from 'react';
import { createRoot } from 'react-dom/client';
import Button from './button';
import './style.css';

function App() {
  return (
    <div className="body-container">
      <Button color="#1877F2" label="facebook" />
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
