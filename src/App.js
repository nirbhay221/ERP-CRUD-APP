import ProductForm from "./components/ProductForm";
import ProductList from "./components/productList";
const App = () => (
  <div style = {{width : '60%', margin : 'auto'}}>
    <h3>New Product</h3>
    <ProductForm/>
    <hr style = {{border : '1px solid grey'}} />
    <h3>Your Products</h3>
    <ProductList></ProductList>
  </div>
);

export default App;
