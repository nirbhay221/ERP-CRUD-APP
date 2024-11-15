

const initialState = {
    projects : [],
}

export const ActionTypes = {
    SET_PROJECTS: 'SET_PROJECTS',
    NEW_PROJECT: 'NEW_PROJECT',
    EDIT_PROJECT: 'EDIT_PROJECT',
    DELETE_PROJECT: 'DELETE_PROJECT',
}

export const ActionCreators = {
    setProjects : payload => ({ type : ActionTypes.SET_PROJECTS, payload }),
    newProject: payload => ({type : ActionTypes.NEW_PROJECT, payload}),
    editProject: payload => ({type : ActionTypes.EDIT_PROJECT, payload}),
    deleteProject: payload => ({type : ActionTypes.DELETE_PROJECT, payload}),
}

export default (state = initialState , action) => {
    switch (action.type) {
        case ActionTypes.SET_PROJECTS:
            return { ...state, projects : [...action.payload]};
        case ActionTypes.NEW_PROJECT:
            console.log("Adding new project : ", action.payload);
            return { ...state, projects : [action.payload, ...state.projects] };
        
        case ActionTypes.EDIT_PROJECT:
            const UpdatedProjects = state.projects.map(project =>
                project.id === action.payload.id ? action.payload : project
            );
            return { ...state, projects : UpdatedProjects };

        case ActionTypes.DELETE_PROJECT:
            const filteredProjects = state.projects.filter(project => 
                project.id !== action.payload.id
            );
            return { ...state, projects : filteredProjects };
        default:
            return state;

    }
}