   // src/index.js
   import React from 'react';
   import ReactDOM from 'react-dom';
   import { ThemeProvider, createTheme } from '@mui/material/styles';
   import OptionFrameworkApp from './components/OptionFrameworkApp';

   const theme = createTheme(); // You can customize the theme here

   const optionsData = {
       general_settings: {
           title: 'Cài Đặt Chung',
           sections: {
               site_info: {
                   title: 'Thông Tin Trang',
                   fields: [
                       {
                           id: 'site_logo',
                           title: 'Logo của Trang',
                           type: 'input',
                           args: {}
                       },
                       {
                           id: 'site_description',
                           title: 'Mô Tả Trang',
                           type: 'textarea',
                           args: {}
                       }
                   ]
               },
               color_settings: {
                   title: 'Cài Đặt Màu Sắc',
                   fields: [
                       {
                           id: 'color_scheme',
                           title: 'Màu Sắc',
                           type: 'select',
                           args: {
                               options: {
                                   light: 'Sáng',
                                   dark: 'Tối'
                               }
                           }
                       }
                   ]
               }
           }
       },
       advanced_settings: {
           title: 'Cài Đặt Nâng Cao',
           sections: {
               feature_settings: {
                   title: 'Cài Đặt Tính Năng',
                   fields: [
                       {
                           id: 'enable_feature_x',
                           title: 'Kích Hoạt Tính Năng X',
                           type: 'select',
                           args: {
                               options: {
                                   yes: 'Có',
                                   no: 'Không'
                               }
                           }
                       }
                   ]
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
