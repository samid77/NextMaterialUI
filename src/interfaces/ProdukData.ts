export interface ProdukData{
    id: string;
    idFiturProduk: string; 
    namaFiturProduk: string;
    idTipeProduk: string;
    namaTipeproduk: string;
    namaSegmen: string;
    penghasilanDari: number;
    penghasilanSampai: number;
    plafon: number;
    sukubunga: number;
    tenor: number;
    idStatusPersetujuan: string;
    statusPersetujuan: string;
    created_at: string;
    created_by: string;
    updated_at: string;
    updated_by: string;
    checked_at: string;
    checked_by: string;
    approved_at: string;
    approved_by: string;
}

export interface ProdukDataListState{
    fetch: boolean;
    error: object | object[] | string | null;
    response: any;
    action: string | null;
    data: ProdukData[];
}

export interface ProdukDataAction{
    type: string;
    data: any;
}