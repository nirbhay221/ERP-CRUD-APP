import { createSlice, createAction } from "@reduxjs/toolkit";

export const setEventsError = createAction('events/setEventsError');
export const newEventsError = createAction('events/newEventsError');
export const editEventsError = createAction('events/editEventsError');
export const deleteEventsError = createAction('events/deleteEventsError');

export const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        events: [],
        error: null,
    },
    reducers: {
        setEvents: (state, action) => {
            state.events = Array.isArray(action.payload) ? action.payload : [];
            state.error = null;
        },
        newEvents: (state, action) => {
            state.events.unshift(action.payload);
            state.error = null;
        },
        editEvents: (state, action) => {
            const index = state.events.findIndex(event => event.id === action.payload.id);
            if (index !== -1) {
                state.events[index] = action.payload;
            }
            state.error = null;
        },
        deleteEvents: (state, action) => {
            state.events = state.events.filter(event => event.id !== action.payload.id);
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(setEventsError, (state, action) => {
                state.error = action.payload;
            })
            .addCase(newEventsError, (state, action) => {
                state.error = action.payload;
            })
            .addCase(editEventsError, (state, action) => {
                state.error = action.payload;
            })
            .addCase(deleteEventsError, (state, action) => {
                state.error = action.payload;
            });
    }
});

export const { setEvents, newEvents, editEvents, deleteEvents } = eventsSlice.actions;
export default eventsSlice.reducer;