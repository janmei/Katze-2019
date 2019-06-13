import React from 'react';
import ReactDOM from 'react-dom';
import Views from './Views';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Views />, div);
  ReactDOM.unmountComponentAtNode(div);
});
