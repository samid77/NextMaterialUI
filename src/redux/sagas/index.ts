import { watcherMitraData } from "./MitraDataSaga";
import { watcherLayout } from "./LayoutSaga";

export default [
    ...watcherMitraData,
    ...watcherLayout
];