import React from 'react';
import ReactDOM from 'react-dom';
import GenApp from './GenApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GenApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
