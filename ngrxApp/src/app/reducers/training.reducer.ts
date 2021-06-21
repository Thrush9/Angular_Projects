import { Exercise } from "../models/Exercise";
import { TrainingActions, SET_AVAILABLE_TRIANINGS, SET_PAST_TRIANINGS, START_TRIANING, STOP_TRIANING } from "./training.action";

export interface State {
    availableExercises: Exercise[];
    pastExercises: Exercise[];
    activeTraining: Exercise;
}

const initialState: State = {
    availableExercises: [],
    pastExercises: [],
    activeTraining: null
};

export function trainigReducer(state = initialState, action: TrainingActions) {
    switch (action.type) {
        case SET_AVAILABLE_TRIANINGS:
            return { ...state, availableExercises: action.payload };
        case SET_PAST_TRIANINGS:
            return { ...state, pastExercises: action.payload };
        case START_TRIANING:
            return {
                ...state,
                activeTraining: { ...state.availableExercises.find(exe => exe.id === action.payload) }
            };
        case STOP_TRIANING:
            return { ...state, activeTraining: null };
        default:
            return state;
    }
}

export const getAvailableExercises = (state: State) => state.availableExercises;
export const getPastExercises = (state: State) => state.pastExercises;
export const getActiveExercise = (state: State) => state.activeTraining;
export const getIsTraining = (state: State) => state.activeTraining !== null;