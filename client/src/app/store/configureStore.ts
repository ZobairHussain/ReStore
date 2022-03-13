import { createStore } from "redux";
import counterReducer from "../../feature/contact/counterReducer";

export function configureStore() {
    return createStore(counterReducer);
}