/* Instruments */
import {
  authSlice,
  classroomSlice,
  appSlice,
  subjectSlice,
  scheduleSlice
} from './slices'

export const reducer = {
  app: appSlice.reducer,
  auth: authSlice.reducer,
  classroom: classroomSlice.reducer,
  subject: subjectSlice.reducer,
  schedule: scheduleSlice.reducer,
}
