export interface LayoutState {
    fetch: boolean;
    error: object | object[] | string | null;
    response: any;
    action: string | null;
    indexPage: boolean;
    anotherPage: boolean;
}

export interface LayoutAction{
    type: string;
    data: any;
}