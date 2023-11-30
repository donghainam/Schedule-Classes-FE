import {
    deleteService,
    getService,
    getServicePagination,
    postService,
    putService
} from "@/lib/axios/api";
import { PaginationRequest } from "../appSlice/model";
import { ClassroomOutputType, IClassroomInputType } from "./model";

export const createClassroom = ({ name, maxSv }: IClassroomInputType) => {
    return postService("/classroom/create", { name, maxSv });
};

export const getDetailClassroom = (
    id: number
): Promise<ClassroomOutputType> => {
    return getService(`/classroom/${id}`);
};

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

export const editClassroom = (
    id?: number,
    classroom?: IClassroomInputType
) => {
    return putService(`/classroom/${id}`, classroom);
};

export const deleteClassroom = (id: number) => {
    return deleteService(`/classroom/${id}`);
};
