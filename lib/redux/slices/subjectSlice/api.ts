import {
  getService,
  getServicePagination,
  postService
} from "@/lib/axios/api";
import { ISubjectInputType, ISubjectOutputType } from "./model";
import { PaginationRequest } from "../appSlice/model";

export const createSubject = (
  data: ISubjectInputType
) => {
  return postService("/classes", data);
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