

const initialState = {
    services : [],
}

export const ActionTypes = {
    SET_SERVICES: 'SET_SERVICES',
    NEW_SERVICE: 'NEW_SERVICE',
    EDIT_SERVICE: 'EDIT_SERVICE',
    DELETE_SERVICE: 'DELETE_SERVICE',
}

export const ActionCreators = {
    setServices : payload => ({ type : ActionTypes.SET_SERVICES, payload }),
    newService: payload => ({type : ActionTypes.NEW_SERVICE, payload}),
    editService: payload => ({type : ActionTypes.EDIT_SERVICE, payload}),
    deleteService: payload => ({type : ActionTypes.DELETE_SERVICE, payload}),
}

export default (state = initialState , action) => {
    switch (action.type) {
        case ActionTypes.SET_SERVICES:
            return { ...state, services : [...action.payload]};
        case ActionTypes.NEW_SERVICE:
            console.log("Adding new service : ", action.payload);
            return { ...state, services : [action.payload, ...state.services] };
        
        case ActionTypes.EDIT_SERVICE:
            const UpdatedServices = state.services.map(service =>
                service.id === action.payload.id ? action.payload : service
            );
            return { ...state, services : UpdatedServices };

        case ActionTypes.DELETE_SERVICE:
            const filteredServices = state.services.filter(service => 
                service.id !== action.payload.id
            );
            return { ...state, services : filteredServices };
        default:
            return state;

    }
}