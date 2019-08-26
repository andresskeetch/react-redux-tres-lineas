import data from '../../data/data';
import winOptions from '../../data/winOptions'
import { type as getData } from '../actions/getData';
import { type as selectOption } from '../actions/selectOption';
import { type as getWinOptions } from '../actions/getWinOptions';
import { type as restartGame } from '../actions/restartGame';
import { type as gameWon } from '../actions/gameWon';

const defaultState = { data: [], playerActive: 'X', isNew: true, winOptions: [], gameWon: false};
function reducer(state = defaultState, { type, payload}) {
    switch(type) {
        case getData:
            state.data = JSON.parse(JSON.stringify(data));;
            return { ...state };
        case selectOption:
            state.data[payload.indexRow].columns[payload.indexColumn].value = payload.playerActive;
            console.log('state', state.data);
            console.log('data', data);
            const result = { ...state, isNew: false }
            if (payload.playerActive === 'X')
                result.playerActive = 'O';
            else
                result.playerActive = 'X';
            return result;
        case getWinOptions:
            state.winOptions = winOptions;
            return { ...state };
        case gameWon:
            state.gameWon = true;
            return { ...state };
        case restartGame:
            state.data = JSON.parse(JSON.stringify(data));;
            state.isNew = true;
            state.gameWon = false;
            return { ...state };
        default: 
            return state;
    }
}

export default reducer;