import {configureStore} from '@reduxjs/toolkit';
import favouriteReducer from './favouriteSlice.ts';

export const store = configureStore({
  reducer: {
    favourites: favouriteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
