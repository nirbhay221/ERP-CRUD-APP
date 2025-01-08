import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetProjects } from '../services/projects';
import { Table, Button, Badge, Form, Row, Col, Card } from 'react-bootstrap';
import ProjectForm from './ProjectForm';

const ProjectList = () => {
    const dispatch = useDispatch();
    const projects = useSelector(state => state.projectsSlice?.projects || []);
    const error = useSelector(state => state.projectsSlice.error);
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        GetProjects(dispatch);
    }, [dispatch]);

    const handleEdit = (project) => {
        setSelectedProject(project);
        setIsEditing(true);
    };

    const handleCreateNew = () => {
        setSelectedProject(null);
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

    const filteredProjects = projects.filter(project => {
        const matchesStatus = statusFilter === 'all' || project.status.toString() === statusFilter;
        const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    if (error) {
        return (
            <div className="alert alert-danger">
                {typeof error === 'object' ? error.message || 'An error occurred' : error}
            </div>
        );
    }

    if (isEditing) {
        return (
            <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">{selectedProject ? 'Edit Project' : 'Create New Project'}</h4>
                    <Button variant="secondary" onClick={() => setIsEditing(false)}>
                        Back to List
                    </Button>
                </Card.Header>
                <Card.Body>
                    <ProjectForm
                        project={selectedProject}
                        setIsEditing={setIsEditing}
                        onComplete={() => {
                            GetProjects(dispatch);
                            setIsEditing(false);
                            setSelectedProject(null);
                        }}
                    />
                </Card.Body>
            </Card>
        );
    }

    return (
        <div>
            <Card className="mb-4">
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">Projects</h4>
                    <Button variant="primary" onClick={handleCreateNew}>
                        Create New Project
                    </Button>
                </Card.Header>
                <Card.Body>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Control
                                type="text"
                                placeholder="Search projects..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </Col>
                        <Col md={6}>
                            <Form.Select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="all">All Statuses</option>
                                <option value="0">Not Started</option>
                                <option value="1">In Progress</option>
                                <option value="2">Completed</option>
                                <option value="3">On Hold</option>
                                <option value="4">Cancelled</option>
                            </Form.Select>
                        </Col>
                    </Row>

                    <div className="table-responsive">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Participants</th>
                                    <th>Products</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProjects.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center">No projects found.</td>
                                    </tr>
                                ) : (
                                    filteredProjects.map((project) => (
                                        <tr key={project.id}>
                                            <td>{project.name}</td>
                                            <td>
                                                {project.description?.length > 100
                                                    ? `${project.description.substring(0, 100)}...`
                                                    : project.description}
                                            </td>
                                            <td>{getStatusDisplay(project.status)}</td>
                                            <td>
                                                {project.userProjects?.map(user => (
                                                    <div key={user.id}>
                                                        {user.username} ({user.role})
                                                    </div>
                                                )) || 'No participants'}
                                            </td>
                                            <td>
                                                {project.productProjects?.map(product => (
                                                    <div key={product.id}>
                                                        {product.productName}
                                                    </div>
                                                )) || 'No products'}
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
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ProjectList;