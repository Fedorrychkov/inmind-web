import { createSlice } from '@reduxjs/toolkit'

const counter = createSlice({
  name: 'domains',
  initialState: {
    currentCourse: undefined,
  },
  reducers: {
    fetchCourseWithUserProgress: (state, action) => {
      console.log(state, action)
    },
    setCurrentCourse: (state, action) => {
      state.currentCourse = action.payload
    },
    // TODO: Add method for set user answers
    // TODO: Надо сделать вывод курса так, чтобы в контент курса можно было вставлять
    // TODO: ответы от пользователя (сделать структуру в виде чата прям)
  },
})

export const { reducer: courseProgressReducer } = counter
export const { fetchCourseWithUserProgress, setCurrentCourse } = counter.actions
