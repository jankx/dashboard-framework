   // src/index.js
   import React from 'react';
   import ReactDOM from 'react-dom';
   import { ThemeProvider, createTheme } from '@mui/material/styles';
   import { Provider } from 'react-redux';
   import store from './store'; // Import store
   import OptionFrameworkApp from './components/OptionFrameworkApp';

   const theme = createTheme(); // You can customize the theme here

   // Sử dụng dữ liệu từ PHP
   const optionsData = window.optionsData;

   document.addEventListener('DOMContentLoaded', () => {
       ReactDOM.render(
           <Provider store={store}>
               <ThemeProvider theme={theme}>
                   <OptionFrameworkApp optionsData={optionsData} instanceName="my_custom_theme" />
               </ThemeProvider>
           </Provider>,
           document.getElementById('option-framework-app')
       );
   });
