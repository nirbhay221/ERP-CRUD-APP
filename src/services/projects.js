import {ActionCreators} from '../app/projectsReducer';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://localhost:44345/Projects',
});

export const GetProjects = async (dispatch) => {
    try {
        //API CALL
        const {data} = await axiosInstance.get();
        dispatch(ActionCreators.setProjects(data))
    }
    catch(error) {
        console.log('Error fetching projects !!!', error)
    }
} 
export const NewProject = async (dispatch, project) => {
    try {
        const {data} = await axiosInstance.post('', project);
        dispatch(ActionCreators.newProject(data));
    }
    catch(error) {
        console.log("Error creating projects !", error);
    }
}

export const EditProject = async (dispatch , project) => {
    try{
        
        const {data} = await axiosInstance.put('', project);
        dispatch(ActionCreators.editProject(data));
    }
    catch(error){
        console.log('Error updating project !', error);
    }
}


export const DeleteProject = async (dispatch , project) => {
    try{
        console.log('Deleting Project:', project);
        await axiosInstance.delete('', {data : { ...project}});
        dispatch(ActionCreators.deleteProject(project));
    }
    catch(error){
        console.log('Error deleting project !', error);
    }
}