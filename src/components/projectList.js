import {React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetProjects } from '../services/projects';
import {Button, Row, Col} from 'react-bootstrap';
import ProjectForm from './ProjectForm';


const ProjectList = () => {
    const dispatch = useDispatch();
    const projects = useSelector(state => state.projectsReducer.projects);

    useEffect(() => {
         GetProjects(dispatch);
    }, [dispatch]);

    console.log("Projects in list : ", projects);

    return projects.map(e => 
        <div style = {{ marginBottom : '1rem' }} key={e.id}> 
            <ListRow project = {e} />
        </div>
    ) ;
};

const ListRow = ({project}) => {
    const [isEditing, setIsEditing] = useState(false);

    return  isEditing 
    ? 
    <ProjectForm project = {project} setIsEditing = {setIsEditing}/> 
    :
    (
        <div>
            <Row>
                <Col>{project.description}</Col>
                <Col>{project.quantity}</Col>
                <Col><Button variant = "warning" onClick = {() => setIsEditing(!isEditing)}> Edit </Button></Col>
            </Row>
            <hr/>

        </div>
    );
}

export default ProjectList; 