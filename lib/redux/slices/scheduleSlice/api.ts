import { downloadService } from "@/lib/axios/api";

export const getSchedule = (semester: string, numOfDayPerWeek: number) => {
    return downloadService("/schedule/excel", {
        ...(!!semester && { semester }),
        ...(!!numOfDayPerWeek && { numOfDayPerWeek })
    });
}