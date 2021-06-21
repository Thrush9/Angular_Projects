// export interface State {
//     isLoading: boolean;
// }
// const initialState = {
//     isLoading: false
// }

// export function appReducer(state = initialState, action) {
//     switch (action.type) {
//         case 'START_LOADING':
//             return { isLoading: true };
//         case 'STOP_LOADING':
//             return { isLoading: false };
//         default:
//             return state;
//     }

// }

import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUI from './reducers/ui.reducer';
import * as fromAuth from './reducers/auth.reducer';
import * as fromTraining from './reducers/training.reducer';

export interface State {
    ui: fromUI.State,
    auth: fromAuth.State,
    training: fromTraining.State
}

export const reducers: ActionReducerMap<State> = {
    ui: fromUI.uiReducer,
    auth: fromAuth.authReducer,
    training: fromTraining.trainigReducer
}

export const getUIState = createFeatureSelector<fromUI.State>('ui');
export const getIsLoading = createSelector(getUIState, fromUI.getIsLoading);

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuthenticated = createSelector(getAuthState, fromAuth.getIsAuthenticated);

export const getTrainingState = createFeatureSelector<fromTraining.State>('training');
export const getAvailableExercises = createSelector(getTrainingState, fromTraining.getAvailableExercises);
export const getPastExercises = createSelector(getTrainingState, fromTraining.getPastExercises);
export const getActiveExercise = createSelector(getTrainingState, fromTraining.getActiveExercise);
export const getIsTraining = createSelector(getTrainingState, fromTraining.getIsTraining);