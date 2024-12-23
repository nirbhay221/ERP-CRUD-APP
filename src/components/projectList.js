import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetProjects } from '../services/projects';
import { Table, Button, Badge } from 'react-bootstrap';

const ProjectList = ({ setIsEditing, setSelectedProject }) => {
    const dispatch = useDispatch();
    const projects = useSelector(state => state.projectsSlice?.projects || [] );
    console.log('PROJECTS ON Project List',projects)
    const error = useSelector(state => state.projectsSlice.error);

    useEffect(() => {
        GetProjects(dispatch);
    }, [dispatch]);

    const handleEdit = (project) => {
        if (!project || !project.id) {
            console.error('Invalid project data:', project);
            return;
        }
        console.log('Editing project:', project);
        setSelectedProject(project);
        setIsEditing(true);
    };

    const getStatusDisplay = (status) => {
        const statusMap = {
            0: { text: 'Not Started', variant: 'secondary' },
            1: { text: 'In Progress', variant: 'primary' },
            2: { text: 'Completed', variant: 'success' },
            3: { text: 'On Hold', variant: 'warning' },
            4: { text: 'Cancelled', variant: 'danger' }
        };
        
        const statusInfo = statusMap[status] || { text: 'Unknown', variant: 'secondary' };
        return (
            <Badge bg={statusInfo.variant}>
                {statusInfo.text}
            </Badge>
        );
    };

    if (error) {
        return <div className="alert alert-danger">
            {typeof error === 'object' ? error.message || 'An error occurred' : error}
        </div>;
    }

    console.log('Current projects in component:', projects); 

    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Team Members</th>
                    <th>Products</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {(!projects || projects.length === 0) ? (
                    <tr>
                        <td colSpan="6" className="text-center">No projects available.</td>
                    </tr>
                ) : (
                    projects.map((project) => (
                        <tr key={project.id}>
                            <td>{project.name}</td>
                            <td>{project.description}</td>
                            <td>{getStatusDisplay(project.status)}</td>
                            <td>
                                {project.userProjects?.map(up => up.username).join(', ') || 'No team members'}
                            </td>
                            <td>
                                {project.productProjects?.map(pp => pp.productName).join(', ') || 'No products'}
                            </td>
                            <td>
                                <Button
                                    variant="info"
                                    size="sm"
                                    onClick={() => handleEdit(project)}
                                >
                                    Edit
                                </Button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </Table>
    );
};

export default ProjectList;