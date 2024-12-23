import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetEvents } from '../services/events';
import { Table, Button, Badge, Form, Row, Col, Card } from 'react-bootstrap';
import { format } from 'date-fns';
import EventForm from './EventForm';

const EventList = () => {
    const dispatch = useDispatch();
    const events = useSelector(state => state.eventsSlice?.events || []);
    const error = useSelector(state => state.eventsSlice.error);
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        GetEvents(dispatch);
    }, [dispatch]);

    const handleEdit = (event) => {
        if (!event || !event.id) {
            console.error('Invalid event data:', event);
            return;
        }
        setSelectedEvent(event);
        setIsEditing(true);
    };

    const handleCreateNew = () => {
        setSelectedEvent(null);
        setIsEditing(true);
    };

    const getStatusDisplay = (status) => {
        const statusMap = {
            0: { text: 'Planned', variant: 'info' },
            1: { text: 'Ongoing', variant: 'primary' },
            2: { text: 'Completed', variant: 'success' },
            3: { text: 'Cancelled', variant: 'danger' }
        };

        const statusInfo = statusMap[status] || { text: 'Unknown', variant: 'secondary' };
        return (
            <Badge bg={statusInfo.variant}>
                {statusInfo.text}
            </Badge>
        );
    };

    const filteredEvents = events.filter(event => {
        const matchesStatus = statusFilter === 'all' || event.status.toString() === statusFilter;
        const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            event.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            event.location.toLowerCase().includes(searchQuery.toLowerCase());
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
                    <h4 className="mb-0">{selectedEvent ? 'Edit Event' : 'Create New Event'}</h4>
                    <Button variant="secondary" onClick={() => setIsEditing(false)}>
                        Back to List
                    </Button>
                </Card.Header>
                <Card.Body>
                    <EventForm
                        event={selectedEvent}
                        setIsEditing={setIsEditing}
                        onComplete={() => {
                            GetEvents(dispatch);
                            setIsEditing(false);
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
                    <h4 className="mb-0">Events</h4>
                    <Button variant="primary" onClick={handleCreateNew}>
                        Create New Event
                    </Button>
                </Card.Header>
                <Card.Body>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Control
                                type="text"
                                placeholder="Search events..."
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
                                <option value="0">Planned</option>
                                <option value="1">Ongoing</option>
                                <option value="2">Completed</option>
                                <option value="3">Cancelled</option>
                            </Form.Select>
                        </Col>
                    </Row>

                    <div className="table-responsive">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Date</th>
                                    <th>Location</th>
                                    <th>Status</th>
                                    <th>Participants</th>
                                    <th>Projects</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEvents.length === 0 ? (
                                    <tr>
                                        <td colSpan="8" className="text-center">No events found.</td>
                                    </tr>
                                ) : (
                                    filteredEvents.map((event) => (
                                        <tr key={event.id}>
                                            <td>{event.name}</td>
                                            <td>
                                                {event.description?.length > 100
                                                    ? `${event.description.substring(0, 100)}...`
                                                    : event.description}
                                            </td>
                                            <td>{format(new Date(event.date), 'PPp')}</td>
                                            <td>{event.location}</td>
                                            <td>{getStatusDisplay(event.status)}</td>
                                            <td>
                                                {event.userEvents?.map(ue => (
                                                    <div key={ue.id}>
                                                        {ue.username} ({ue.role})
                                                    </div>
                                                )) || 'No participants'}
                                            </td>
                                            <td>
                                                {event.eventProjects?.map(ep => (
                                                    <div key={ep.id}>{ep.projectName}</div>
                                                )) || 'No projects'}
                                            </td>
                                            <td>
                                                <Button
                                                    variant="info"
                                                    size="sm"
                                                    onClick={() => handleEdit(event)}
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

export default EventList;