import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/reset.css';
import { AntdWrapper } from './shared/ui/antDWrapper';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AntdWrapper>
      <App />
    </AntdWrapper>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
