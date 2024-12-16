import { Form, Button, Table } from "react-bootstrap";
import { React, useState, useEffect } from 'react';
import { DeleteProduct, EditProduct, NewProduct } from "../services/products";
import { useDispatch, useSelector } from "react-redux";
import { ActionCreators } from "../app/productsReducer";

export default ({ product, setIsEditing }) => {
    const descriptions = ['Product1', 'Product2', 'Product3', 'Product4'];
    const licenseTypes = ["Free", "Paid", "OpenSource"];
    const[name, setName] = useState("");
    const [Quantity, setQuantity] = useState(0);
    const [description, setDescription] = useState(descriptions[0]);
    const [licenseType, setLicenseType] = useState(licenseTypes[0]);
    const [isNewProduct, setIsNewProduct] = useState(true);
    const [productProjects, setProductProjects] = useState([]); 
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.authenticationSlice.userId);

    useEffect(() => {
        if (product !== undefined) {
            setIsNewProduct(false);
            setName(product.name);
            setQuantity(product.Quantity);
            setDescription(product.description);
            setLicenseType(product.licenseType);
            setProductProjects(product.ProductProjects || []);  
        } else {
            setIsNewProduct(true);
        }
    }, [product, userId]);

    const handleSubmit = (event) => {
        event.preventDefault();
    
        const productPayload = {
            name,
            description,
            quantity: Quantity,
            licenseType,
            User: userId,
            ProductProjects: productProjects, 
        };
    
        if (product && !isNewProduct) {
            productPayload.id = product.id;  
        }
    
        if (isNewProduct) {
            NewProduct(dispatch, productPayload); 
        } else {
            EditProduct(dispatch, productPayload); 
            setIsEditing(false);  
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>License Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </td>
                    <td>
                        <Form.Control
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </td>
                    <td>
                        <Form.Control
                            type="number"
                            step="0.1"
                            value={Quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            required
                        />
                    </td>
                    <td>
                        <Form.Control
                            as="select"
                            value={licenseType}
                            onChange={(e) => setLicenseType(e.target.value)}
                        >
                            {licenseTypes.map((type, index) => (
                                <option key={index} value={type}>
                                    {type}
                                </option>
                            ))}
                        </Form.Control>
                    </td>
                    <td>
                        {isNewProduct ? (
                            <Button variant="primary" type="submit">
                                Add
                            </Button>
                        ) : (
                            <div>
                                <Button
                                    variant="danger"
                                    onClick={() => DeleteProduct(dispatch, product)}
                                >
                                    Delete
                                </Button>
                                <Button
                                    variant="success"
                                    type="submit"
                                    style={{ marginLeft: "5px" }}
                                >
                                    Save
                                </Button>
                                <Button
                                    variant="secondary"
                                    style={{ marginLeft: "5px" }}
                                    onClick={() => setIsEditing(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        )}
                    </td>
                </tr>
                </tbody>
            </Table>
        </Form>
    );
};
