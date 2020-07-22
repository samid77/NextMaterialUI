export interface MitraData{
    id?: string;
    namaMitra: string;
    tanggalMulaiPKS: string;
    tanggalAkhirPKS: string;
    tanggalMulaiLimit: string;
    tanggalAkhirLimit: string;
    targetUnit: number;
    targetNominal: number;
    maksimalLimit: number;
    sisaLimit?: number;
    approvalStatus?: string;
}

export interface MitraDataFilter{
    namaMitrafilter: string;
    tanggalMulaiPKSfilter: any;
    tanggalAkhirPKSfilter: any;
    tanggalMulaiLimitfilter: any;
    tanggalAkhirLimitfilter: any;
    targetUnitfilter: any;
    targetNominalfilter: any;
    maksimalLimitfilter: any;
}

export interface MitraDataListState{
    fetch: boolean;
    error: any;
    response: any;
    action: string | null;
    data: MitraData[];
}

export interface MitraDataAction{
    type: string;
    data: any;
}

export interface DaftarMitra {
    id: string;
    namaMitra: string;
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