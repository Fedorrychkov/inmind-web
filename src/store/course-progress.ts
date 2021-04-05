import { createSlice } from '@reduxjs/toolkit'

const counter = createSlice({
  name: 'domains',
  initialState: {
  },
  reducers: {
    fetchCourseWithUserProgress: (state, action) => {
      console.log(state, action)
    },
  },
})

export const { reducer: courseProgressReducer } = counter
export const { fetchCourseWithUserProgress } = counter.actions
