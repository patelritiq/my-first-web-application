export interface Student {
    id?: number;
    name: string;
    age: number;
    email: string;
    stateId: number;
    state?: State;
}

export interface State {
    stateId: number;
    stateName: string;
}

