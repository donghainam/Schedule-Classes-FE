export interface ISubjectOutputType {
    id: number;
    userId: number;
    name: string;
    classNote: string;
    courseCode: string;
    startWeek: number;
    numberOfLessons: number;
    numberOfWeekStudy: number;
    semester: string;
    conditions: number;
    countWeekStudied: number;
    departmentName: string;
    weekOff: string;
}

export interface ISubjectState {
    data: ISubjectOutputType[];
    loading: boolean;
    page: number;
    itemPerPage: number;
    totalSubject: number;
}

export interface ISubjectInputType {
    name: string;
    classNote: string;
    courseCode: string;
    startWeek: number;
    numberOfLessons: number;
    totalNumberOfLessons: number;
    semester: string;
    conditions: number;
    departmentName: string;
    weekOff: string;
}

export interface INumberOfSubject {
    num: number;
}