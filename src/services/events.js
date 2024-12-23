import axios from 'axios';
import { setEvents, newEvents, editEvents, deleteEvents } from '../app/eventsSlice';
import { setEventsError, editEventsError, newEventsError, deleteEventsError } from '../app/eventsSlice';

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/Events`,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const EventStatus = {
    Planned: 0,
    Ongoing: 1,
    Completed: 2,
    Cancelled: 3
};

export const NewEvent = async (dispatch, event) => {
    try {
        const eventData = {
            name: event.name,
            description: event.description,
            status: parseInt(EventStatus[event.status]) || 0,
            date: event.date,
            location: event.location,
            dateOfCompletion: event.dateOfCompletion,
            userEvents: event.userEvents.map(user => ({
                userId: user.userId,
                role: user.role,
                username: user.username
            })),
            eventProjects: event.eventProjects.map(project => ({
                projectId: project.projectId,
                projectName: project.projectName
            }))
        };
        
        const response = await axiosInstance.post('/', eventData);
        dispatch(newEvents(response.data));
        return response.data;
    } catch (error) {
        dispatch(newEventsError(error.response?.data || error.message));
        throw error;
    }
};

export const GetEvents = async (dispatch) => {
    try {
        const response = await axiosInstance.get('/');
        if (response.data && Array.isArray(response.data)) {
            dispatch(setEvents(response.data));
        } else {
            dispatch(setEventsError('Invalid data format received'));
        }
    } catch (error) {
        dispatch(setEventsError(error.response?.data || error.message));
    }
};

export const EditEvent = async (dispatch, event) => {
    try {
        if (!event.id) {
            throw new Error('Event ID is required for editing');
        }

        const eventData = {
            id: event.id,
            name: event.name,
            description: event.description,
            status: parseInt(event.status),
            date: event.date,
            location: event.location,
            dateOfCreation: event.dateOfCreation,
            dateOfCompletion: event.dateOfCompletion,
            userEvents: event.userEvents.map(user => ({
                userId: parseInt(user.userId),
                role: user.role,
                username: user.username
            })),
            eventProjects: event.eventProjects.map(project => ({
                projectId: parseInt(project.projectId),
                projectName: project.projectName
            }))
        };

        const response = await axiosInstance.put(`/${event.id}`, eventData);
        if (response.data) {
            dispatch(editEvents(response.data));
            return response.data;
        } else {
            throw new Error('No data received from server');
        }
    } catch (error) {
        dispatch(editEventsError(error.response?.data || error.message));
        throw error;
    }
};

export const DeleteEvent = async (dispatch, event) => {
    try {
        await axiosInstance.delete(`/${event.id}`);
        dispatch(deleteEvents({ id: event.id }));
        return true;
    } catch (error) {
        dispatch(deleteEventsError(error.response?.data || error.message));
        throw error;
    }
};