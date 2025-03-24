import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './courseSlice'; // Import the courses slice
import filterReducer from './filterSlice';
import userReducer from './userSlice'
import notificationReducer from './notificationSlice'; // Import the new notification slice
import lessonsReducer from "./lessonsSlice";
import schoolProfileReducer from './schoolSlice';

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    filter: filterReducer,
    user: userReducer,
    // other reducers
    notifications: notificationReducer, // Add the notifications reducer
    lessons: lessonsReducer,
    schoolProfile: schoolProfileReducer,
  },
});