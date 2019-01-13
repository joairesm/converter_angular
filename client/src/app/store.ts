import { LOGIN, LOGOUT, ADD_CONVERSTION, REMOVE_CONVERSTION, UPDATE_LATEST_LOG } from './actions';
import { tassign} from 'tassign';

export interface log {
    date: string;
    action: string;
    user: string;
    from: string;
    to: string;
    amount: number;
    rate: number;
    rateBack: number;
    result:number
}

export interface IAppState {
    logged: boolean;
    fullname: string;
    logs: log[];
    lastLog: log;
}

export const INITIALSTATE: IAppState = {
    logged: false,
    fullname: '',
    logs: [],
    lastLog: null
}

/**
 * This function is the Store of the Redux state manangement system
 * @param state current state of the application
 * @param action action to apply to the state of the application
 */
export function rootReducer(state: IAppState, action): IAppState{
    switch(action.type){
        case LOGIN: return LoggedIn(state,action);
        case LOGOUT: return LoggedOut(state);
        case ADD_CONVERSTION: return AddConv(state,action);
        case REMOVE_CONVERSTION: return RemoveConv(state,action);
        case UPDATE_LATEST_LOG: return UpdateConv(state,action);
    }
    return state;
}

function LoggedIn(state:IAppState, action){
    return tassign(state, {logged: true, fullname: action.fullname});
}

function LoggedOut(state:IAppState){
    return tassign(state, {logged: false, fullname: ''});
}

function AddConv( state:IAppState, action){
    var logs = [...state.logs];
    logs.push(action.log)
    return tassign(state, {logs: logs, lastLog: action.log});
}

function RemoveConv(state:IAppState, action){
    var index = state.logs.indexOf(action.log);
    var logs = [...state.logs];
    logs.splice(index,1);
    return tassign(state, {logs: logs});
}

function UpdateConv(state:IAppState, action){
    return tassign(state, {lastLog: action.log});
}