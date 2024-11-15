import {React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetServices } from '../services/services';
import {Button, Row, Col} from 'react-bootstrap';
import ServiceForm from './ServiceForm';


const ServiceList = () => {
    const dispatch = useDispatch();
    const services = useSelector(state => state.servicesReducer.services);

    useEffect(() => {
         GetServices(dispatch);
    }, [dispatch]);

    console.log("Services in list : ", services);

    return services.map(e => 
        <div style = {{ marginBottom : '1rem' }} key={e.id}> 
            <ListRow service = {e} />
        </div>
    ) ;
};

const ListRow = ({service}) => {
    const [isEditing, setIsEditing] = useState(false);

    return  isEditing 
    ? 
    <ServiceForm service = {service} setIsEditing = {setIsEditing}/> 
    :
    (
        <div>
            <Row>
                <Col>{service.description}</Col>
                <Col>{service.Quantity}</Col>
                <Col><Button variant = "warning" onClick = {() => setIsEditing(!isEditing)}> Edit </Button></Col>
            </Row>
            <hr/>

        </div>
    );
}

export default ServiceList; 