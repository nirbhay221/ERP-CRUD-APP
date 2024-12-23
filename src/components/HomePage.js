import React, { useState } from 'react';
import ProductForm from "./ProductForm";
import ProductList from "./productList";
import ProjectForm from "./ProjectForm";
import ProjectList from "./projectList";
import EventForm from "./EventForm";
import EventList from "./eventList";
import { ToastContainer } from "react-toastify";

const HomePage = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div style={{ width: '60%', margin: 'auto' }}>
      <h3>Product Page</h3>
      <ProductForm/>
      <hr style={{ border: '1px solid grey' }} />
      <ToastContainer/>
      <h3>Products</h3>
      <ProductList/>
      
      <h3>Project Page</h3>
      <ProjectForm setIsEditing={setIsEditing} />
      <hr style={{ border: '1px solid grey' }} />
      <h3>Projects</h3>
      <ProjectList/>
      
      <h3>Event Page</h3>
      <EventForm setIsEditing={setIsEditing} />
      <hr style={{ border: '1px solid grey' }} />
      <h3>Events</h3>
      <EventList/>
    </div>
  );
};

export default HomePage;