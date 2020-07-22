export interface PesertaEligible {
  nomorPeserta: string;
  namaPeserta: string;
  pemberiKerja: string;
  nomorTelepon: string;
  alamat: string;
  ProcessDate: string;
}

export interface PesertaEligibleFilter {
  nomorPesertaFilter: string;
  namaPesertaFilter: string;
  pemberiKerjaFilter: string;
  nomorTeleponFilter: string;
  alamatFilter: string;
}

export interface PesertaEligibleListState {
  fetch: boolean;
  error: any;
  response: any;
  action: string | null;
  data: PesertaEligible[];
}

export interface PesertaEligibleAction {
  type: string;
  data: any;
}