import {ActionCreators} from '../app/projectsReducer';

export const GetProjects = async (dispatch) => {
    try {
        //API CALL
        const projects = [
            {id : 1, description : 'Project 1', Quantity : 5},
            {id : 2, description : 'Project 2', Quantity : 10},
            {id : 3, description : 'Project 3', Quantity : 15},
        ];
        dispatch(ActionCreators.setProjects(projects))
    }
    catch {
        console.log('Error !')
    }
} 
export const NewProject = async (dispatch, project) => {
    try {
        dispatch(ActionCreators.newProject(project));
    }
    catch(error) {
        console.log("Error !", error);
    }
}

export const EditProject = async (dispatch , project) => {
    try{
        dispatch(ActionCreators.editProject(project));
    }
    catch{
        console.log('Error !');
    }
}


export const DeleteProject = async (dispatch , project) => {
    try{
        dispatch(ActionCreators.deleteProject(project));
    }
    catch{
        console.log('Error !');
    }
}