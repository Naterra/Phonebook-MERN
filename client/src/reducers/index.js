import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import ContactsReducer from './reducer_contacts';
import ContactReducer from './reducer_contact';
import FilterReducer from './reducer_filter';

const rootReducer = combineReducers({
    selected_contact:ContactReducer,
    contacts:ContactsReducer,
    filter: FilterReducer,
    form: formReducer
});

export default rootReducer;
