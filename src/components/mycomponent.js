// MyComponent.js (React component)

import React, { useEffect, useState } from 'react';

function MyComponent() {
    const [data, setData] = useState(null);

    useEffect(() => {
        // Make a GET request to the Python API
        fetch('/api/my_function')
            .then((response) => response.json())
            .then((result) => {
                setData(result);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    return (
        <div>
            <h1>React Component</h1>
            {data && <p>{data.message}</p>}
        </div>
    );
}

export default MyComponent;
