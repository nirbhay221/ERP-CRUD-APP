import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetProjects } from '../services/projects';
import { Table } from 'react-bootstrap';

const ProjectListView = () => {
    const dispatch = useDispatch();
    const projects = useSelector(state => state.projects.projects); 
    const error = useSelector(state => state.projects.error); 
    console.log('PROJECTS IN LIST VIEW',projects);
    useEffect(() => {
        GetProjects(dispatch);
    }, [dispatch]);

    if (error) {
        return <div>Error loading projects: {error}</div>;
    }

    if (!projects || projects.length === 0) {
        return <div>Loading projects...</div>;
    }

    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {projects.map((project) => (
                    <tr key={project.id}>
                        <td>{project.name}</td>
                        <td>{project.description}</td>
                        <td>{project.status}</td>
                        <td>
                            <button>Edit</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default ProjectListView;
