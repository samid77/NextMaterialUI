export interface SkenarioKuota {
    id?:string;
    namaSkenario: string;
    kuota: number;
    berlakuDari: string;
    berlakuSampai:string;
}

export interface SkenarioKuotaFilter {
    namaSkenariofilter: string;
    kuotafilter: number;
    berlakuDarifilter: string;
    berlakuSampaifilter:string;
}

export interface SkenarioKuotaListState {
    fetch: boolean;
    error: any;
    response: any;
    action: string | null;
    data: SkenarioKuota[];
}

export interface SkenarioKuotaAction{
    type: string;
    data?: any;
}

export interface SkenarioKuotaInterface {
   Page:number;
   TotalResult:number;
   TotalPages:number;
   Result:[
      {
        id: string;
        namaSkenario: string;
        kuota: number;
        berlakuDari: string;
        berlakuSampai:string;
        createdAt: string;
        createdBy: string;
        updatedAt: string;
        updatedBy: string;
      }    
   ]
}
