   // src/index.js
   import React from 'react';
   import ReactDOM from 'react-dom';
   import { ThemeProvider, createTheme } from '@mui/material/styles';
   import OptionFrameworkApp from './components/OptionFrameworkApp';

   const theme = createTheme(); // You can customize the theme here

   const optionsData = {
       general_settings: {
           title: 'Cài Đặt Chung',
           fields: {
               site_logo: {
                   title: 'Logo của Trang',
                   type: 'input',
                   args: {}
               },
               site_description: {
                   title: 'Mô Tả Trang',
                   type: 'textarea',
                   args: {}
               },
               color_scheme: {
                   title: 'Màu Sắc',
                   type: 'select',
                   args: {
                       options: {
                           light: 'Sáng',
                           dark: 'Tối'
                       }
                   }
               }
           }
       }
   };

// Ensure the DOM is ready before rendering
document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <ThemeProvider theme={theme}>
            <OptionFrameworkApp optionsData={optionsData} instanceName="my_custom_theme" />
        </ThemeProvider>,
        document.getElementById('option-framework-app')
    );
});
