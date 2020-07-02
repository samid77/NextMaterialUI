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
    createdAt: string;
}

export interface MitraDataListState{
    fetch: boolean;
    error: object | object[] | string | null;
    response: any;
    action: string | null;
    data: MitraData[];
}

export interface MitraDataAction{
    type: string;
    data: any;
}

export interface MitraDataInterface {
  page: number;
  totalResult: number;
  totalPages: number;
  result: [
    {
      id: string;
      namaMitra: string;
      tanggalMulaiPKS: string;
      tanggalAkhirPKS: string;
      tanggalMulaiLimit: string;
      tanggalAkhirLimit: string;
      targetUnit: number;
      targetNominal: number;
      maksimalLimit: number;
      sisaLimit: number;
      approvalStatus: string;
      createdAt: string;
      createdBy: string;
      updatedAt: string;
      updatedBy: string;
    }
  ]
}