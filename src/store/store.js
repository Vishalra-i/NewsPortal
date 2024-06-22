import { configureStore } from '@reduxjs/toolkit';
import articleSlice from  './newsArticleSlice'
import menuSlice from './menuSlice';

export const store = configureStore({
  reducer: {
    article : articleSlice ,
    menu: menuSlice,
  },
});
