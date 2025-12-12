   // src/index.js
   import React from 'react';
   import { createRoot } from 'react-dom/client';
   import { Provider } from 'react-redux';
   import store from './store'; // Import store
   import OptionFrameworkApp from './components/OptionFrameworkApp';
   
   // Import CSS from node_modules (bundled, no CDN)
   import '@melloware/coloris/dist/coloris.css';
   import 'air-datepicker/air-datepicker.css';

   // Sử dụng dữ liệu từ PHP
   const optionsData = window.optionsData || {};

   document.addEventListener('DOMContentLoaded', () => {
       const container = document.getElementById('option-framework-app');
       if (!container) {
           console.error('Container #option-framework-app not found');
           return;
       }
       const root = createRoot(container);
       root.render(
           <Provider store={store}>
               <OptionFrameworkApp optionsData={optionsData} />
           </Provider>
       );
   });
