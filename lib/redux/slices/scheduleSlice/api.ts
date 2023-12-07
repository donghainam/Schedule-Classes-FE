import { downloadService } from "@/lib/axios/api";

export const getSchedule = (semester: string) => {
    return downloadService("/schedule/excel", { ...(!!semester && { semester }) });
}