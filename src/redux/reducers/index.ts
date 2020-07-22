import MitraDataReducers from './MitraDataReducers';
import SkenarioKuotaReducers from './SkenarioKuotaReducers';
import SkenarioPrioritasReducers from './SkenarioPrioritasReducers';
import ProdukDataReducers from './ProdukDataReducers';
import ParameterEligibleReducers from './ParameterEligibleReducers';
import LayoutReducers from './LayoutReducers';
import { combineReducers } from 'redux';
import PesertaEligibleReducers from './PesertaEligibleReducers';
import PesertaPrioritasReducers from './PesertaPrioritasReducers';

const AppReducers = combineReducers({
  mitraData: MitraDataReducers,
  skenarioKuota: SkenarioKuotaReducers,
  skenarioPrioritas: SkenarioPrioritasReducers,
  parameterEligible: ParameterEligibleReducers,
  layout: LayoutReducers,
  produkData: ProdukDataReducers,
  pesertaEligible: PesertaEligibleReducers,
  pesertaPrioritas: PesertaPrioritasReducers
});

export type AppState = ReturnType<typeof AppReducers>;

export {
  AppReducers
};