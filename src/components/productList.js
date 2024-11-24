import {React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetProducts } from '../services/products';
import {Button, Row, Col} from 'react-bootstrap';
import ProductForm from './ProductForm';


const ProductList = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.productsSlice.products);

    useEffect(() => {
         GetProducts(dispatch);
    }, [dispatch]);

    console.log("Products in list : ", products);

    return products.map(e => 
        <div style = {{ marginBottom : '1rem' }} key={e.id}> 
            <ListRow product = {e} />
        </div>
    ) ;
};

const ListRow = ({product}) => {
    const [isEditing, setIsEditing] = useState(false);
    console.log("Product object in ListRow:", product);
    return  isEditing 
    ? 
    <ProductForm product = {product} setIsEditing = {setIsEditing}/> 
    :
    (
        <div>
            <Row>
                <Col>{product.description}</Col>
                <Col>{product.quantity}</Col>
                <Col><Button variant = "warning" onClick = {() => setIsEditing(!isEditing)}> Edit </Button></Col>
            </Row>
            <hr/>

        </div>
    );
}

export default ProductList; 