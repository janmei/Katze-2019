import React from './node_modules/react';
import ReactDOM from './node_modules/react-dom';
import Admin from './Admins';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Admin />, div);
  ReactDOM.unmountComponentAtNode(div);
});
