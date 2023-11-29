import { getServicePagination } from "@/lib/axios/api";
import { PaginationRequest } from "../appSlice/model";
import { ClassroomOutputType } from "./model";

export const getClassroom = ({
    page,
    size,
    sort,
    name,
}: PaginationRequest): Promise<{
    data: ClassroomOutputType[];
    total: number;
}> => {
    return getServicePagination<ClassroomOutputType[]>("/classroom", {
        page,
        size,
        sort,
        ...(!!name && { name }),
    });
};
