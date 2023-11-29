export interface IPaginationBaseState {
  itemsPerPage: number;
  activePage: string;
  keyword?: string | null;
  filter?: string | null;
  tags?: number[] | null | string;
  name?: string | null;
  type?: string;
  sort?: string;
}
