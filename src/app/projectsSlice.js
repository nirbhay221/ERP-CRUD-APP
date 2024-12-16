import { createSlice, createAction } from "@reduxjs/toolkit";

export const setProjectsError = createAction('setProjectsError');
export const newProjectsError = createAction('newProjectsError');
export const editProjectsError = createAction('editProjectsError');
export const deleteProjectsError = createAction('deleteProjectsError');


export const projectsSlice = createSlice({
        name: 'projects',
        initialState: {
            projects: [],
            error: null,
        },
        reducers: {
            setProjects: (state, action) => {
                return { ...state, projects : [...action.payload]};
            },
            newProjects: (state, action) => {
                return { ...state, projects : [action.payload, ...state.projects] };
            },
            editProjects: (state, action) => {
                const UpdatedProjects = state.projects.map(project =>
                    project.id === action.payload.id ? action.payload : project
                );
                return { ...state, projects : UpdatedProjects };
            },
            deleteProjects: (state, action) => {
                const filteredProjects = state.projects.filter(project => 
                    project.id !== action.payload.id
                );
                return { ...state, projects : filteredProjects };
            }
        }
});

export const {setProjects, newProjects, editProjects, deleteProjects } = projectsSlice.actions;
export default projectsSlice.reducer;