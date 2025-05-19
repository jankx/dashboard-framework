   // src/index.js
   import React from 'react';
   import ReactDOM from 'react-dom';
   import { ChakraProvider, extendTheme } from '@chakra-ui/react';
   import { Provider } from 'react-redux';
   import store from './store'; // Import store
   import OptionFrameworkApp from './components/OptionFrameworkApp';

   const theme = extendTheme({}); // Bạn có thể tuỳ chỉnh theme ở đây

   // Sử dụng dữ liệu từ PHP
   const optionsData = window.optionsData;

   document.addEventListener('DOMContentLoaded', () => {
       ReactDOM.render(
           <Provider store={store}>
               <ChakraProvider theme={theme}>
                   <OptionFrameworkApp optionsData={optionsData} instanceName="my_custom_theme" />
               </ChakraProvider>
           </Provider>,
           document.getElementById('option-framework-app')
       );
   });
