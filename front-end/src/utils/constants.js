let apiRoot = '';

console.log('process.env:', process.env);

if (process.env.REACT_APP_BUILD_MODE === 'dev') {
    apiRoot = process.env.REACT_APP_API_DEV;
} else if (process.env.REACT_APP_BUILD_MODE === 'production') {
    apiRoot = process.env.REACT_APP_API_PRODUCTION;
}

console.log('🚀 ~ file: constants.js ~ apiRoot:', apiRoot);

export const API_ROOT = apiRoot;
