export interface MitraData{
    id: number;
    nama: string;
    tanggalPKS: string;
    tanggalLimit: string;
    targetUnit: number;
    maxLimit: number;
    targetNominal: number;
    approvalStatus: number;
    createdAt: number;
}

export interface MitraDataListState{
    fetch: boolean;
    error: object | object[] | string | null;
    response: MitraData[];
    action: string | null;
}

export interface MitraDataAction{
    type: string;
    data: any;
}