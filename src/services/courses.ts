import course from '../courses-data/communications.json'

export const getCourses = () => {

}

export const getCourseById = (id: number) => {
  console.info(id)
  return course.data
}
