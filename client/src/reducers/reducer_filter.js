import { SET_FILTER_TERM, SET_FILTER_PAGE, RESET_FILTER, RESET_PAGER } from '../actions/types';


const initialState ={
    type:'alpha',
    term: 'A',
    limit: 5,
    page: 1
};

export default function (state=initialState, action){
    switch(action.type){
        case SET_FILTER_TERM:
            return {...state,
                term:action.payload.term,
                type:action.payload.type
            };
        case SET_FILTER_PAGE:
            return {...state,
                page: action.payload
            };
        case RESET_PAGER:
            return{...state,
                page:1
            }
        case RESET_FILTER:
            return initialState;
        default:
            return state;
    }
}


// const visibilityFilter = (state = 'SHOW_ALL', action) => {
//     switch (action.type) {
//         case 'SET_VISIBILITY_FILTER':
//             return action.filter
//         default:
//             return state
//     }
// }
//
// export default visibilityFilter