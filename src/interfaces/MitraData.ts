export interface MitraData{
    id: number;
    nama: string;
    tanggalPKS: string;
    pksStartDate: string;
    pksEndDate: string;
    tanggalLimit: string;
    limitStartDate: string;
    limitEndDate: string;
    targetUnit: number;
    maxLimit: number;
    targetNominal: number;
    approvalStatus: number;
    createdAt: number;
}

export interface MitraDataListState{
    fetch: boolean;
    error: object | object[] | string | null;
    response: MitraData[] | object;
    action: string | null;
}

export interface MitraDataAddState{
    fetch: boolean;
    error: object | object[] | string | null;
    response: undefined;
    action: string | null;
}

export interface MitraDataAction{
    type: string;
    data: any;
}