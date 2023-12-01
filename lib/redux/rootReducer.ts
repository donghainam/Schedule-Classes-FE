/* Instruments */
import { authSlice, classroomSlice, counterSlice } from './slices'
import { subjectSlice } from './slices/subjectSlice'

export const reducer = {
  counter: counterSlice.reducer,
  auth: authSlice.reducer,
  classroom: classroomSlice.reducer,
  subject: subjectSlice.reducer,
}
