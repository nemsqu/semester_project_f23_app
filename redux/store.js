import {combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import scanReducer from './reducers';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({ scanReducer });

export const Store = configureStore({reducer: rootReducer}, applyMiddleware(thunk));