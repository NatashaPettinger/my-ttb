import { configureStore } from '@reduxjs/toolkit'
import homeReducer from '../features/home/homeSlice';
import inventoryReducer from '../features/inventory/inventorySlice';
import processingReducer from '../features/processing/processingSlice';
import productionReducer from '../features/production/productionSlice';
import storageReducer from '../features/storage/storageSlice';
import ttbReducer from '../features/ttb/ttbSlice';

export default configureStore({
  reducer: {
    home: homeReducer,
    inventory: inventoryReducer,
    processing: processingReducer,
    production: productionReducer,
    storage: storageReducer,
    ttb: ttbReducer,
  }
})