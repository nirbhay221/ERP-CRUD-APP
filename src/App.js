import { ToastContainer } from "react-toastify";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/productList";
import ProjectForm from "./components/ProjectForm";
import ProjectList from "./components/projectList";
import ServiceForm from "./components/ServiceForm";
import ServiceList from "./components/serviceList";
const App = () => (
  <div style = {{width : '60%', margin : 'auto'}}>
    <h3>Product Page</h3>
    <ProductForm/>
    <hr style = {{border : '1px solid grey'}} />
    <ToastContainer></ToastContainer>
    <h3>Products</h3>
    <ProductList></ProductList>
    <h3>Project Page</h3>
    <ProjectForm/>
    <hr style = {{border : '1px solid grey'}} />
    <h3>Projects</h3>
    <ProjectList></ProjectList>
    <h3>Services Page</h3>
    <ServiceForm/>
    <hr style = {{border : '1px solid grey'}} />
    <h3>Services</h3>
    <ServiceList></ServiceList>
  </div>
);

export default App;
