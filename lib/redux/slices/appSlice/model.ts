export type PaginationRequest = {
    page: string;
    size: number;
    sort?: string[];
    block?: string;
    tags?: number[] | null | string[];
    filter?: string;
    data?: [];
    status?: string;
    ownListId?: number;
    name?: string;
    keyword?: string;
    isAllOwnList?: boolean;
};

export interface AppState {
    loading: boolean;
    nextPath: string;
}