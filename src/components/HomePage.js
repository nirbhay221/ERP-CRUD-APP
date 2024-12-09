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
    </div>
  );
}
export default HomePage;