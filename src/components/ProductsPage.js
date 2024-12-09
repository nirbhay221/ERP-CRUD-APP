import { ToastContainer } from "react-toastify";
import ProductForm from "./ProductForm";
import ProductList from "./productList";

const ProductsPage = () => {
  console.log('Products')
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
export default ProductsPage;