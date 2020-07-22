export interface SkenarioPrioritas {
    id?:string;
    namaSkenario: string;
    kriteria1: boolean;
    kriteria2: boolean;
    kriteria3: boolean;
    kriteria4: boolean;
    kriteria5: boolean;
    berlakuDari: string;
    berlakuSampai:string;
}

export interface SkenarioPrioritasFilter {
    namaSkenariofilter: string;
    kriteria1filter: boolean;
    kriteria2filter: boolean;
    kriteria3filter: boolean;
    kriteria4filter: boolean;
    kriteria5filter: boolean;
    berlakuDarifilter: string;
    berlakuSampaifilter:string;
}

export interface SkenarioPrioritasListState {
    fetch: boolean;
    error: any;
    response: any;
    action: string | null;
    data: SkenarioPrioritas[];
}

export interface SkenarioPrioritasAction{
    type: string;
    data?: any;
}

export interface SkenarioPrioritasInterface {
   Page:number;
   TotalResult:number;
   TotalPages:number;
   Result:[
      {
        id: string;
        namaSkenario: string;
        kriteria1: boolean;
        kriteria2: boolean;
        kriteria3: boolean;
        kriteria4: boolean;
        kriteria5: boolean;
        berlakuDari: string;
        berlakuSampai:string;
        approvalStatus: string;
        createdAt: string;
        createdBy: string;
        updatedAt: string;
        updatedBy: string;
      }    
   ]
}
