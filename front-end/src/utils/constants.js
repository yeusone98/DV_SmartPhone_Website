let apiRoot = '';

console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('REACT_APP_BUILD_MODE:', process.env.REACT_APP_BUILD_MODE);

if (process.env.NODE_ENV === 'development') {
    apiRoot = process.env.REACT_APP_API_DEV || 'http://localhost:8017';
} else if (process.env.NODE_ENV === 'production') {
    apiRoot = process.env.REACT_APP_API_URL || 'https://dv-smartphone-website.onrender.com';
}

console.log('API Root:', apiRoot);

export const API_ROOT = apiRoot;
