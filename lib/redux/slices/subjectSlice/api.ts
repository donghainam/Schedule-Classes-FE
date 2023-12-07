import {
  deleteService,
  downloadService,
  getService,
  getServicePagination,
  importService,
  postService,
  putService
} from "@/lib/axios/api";
import { INumberOfSubject, ISubjectInputType, ISubjectOutputType } from "./model";
import { PaginationRequest } from "../appSlice/model";

export const createSubject = (
  data: ISubjectInputType
) => {
  return postService("/classes/create", data);
};

export const getDetailSubject = (
  id: number
): Promise<ISubjectOutputType> => {
  return getService(`/classes/${id}`);
};

export const getSubject = ({
  page,
  size,
  sort,
  name,
}: PaginationRequest): Promise<{
  data: ISubjectOutputType[];
  total: number;
}> => {
  return getServicePagination<ISubjectOutputType[]>("/classes", {
    page,
    size,
    sort,
    ...(!!name && { name }),
  });
};

export const getNumSubject = (): Promise<INumberOfSubject> => {
  return getService("/classes/number-of-classes");
}

export const editSubject = (
  id?: number,
  classroom?: ISubjectOutputType
) => {
  return putService(`/classes/${id}`, classroom);
};

export const deleteSubject = (id: number) => {
  return deleteService(`/classes/${id}`);
};

export const getTemplate = () => {
  return downloadService("/classes/template");
}

export const postExcel = (data: any) => {
  return importService("/classes/import", data);
}