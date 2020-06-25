import { watcherMitraData } from "./MitraDataSaga";
import { watcherProdukData } from "./ProdukDataSaga";
import { watcherLayout } from "./LayoutSaga";

export default [
    ...watcherProdukData,
    ...watcherMitraData,
    ...watcherLayout
];