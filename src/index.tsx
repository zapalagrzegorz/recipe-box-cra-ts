import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import App from './App';
import { ListRecipes } from './components/ListRecipes';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <ListRecipes />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
