export interface ProdukData{
    id?:string;
    idFiturProduk:string;
    namaFiturProduk:string;
    idTipeProduk:string;
    namaTipeProduk:string;
    namaSegmen:string;
    penghasilanDari:number;
    penghasilanSampai:number;
    plafon:number;
    sukuBunga:number;
    tenor:number;
}

export interface ProdukDataFilter{
    idFiturProdukfilter:string;
    namaFiturProdukfilter:string;
    idTipeProdukfilter:string;
    namaTipeProdukfilter:string;
    namaSegmenfilter:string;
    penghasilanDarifilter:any;
    penghasilanSampaifilter:any;
    plafonfilter:any;
    sukuBungafilter:any;
    tenorfilter:any;
}

export interface FiturProduk {
    id: string;
    namaFiturProduk: string;
}

export interface TipeProduk {
    id: string;
    namaTipeProduk: string;
}

export interface ProdukDataListState{
    fetch: boolean;
    error: any;
    response: any;
    action: string | null;
    data: ProdukData[];
    fiturProduk: FiturProduk[];
    tipeProduk: TipeProduk[];
}

export interface ProdukDataAction{
    type: string;
    data?: any;
    fiturProduk?: any;
    tipeProduk?: any;
}

export interface ProdukDataInterface {
   Page:number;
   TotalResult:number;
   TotalPages:number;
   Result:[
      {
         id:string;
         idFiturProduk:string;
         namaFiturProduk:string;
         idTipeProduk:string;
         namaTipeProduk:string;
         namaSegmen:string;
         penghasilanDari:number;
         penghasilanSampai:number;
         plafon:number;
         sukuBunga:number;
         tenor:number;
         created_at: string;
         created_by: string;
         updated_at: string;
         updated_by: string;
         checked_at: string;
         checked_by: string;
         approved_at: string;
         approved_by: string;
      }    
   ]
}
