/* Instruments */
import { authSlice, classroomSlice, counterSlice } from './slices'

export const reducer = {
  counter: counterSlice.reducer,
  auth: authSlice.reducer,
  classroom: classroomSlice.reducer,
}
