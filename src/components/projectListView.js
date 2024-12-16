import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetProjects } from '../services/projects';
import { Table } from 'react-bootstrap';

const ProjectListView = () => {
    const dispatch = useDispatch();
    const projects = useSelector(state => state.projectsReducer?.projects || [] );

    useEffect(() => {
        GetProjects(dispatch);
    }, [dispatch]);

    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Users & Roles</th>
                    <th>Products</th>
                    <th>Events</th>
                </tr>
            </thead>
            <tbody>
                {projects.length === 0 ? (
                    <tr>
                        <td colSpan="5" className="text-center">
                            No projects available.
                        </td>
                    </tr>
                ) : (
                    projects.map((project) => (
                        <tr key={project.id}>
                            <td>{project.name}</td>
                            <td>{project.description}</td>
                            <td>
                                {project.UserProjects.map((userProject) => (
                                    <div key={userProject.id}>
                                        {userProject.User.name}: {userProject.Role}
                                    </div>
                                ))}
                            </td>
                            <td>
                                {project.ProductProjects.map((productProject) => (
                                    <div key={productProject.id}>
                                        {productProject.Product.name}
                                    </div>
                                ))}
                            </td>
                            <td>
                                {project.EventProjects.map((eventProject) => (
                                    <div key={eventProject.id}>
                                        {eventProject.Event.name}
                                    </div>
                                ))}
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </Table>
    );
};

export default ProjectListView;
