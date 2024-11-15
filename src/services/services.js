import {ActionCreators} from '../app/servicesReducer';

export const GetServices = async (dispatch) => {
    try {
        //API CALL
        const services = [
            {id : 1, description : 'Service 1', Quantity : 5},
            {id : 2, description : 'Service 2', Quantity : 10},
            {id : 3, description : 'Service 3', Quantity : 15},
        ];
        dispatch(ActionCreators.setServices(services))
    }
    catch {
        console.log('Error !')
    }
} 
export const NewService = async (dispatch, service) => {
    try {
        dispatch(ActionCreators.newService(service));
    }
    catch(error) {
        console.log("Error !", error);
    }
}

export const EditService = async (dispatch , service) => {
    try{
        dispatch(ActionCreators.editService(service));
    }
    catch{
        console.log('Error !');
    }
}


export const DeleteService = async (dispatch , service) => {
    try{
        dispatch(ActionCreators.deleteService(service));
    }
    catch{
        console.log('Error !');
    }
}