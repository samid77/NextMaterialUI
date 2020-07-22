import { watcherMitraData } from "./MitraDataSaga";
import { watcherSkenarioKuota } from "./SkenarioKuotaSaga";
import { watcherSkenarioPrioritas } from "./SkenarioPrioritasSaga";
import { watcherProdukData } from "./ProdukDataSaga";
import { watcherParameterEligible } from "./ParameterEligibleSaga";
import { watcherLayout } from "./LayoutSaga";
import { watcherPesertaEligible } from "./PesertaEligibleSaga";
import { watcherPesertaPrioritas } from "./PesertaPrioritasSaga";

export default [
    ...watcherMitraData,
    ...watcherSkenarioKuota,
    ...watcherSkenarioPrioritas,
    ...watcherProdukData,
    ...watcherParameterEligible,
    ...watcherLayout,
    ...watcherPesertaEligible,
    ...watcherPesertaPrioritas,
];