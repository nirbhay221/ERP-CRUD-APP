import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NewEvent, EditEvent, DeleteEvent } from '../services/events';
import { GetUsers } from '../services/users';
import { GetProjects } from '../services/projects';
import { EventStatus } from '../services/events';
import { format } from 'date-fns';

const EventForm = ({ event, setIsEditing, onComplete }) => {
    const initialFormState = {
        name: '',
        description: '',
        status: EventStatus.Planned.toString(),
        date: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
        location: '',
        dateOfCompletion: null,
        userEvents: [],
        eventProjects: []
    };

    const [formData, setFormData] = useState(initialFormState);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedProjects, setSelectedProjects] = useState([]);
    const [isNewEvent, setIsNewEvent] = useState(true);
    
    const dispatch = useDispatch();
    const users = useSelector((state) => state.usersSlice.users);
    const projects = useSelector((state) => state.projectsSlice.projects);

    useEffect(() => {
        GetUsers(dispatch);
        GetProjects(dispatch);
    }, [dispatch]);

    const resetForm = () => {
        setFormData(initialFormState);
        setSelectedUsers([]);
        setSelectedProjects([]);
        setIsNewEvent(true);
    };

    useEffect(() => {
        if (event) {
            setIsNewEvent(false);
            setFormData({
                id: event.id,
                name: event.name,
                description: event.description,
                status: event.status.toString(),
                date: format(new Date(event.date), "yyyy-MM-dd'T'HH:mm"),
                location: event.location,
                dateOfCompletion: event.dateOfCompletion ? 
                    format(new Date(event.dateOfCompletion), "yyyy-MM-dd'T'HH:mm") : null,
                dateOfCreation: event.dateOfCreation
            });
            
            const existingUsers = event.userEvents?.map(ue => ({
                userId: ue.userId,
                role: ue.role,
                username: ue.username
            })) || [];
            
            const existingProjects = event.eventProjects?.map(ep => ({
                projectId: ep.projectId,
                projectName: ep.projectName
            })) || [];

            setSelectedUsers(existingUsers);
            setSelectedProjects(existingProjects);
        } else {
            resetForm();
        }
    }, [event]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const eventPayload = {
            id: formData.id,
            name: formData.name,
            description: formData.description,
            status: parseInt(formData.status),
            date: new Date(formData.date).toISOString(),
            location: formData.location,
            dateOfCompletion: formData.dateOfCompletion ? 
                new Date(formData.dateOfCompletion).toISOString() : null,
            dateOfCreation: formData.dateOfCreation,
            userEvents: selectedUsers.map(user => ({
                userId: parseInt(user.userId),
                role: user.role,
                username: user.username
            })),
            eventProjects: selectedProjects.map(project => ({
                projectId: parseInt(project.projectId),
                projectName: project.projectName
            }))
        };

        try {
            if (isNewEvent) {
                await NewEvent(dispatch, eventPayload);
            } else {
                await EditEvent(dispatch, eventPayload);
            }
            resetForm();
            if (onComplete) {
                onComplete();
            }
            setIsEditing(false);
        } catch (error) {
            console.error('Error submitting event:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await DeleteEvent(dispatch, formData);
            resetForm();
            if (onComplete) {
                onComplete();
            }
            setIsEditing(false);
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const handleCancel = () => {
        resetForm();
        setIsEditing(false);
        if (onComplete) {
            onComplete();
        }
    };
    
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleAddUser = (userId, username) => {
        if (!selectedUsers.some(u => u.userId === parseInt(userId))) {
            setSelectedUsers([...selectedUsers, {
                userId: parseInt(userId),
                role: 'Participant',
                username
            }]);
        }
    };

    const handleRemoveUser = (userId) => {
        setSelectedUsers(selectedUsers.filter(u => u.userId !== userId));
    };

    const handleUserRoleChange = (userId, newRole) => {
        setSelectedUsers(selectedUsers.map(user => 
            user.userId === userId ? { ...user, role: newRole } : user
        ));
    };

    const handleAddProject = (projectId) => {
        const project = projects.find(p => p.id === parseInt(projectId));
        if (project && !selectedProjects.some(p => p.projectId === parseInt(projectId))) {
            setSelectedProjects(prev => [...prev, {
                projectId: parseInt(projectId),
                projectName: project.name
            }]);
        }
    };

    const handleRemoveProject = (projectId) => {
        setSelectedProjects(prev => prev.filter(p => p.projectId !== projectId));
    };

    if (!users.length || !projects.length) {
        return <div>Loading users and projects...</div>;
    }

    return (
        <Form onSubmit={handleSubmit} className="p-3 border rounded">
            <Row className="mb-3">
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Event Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                            as="select"
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                        >
                            <option value={EventStatus.Planned}>Planned</option>
                            <option value={EventStatus.Ongoing}>Ongoing</option>
                            <option value={EventStatus.Completed}>Completed</option>
                            <option value={EventStatus.Cancelled}>Cancelled</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Date and Time</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                />
            </Form.Group>

            <Row className="mb-3">
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Add Participants</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                const user = users.find(u => u.id === parseInt(e.target.value));
                                if (user) {
                                    handleAddUser(e.target.value, user.username);
                                }
                            }}
                            value=""
                        >
                            <option value="">Select User...</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.username}
                                </option>
                            ))}
                        </Form.Control>

                        <ListGroup className="mt-2">
                            {selectedUsers.map((user) => (
                                <ListGroup.Item key={user.userId} className="d-flex justify-content-between align-items-center">
                                    <div>
                                        {user.username}
                                        <Form.Control
                                            as="select"
                                            size="sm"
                                            className="d-inline-block ms-2"
                                            value={user.role}
                                            onChange={(e) => handleUserRoleChange(user.userId, e.target.value)}
                                            style={{ width: 'auto' }}
                                        >
                                            <option value="Organizer">Organizer</option>
                                            <option value="Participant">Participant</option>
                                        </Form.Control>
                                    </div>
                                    <Button 
                                        variant="danger" 
                                        size="sm"
                                        onClick={() => handleRemoveUser(user.userId)}
                                    >
                                        Remove
                                    </Button>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Form.Group>
                </Col>

                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Add Related Projects</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => handleAddProject(e.target.value)}
                            value=""
                        >
                            <option value="">Select Project...</option>
                            {projects.map((project) => (
                                <option key={project.id} value={project.id}>
                                    {project.name}
                                </option>
                            ))}
                        </Form.Control>

                        <ListGroup className="mt-2">
                            {selectedProjects.map((project) => (
                                <ListGroup.Item 
                                    key={project.projectId} 
                                    className="d-flex justify-content-between align-items-center"
                                >
                                    {project.projectName}
                                    <Button 
                                        variant="danger" 
                                        size="sm"
                                        onClick={() => handleRemoveProject(project.projectId)}
                                    >
                                        Remove
                                    </Button>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Form.Group>
                </Col>
            </Row>

            <div className="d-flex justify-content-end gap-2">
                {isNewEvent ? (
                    <Button variant="primary" type="submit">
                        Create Event
                    </Button>
                ) : (
                    <>
                        <Button variant="danger" onClick={handleDelete}>
                            Delete
                        </Button>
                        <Button variant="success" type="submit">
                            Save Changes
                        </Button>
                        <Button variant="secondary" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </>
                )}
            </div>
        </Form>
    );
};

export default EventForm;