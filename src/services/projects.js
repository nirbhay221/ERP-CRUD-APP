import { setProjects, newProjects, editProjects, deleteProjects } from '../app/projectsSlice';
import axios from 'axios';
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

export const GetProjects = async (dispatch) => {
    try {
        console.log('Fetching projects with base URL:', axiosInstance.defaults.baseURL);
        
        const response = await axiosInstance.get('/');
        
        console.log('Projects fetch response:', response.data);
        
        dispatch(setProjects(response.data));
    } catch (error) {
        console.error('Error fetching projects:', error.response ? error.response.data : error.message);
        dispatch(setProjectsError(error.response ? error.response.data : error.message));
    }
};


export const NewProject = async (dispatch, project) => {
    try {
        const projectWithDto = {
            ...project,
            projectDto: {
                name: project.name,
                description: project.description,
                userId: project.User,
            }
        };
        const { data } = await axiosInstance.post('/', projectWithDto);
        dispatch(newProjects(data));
    } catch (error) {
        dispatch(newProjectsError(error.response ? error.response.data : error.message));
    }
};


export const EditProject = async (dispatch, project) => {
    try {
        const projectWithDto = {
            ...project,
            name: project.name,
            description: project.description,
        };
        const { data } = await axiosInstance.put(`/${project.id}`, projectWithDto);
        dispatch(editProjects(data));
    } catch (error) {
        dispatch(editProjectsError(error.response ? error.response.data : error.message));
    }
};


export const DeleteProject = async (dispatch, project) => {
    try {
        await axiosInstance.delete('/', { data: { ...project } });
        dispatch(deleteProjects(project));
    } catch (error) {
        dispatch(deleteProjectsError(error.response ? error.response.data : error.message));
    }
};