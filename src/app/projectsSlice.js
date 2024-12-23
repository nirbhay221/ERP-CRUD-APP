import { createSlice, createAction } from "@reduxjs/toolkit";

export const setProjectsError = createAction('projects/setProjectsError');
export const newProjectsError = createAction('projects/newProjectsError');
export const editProjectsError = createAction('projects/editProjectsError');
export const deleteProjectsError = createAction('projects/deleteProjectsError');

export const projectsSlice = createSlice({
    name: 'projects',
    initialState: {
        projects: [],
        error: null,
    },
    reducers: {
        setProjects: (state, action) => {
            console.log('Setting projects in slice:', action.payload);
            state.projects = Array.isArray(action.payload) ? action.payload : [];
            console.log('State Projects', state.projects);
            state.error = null;
        },
        newProjects: (state, action) => {
            state.projects.unshift(action.payload);
            state.error = null;
        },
        editProjects: (state, action) => {
            const index = state.projects.findIndex(project => project.id === action.payload.id);
            if (index !== -1) {
                state.projects[index] = action.payload;
            }
            state.error = null;
        },
        deleteProjects: (state, action) => {
            state.projects = state.projects.filter(project => project.id !== action.payload.id);
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(setProjectsError, (state, action) => {
                state.error = action.payload;
            })
            .addCase(newProjectsError, (state, action) => {
                state.error = action.payload;
            })
            .addCase(editProjectsError, (state, action) => {
                state.error = action.payload;
            })
            .addCase(deleteProjectsError, (state, action) => {
                state.error = action.payload;
            });
    }
});

export const { setProjects, newProjects, editProjects, deleteProjects } = projectsSlice.actions;
export default projectsSlice.reducer;
