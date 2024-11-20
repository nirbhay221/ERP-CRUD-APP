import {Form, Row, Col, Button} from "react-bootstrap";
import {React, useState, useEffect } from 'react';
import { DeleteProject, EditProject, NewProject } from "../services/projects";
import { useDispatch } from "react-redux";
import { ActionCreators } from "../app/projectsReducer";

export default ({project, setIsEditing}) => {
    const descriptions = ['Project1' , 'Project2' , 'Project3', 'Project4'];
    const [Quantity, setQuantity] = useState(0); 
    const [description, setDescription] = useState(descriptions[0]);
    const [isNewProject, setIsNewProject] = useState(true);
    const dispatch = useDispatch();

    useEffect( () => {
        if (project !== undefined){
            setIsNewProject(false);
            setQuantity(project.Quantity);
            setDescription(project.description);
        }
        else{
            setIsNewProject(true);
        }
    }, [project]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if(isNewProject){
            NewProject(dispatch, { description, Quantity });
        }
        else{
            EditProject(dispatch, { id: project.id, description, Quantity });
            setIsEditing(false);
        }
    };

    return (
    <Form onSubmit = {handleSubmit}>
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
                <Form.Control type = 'number' step = '0.1' value = {Quantity} onChange = {event => setQuantity(Number(event.target.value))} />
            </Col>
            <div style = {{marginTop: 'auto'}}>
                {isNewProject ? <Button variant ='primary' type = 'submit'>Add</Button>: 
                <div>
                    <Button style = {{marginRight : '2px'}} variant ='danger' onClick={() => DeleteProject(dispatch, project)}>Delete</Button>
                    <Button style = {{marginRight : '2px'}} variant ='success' type = 'submit'>Save</Button>
                    <Button style = {{marginRight : '2px'}} variant ='default' onClick = {() => setIsEditing(false)}>Cancel</Button>
                    </div>
                    }
            </div>
        </Row>
    </Form>
    );
}