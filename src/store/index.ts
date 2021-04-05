import { configureStore } from '@reduxjs/toolkit'
import { courseProgressReducer } from './course-progress'

export const store = configureStore({
  reducer: {
    courseProgress: courseProgressReducer,
  },
})
