   // src/index.js
   import React from 'react';
   import ReactDOM from 'react-dom';
   import OptionFrameworkApp from './components/OptionFrameworkApp';

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
        <OptionFrameworkApp optionsData={optionsData} instanceName="my_custom_theme" />,
        document.getElementById('option-framework-app') // Ensure this ID matches
    );
});
