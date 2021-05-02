import { configureStore } from '@reduxjs/toolkit'
import { AppStore } from '~/store/app-store'
import { courseProgressReducer } from './course-progress'

export const store = configureStore({
  reducer: {
    courseProgress: courseProgressReducer,
  },
})

export const appStore = new AppStore()