import React from 'react';
import ReactDOM from 'react-dom/client';
import './common/styles/frame.styl'

import { ConfigProvider } from 'antd';
import zn_CN from 'antd/locale/zh_CN'

import { RouterProvider } from 'react-router-dom';
import {globalRouters} from '@/router'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider locale={zn_CN}>
    <RouterProvider router={globalRouters}/>
  </ConfigProvider>
);
