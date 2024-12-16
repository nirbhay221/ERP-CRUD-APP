import React, { useState, useEffect } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NewProject, EditProject, DeleteProject } from '../services/projects';

const ProjectForm = ({ project, setIsEditing }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [userProjects, setUserProjects] = useState([]);
    const [productProjects, setProductProjects] = useState([]);
    const [isNewProject, setIsNewProject] = useState(true);
    const dispatch = useDispatch();
    
    const users = useSelector((state) => state.users || []);
    const products = useSelector((state) => state.products || []);

    useEffect(() => {
        if (project !== undefined) {
            setIsNewProject(false);
            setName(project.name);
            setDescription(project.description);
            setUserProjects(project.UserProjects || []);
            setProductProjects(project.ProductProjects || []);
        } else {
            setIsNewProject(true);
        }
    }, [project]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const projectPayload = {
            name,
            description,
            UserProjects: userProjects,  
            ProductProjects: productProjects
        };

        if (project && !isNewProject) {
            projectPayload.id = project.id;
        }

        if (isNewProject) {
            NewProject(dispatch, projectPayload);
        } else {
            EditProject(dispatch, projectPayload);
            setIsEditing(false);
        }
    };

    const handleUserChange = (e) => {
        const selectedUsers = Array.from(e.target.selectedOptions, option => option.value);
        setUserProjects(selectedUsers);
    };

    const handleProductChange = (e) => {
        const selectedProducts = Array.from(e.target.selectedOptions, option => option.value);
        setProductProjects(selectedProducts);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Users</th>
                        <th>Products</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </td>
                        <td>
                            <Form.Control
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </td>
                        <td>
                            <Form.Control
                                as="select"
                                multiple
                                value={userProjects}
                                onChange={handleUserChange}
                            >
                                {users.length > 0 ? (
                                    users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))
                                ) : (
                                    <option>No users available</option>
                                )}
                            </Form.Control>
                        </td>
                        <td>
                            <Form.Control
                                as="select"
                                multiple
                                value={productProjects}
                                onChange={handleProductChange}
                            >
                                {products.length > 0 ? (
                                    products.map((product) => (
                                        <option key={product.id} value={product.id}>
                                            {product.name}
                                        </option>
                                    ))
                                ) : (
                                    <option>No products available</option>
                                )}
                            </Form.Control>
                        </td>
                        <td>
                            {isNewProject ? (
                                <Button variant="primary" type="submit">
                                    Add
                                </Button>
                            ) : (
                                <div>
                                    <Button
                                        variant="danger"
                                        onClick={() => DeleteProject(dispatch, project)}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        variant="success"
                                        type="submit"
                                        style={{ marginLeft: "5px" }}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        style={{ marginLeft: "5px" }}
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            )}
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Form>
    );
};

export default ProjectForm;
