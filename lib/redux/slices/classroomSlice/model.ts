export interface ClassroomOutputType {
    id: number;
    userId: number;
    name: string;
    maxSv: number;
}

export interface IClassroomState {
    data: ClassroomOutputType[];
    loading: boolean;
    page: number;
    itemPerPage: number;
    totalClassroom: number;
}

export interface IClassroomInputType {
    name: string;
    maxSv: number;
}