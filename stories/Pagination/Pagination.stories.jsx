import React from 'react';
//import { action } from '@storybook/addon-actions';
import Pagination from 'src/Pagination';
import mdx from './Pagination.mdx';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../scss/global.scss';

export default {
  title: 'Design System/Pagination',
  component: Pagination,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const onPaginate = () => console.log('paginate!')

export const Default = () => (
  <Pagination  
  currentPage={1}
  pageQsVar="page"
  totalPages={10}
  onNavigate={onPaginate}></Pagination>
);

