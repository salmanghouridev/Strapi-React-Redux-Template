import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from './slices/productSlice';

function App() {
  const dispatch = useDispatch();
  const { isLoading, data, isError } = useSelector((state) => state.todo);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  console.log('Fetched data:', data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching data.</div>;
  }

  const isDataArray = Array.isArray(data?.data);

  if (!isDataArray || data.data.length === 0) {
    return <div>No products found or data is not in the expected format.</div>;
  }

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {data.data.map((product, index) => (
          <li key={index}>
            <h2>{product.attributes.title}</h2>
            <p>Price: {product.attributes.price}</p>
            {/* Display the image if it exists */}
            {product.attributes.image && product.attributes.image.data &&
              <img src={`http://localhost:1337${product.attributes.image.data.attributes.url}`} alt={product.attributes.title} style={{ maxWidth: '200px', maxHeight: '200px' }} />
            }
            <p>Description: {product.attributes.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
