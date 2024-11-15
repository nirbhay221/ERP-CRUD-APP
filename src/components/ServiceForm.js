import {Form, Row, Col, Button} from "react-bootstrap";
import {React, useState, useEffect } from 'react';
import { DeleteService, EditService, NewService } from "../services/services";
import { useDispatch } from "react-redux";
import { ActionCreators } from "../app/servicesReducer";

export default ({service, setIsEditing}) => {
    const descriptions = ['Service1' , 'Service2' , 'Service3', 'Service4'];
    const [Quantity, setQuantity] = useState(0); 
    const [description, setDescription] = useState(descriptions[0]);
    const [isNewService, setIsNewService] = useState(true);
    const dispatch = useDispatch();

    useEffect( () => {
        if (service !== undefined){
            setIsNewService(false);
            setQuantity(service.Quantity);
            setDescription(service.description);
        }
        else{
            setIsNewService(true);
        }
    }, [service]);
    return <Form
        onSubmit = {event => {
            event.preventDefault();
            if(isNewService){
                dispatch(ActionCreators.newService({ description, Quantity }));
            }
            else{
                dispatch(ActionCreators.editService({ id: service.id, description, Quantity }));
                setIsEditing(false)
            }
        }}
    >
        <Row>
            <Col>
                <Form.Label>Description</Form.Label>
                <Form.Control as = 'select' value = {description} onChange = 
                {event => setDescription(event.target.value)}>
                        {descriptions.map((d, index) => <option key = {index}>{d}</option>)}
                      </Form.Control>
            </Col>
            <Col>
                <Form.Label>Quantity</Form.Label>
                <Form.Control type = 'number' step = '0.1' placeholder = {Quantity} onChange = {event => setQuantity(Number(event.target.value))} />
            </Col>
            <div style = {{marginTop: 'auto'}}>
                {isNewService ? <Button variant ='primary' type = 'submit'>Add</Button>: 
                <div>
                    <Button style = {{marginRight : '2px'}} variant ='danger' onClick={() => DeleteService(dispatch, service)}>Delete</Button>
                    <Button style = {{marginRight : '2px'}} variant ='success' type = 'submit'>Save</Button>
                    <Button style = {{marginRight : '2px'}} variant ='default' onClick = {() => setIsEditing(false)}>Cancel</Button>
                    </div>
                    }
            </div>
        </Row>
    </Form>
}