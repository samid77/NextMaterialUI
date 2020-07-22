export interface PesertaPrioritas {
  noPeserta: string;
  namaPeserta: string;
  pemberiKerja: string;
  noPonsel: string;
  alamat: string;
  skor: string;
}

export interface PesertaPrioritasFilter {
  noPesertaFilter: string;
  namaPesertaFilter: string;
  pemberiKerjaFilter: string;
  noPonselFilter: string;
  alamatFilter: string;
  skorFilter: string;
}

export interface PesertaPrioritasListState {
  fetch: boolean;
  error: any;
  response: any;
  action: string | null;
  data: PesertaPrioritas[];
}

export interface PesertaPrioritasAction {
  type: string;
  data: any;
}