export interface CounterState {
    data: number;
    title: string;
}
const initialState: CounterState = {
    data: 42,
    title: 'YARX (yet another redux counter)'
}

export default function counterReducer(state = initialState, action: any) {
    return state;

}