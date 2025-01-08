import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NewProject, EditProject, DeleteProject } from '../services/projects';
import { GetUsers } from '../services/users';
import { GetProducts } from '../services/products';
import { ProjectStatus } from '../services/projects';
import { format } from 'date-fns';

const ProjectForm = ({ project, setIsEditing, onComplete }) => {
    const initialFormState = {
        name: '',
        description: '',
        status: ProjectStatus.NotStarted.toString(),
        dateOfCompletion: null,
        userProjects: [],
        projectProducts: []
    };

    const [formData, setFormData] = useState(initialFormState);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [isNewProject, setIsNewProject] = useState(true);
    
    const dispatch = useDispatch();
    const users = useSelector((state) => state.usersSlice.users);
    const products = useSelector((state) => state.productsSlice.products);

    useEffect(() => {
        GetUsers(dispatch);
        GetProducts(dispatch);
    }, [dispatch]);

    const resetForm = () => {
        setFormData(initialFormState);
        setSelectedUsers([]);
        setSelectedProducts([]);
        setIsNewProject(true);
    };

    useEffect(() => {
        if (project) {
            setIsNewProject(false);
            setFormData({
                id: project.id,
                name: project.name,
                description: project.description,
                status: project.status.toString(),
                dateOfCompletion: project.dateOfCompletion,
                dateOfCreation: project.dateOfCreation
            });
            
            const existingUsers = project.userProjects?.map(ue => ({
                userId: ue.userId,
                role: ue.role,
                username: ue.username
            })) || [];
            
            const existingProducts = project.productProjects?.map(pp => ({
                productId: pp.productId,
                productName: pp.productName
            })) || [];
    
            setSelectedUsers(existingUsers);
            setSelectedProducts(existingProducts);
        } else {
            resetForm();
        }
    }, [project]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const projectPayload = {
            id: formData.id,
            name: formData.name,
            description: formData.description,
            status: parseInt(formData.status),
            dateOfCompletion: formData.dateOfCompletion,
            dateOfCreation: formData.dateOfCreation,
            userProjects: selectedUsers.map(user => ({  
                userId: parseInt(user.userId),
                role: user.role,
                username: user.username
            })),
            projectProducts: selectedProducts.map(product => ({
                productId: parseInt(product.productId),
                productName: product.productName
            }))
        };
    
        try {
            if (isNewProject) {
                await NewProject(dispatch, projectPayload);
            } else {
                await EditProject(dispatch, projectPayload);
            }
            resetForm();
            if (onComplete) {
                onComplete();
            }
            setIsEditing(false);
        } catch (error) {
            console.error('Error submitting project:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await DeleteProject(dispatch, formData);
            resetForm();
            if (onComplete) {
                onComplete();
            }
            setIsEditing(false);
        } catch (error) {
            console.error('Error deleting project:', error);
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

    const handleAddProduct = (productId) => {
        const product = products.find(p => p.id === parseInt(productId));
        if (product && !selectedProducts.some(p => p.productId === parseInt(productId))) {
            setSelectedProducts(prev => [...prev, {
                productId: parseInt(productId),
                productName: product.name
            }]);
        }
    };

    const handleRemoveProduct = (productId) => {
        setSelectedProducts(prev => prev.filter(p => p.productId !== productId));
    };

    if (!users.length || !products.length) {
        return <div>Loading users and products...</div>;
    }

    return (
        <Form onSubmit={handleSubmit} className="p-3 border rounded">
            <Row className="mb-3">
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Project Name</Form.Label>
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
                            <option value={ProjectStatus.NotStarted}>Not Started</option>
                            <option value={ProjectStatus.InProgress}>In Progress</option>
                            <option value={ProjectStatus.Completed}>Completed</option>
                            <option value={ProjectStatus.OnHold}>On Hold</option>
                            <option value={ProjectStatus.Cancelled}>Cancelled</option>
                        </Form.Control>
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
                                            <option value="Owner">Owner</option>
                                            <option value="Member">Member</option>
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
                        <Form.Label>Add Related Products</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => handleAddProduct(e.target.value)}
                            value=""
                        >
                            <option value="">Select Product...</option>
                            {products.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            ))}
                        </Form.Control>

                        <ListGroup className="mt-2">
                            {selectedProducts.map((product) => (
                                <ListGroup.Item 
                                    key={product.productId} 
                                    className="d-flex justify-content-between align-items-center"
                                >
                                    {product.productName}
                                    <Button 
                                        variant="danger" 
                                        size="sm"
                                        onClick={() => handleRemoveProduct(product.productId)}
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
                {isNewProject ? (
                    <Button variant="primary" type="submit">
                        Create Project
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

export default ProjectForm;