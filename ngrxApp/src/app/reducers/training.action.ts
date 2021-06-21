import { Action } from "@ngrx/store";
import { Exercise } from "../models/Exercise";

export const SET_AVAILABLE_TRIANINGS = '[TRAININGS] Set Available Trainings';
export const SET_PAST_TRIANINGS = '[TRAININGS] Set Past Trainings';
export const START_TRIANING = '[TRAININGS] Start Training';
export const STOP_TRIANING = '[TRAININGS] Stop Training';

export class SetAvailableTrainings implements Action {
    readonly type = SET_AVAILABLE_TRIANINGS;

    constructor(public payload: Exercise[]) {
    }
}

export class SetPastTrainings implements Action {
    readonly type = SET_PAST_TRIANINGS;

    constructor(public payload: Exercise[]) {
    }
}

export class StartTraining implements Action {
    readonly type = START_TRIANING;

    constructor(public payload: string) {
    }
}

export class StopTraining implements Action {
    readonly type = STOP_TRIANING;
}

export type TrainingActions = SetAvailableTrainings | SetPastTrainings | StartTraining | StopTraining;