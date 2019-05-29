import React from 'react';
import ReactDOM from 'react-dom';
import UnityScene from './UnityScene';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UnityScene />, div);
  ReactDOM.unmountComponentAtNode(div);
});
