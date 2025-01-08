import React, { useState } from 'react';
import ProductForm from "./ProductForm";
import ProductList from "./productList";
import ProjectForm from "./ProjectForm";
import ProjectList from "./projectList";
import EventForm from "./EventForm";
import EventList from "./eventList";
import { ToastContainer } from "react-toastify";

const EventsPage = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div style={{ width: '60%', margin: 'auto' }}>
      
      <h3>Event Page</h3>
      <EventForm setIsEditing={setIsEditing} />
      <hr style={{ border: '1px solid grey' }} />
      <h3>Events</h3>
      <EventList/>
    </div>
  );
};

export default EventsPage;