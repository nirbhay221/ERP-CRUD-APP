import axios from 'axios';
import { setProjects, newProjects, editProjects, deleteProjects } from '../app/projectsSlice';
import { setProjectsError, editProjectsError, newProjectsError, deleteProjectsError } from '../app/projectsSlice';

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/Projects`,
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

const handleError = (error) => {
    if (error.response?.data) {
        return typeof error.response.data === 'string' 
            ? error.response.data 
            : error.response.data.message || 'An error occurred';
    }
    return error.message || 'An error occurred';
};
export const ProjectStatus = {
    NotStarted: 0,
    InProgress: 1,
    Completed: 2,
    OnHold: 3,
    Cancelled: 4
};

export const NewProject = async (dispatch, project) => {
    try {
        const projectData = {
            name: project.name,
            description: project.description,
            status: parseInt(ProjectStatus[project.status]) || 0,
            dateOfCompletion: project.dateOfCompletion,
            userProjects: project.userProjects.map(user => ({
                userId: user.userId,
                role: user.role,
                username: user.username

            })),
            productProjects: project.productProjects.map(product => ({
                productId: product.productId,
                productName: product.productName
            }))
        };
        
        console.log('Sending project data:', projectData);
        
        const response = await axiosInstance.post('/', projectData);
        console.log('Project creation response:', response.data);
        dispatch(newProjects(response.data));
        return response.data;
    } catch (error) {
        console.error('Project creation error:', error.response?.data || error);
        dispatch(newProjectsError(error.response?.data || error.message));
        throw error;
    }
};
export const GetProjects = async (dispatch) => {
    try {
        const response = await axiosInstance.get('/');
        console.log('Raw API Response:', response);
        
        if (response.data && Array.isArray(response.data)) {
            console.log('Dispatching projects:', response.data);
            dispatch(setProjects(response.data));
        } else {
            console.error('Invalid data format received:', response.data);
            dispatch(setProjectsError('Invalid data format received'));
        }
    } catch (error) {
        console.error('Get Projects Error:', error);
        dispatch(setProjectsError(error.response?.data || error.message));
    }
};

export const EditProject = async (dispatch, project) => {
    try {
        if (!project.id) {
            throw new Error('Project ID is required for editing');
        }

        const projectData = {
            id: project.id,
            name: project.name,
            description: project.description,
            status: parseInt(project.status),
            dateOfCreation: project.dateOfCreation,
            dateOfCompletion: project.dateOfCompletion,
            userProjects: project.userProjects.map(user => ({
                userId: parseInt(user.userId),
                role: user.role,
                username: user.username
            })),
            productProjects: project.productProjects.map(product => ({
                productId: parseInt(product.productId),
                productName: product.productName
            }))
        };

        const response = await axiosInstance.put(`/${project.id}`, projectData);
        
        if (response.data) {
            dispatch(editProjects(response.data));
            return response.data;
        } else {
            throw new Error('No data received from server');
        }
    } catch (error) {
        const errorMessage = handleError(error);
        console.error('Edit project error:', errorMessage);
        dispatch(editProjectsError(errorMessage));
        throw error;
    }
};

export const DeleteProject = async (dispatch, project) => {
    try {
        await axiosInstance.delete(`/${project.id}`);
        dispatch(deleteProjects({ id: project.id }));
        return true;
    } catch (error) {
        console.error('Project delete error:', error.response?.data || error);
        dispatch(deleteProjectsError(error.response?.data || error.message));
        throw error;
    }
};