import { ToastContainer } from "react-toastify";
import ProductForm from "./ProductForm";
import ProductList from "./productList";
import ProjectForm from "./ProjectForm";
import ProjectList from "./projectList";
import ServiceForm from "./ServiceForm";
import ServiceList from "./serviceList";

const HomePage = () => {
  console.log('Home')
  return (
    <div style={{ width: '60%', margin: 'auto' }}>
      <h3>Product Page</h3>
      <ProductForm/>
      <hr style={{ border: '1px solid grey' }} />
      <ToastContainer/>
      <h3>Products</h3>
      <ProductList/>
      <h3>Project Page</h3>
      <ProjectForm/>
      <hr style={{ border: '1px solid grey' }} />
      <h3>Projects</h3>
      <ProjectList/>
      <h3>Services Page</h3>
      <ServiceForm/>
      <hr style={{ border: '1px solid grey' }} />
      <h3>Services</h3>
      <ServiceList/>
    </div>
  );
}
export default HomePage;