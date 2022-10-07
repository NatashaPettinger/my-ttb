import axios from 'axios';
import authHeader from "./authHeader";

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
})

// Auth requests
/* export const login = async (payload) => {
    const res = await api.post('/login', payload);
    console.log(res.data.token)
    if (res.data.token) {
        localStorage.setItem("user", JSON.stringify(res.data.token));
        loginAuth();
    }
    return res.data.token;
}
export const signup = payload => api.post('/signup', payload);
export const logout = async() => {
    //await api.get('/logout');
    localStorage.removeItem('user');
    logoutAuth();
} */
export const getCurrentUser = () => JSON.parse(localStorage.getItem("user"));

// Raw materials requests
export const getRawMaterials = token => api.get('/rawMaterials', { headers: authHeader(token) });
export const receiveRawMaterials = (payload, token) => api.patch('/rawMaterials', payload, { headers: authHeader(token) });
export const adjustQuantityOnHand = (payload, token) => api.patch('/rawMaterials/quantityAdjust', payload, { headers: authHeader(token) });
export const editRawMaterials = (payload, token) => api.patch('/rawMaterials/edit', payload, { headers: authHeader(token) });
export const editQuantityAdjust = (payload, token) => api.patch('/rawMaterials/editQuantityAdjust', payload, { headers: authHeader(token) })
export const editMaterialsLog = (payload, token) => api.patch('/rawMaterials/editMaterialsLog', payload, { headers: authHeader(token) })

// Production requests
export const getFerments = token => api.get('/production', { headers: authHeader(token) });
export const createMash = (payload, token) => api.post('/production', payload, { headers: authHeader(token) });
export const addIngredient = (payload, token) => api.patch('/production/addIngredient', payload, { headers: authHeader(token) });
export const setFermentTank = (payload, token) => api.patch('production/setFermentTank', payload, { headers: authHeader(token) });
export const addFermentData = (payload, token) => api.patch('production/addFermentData', payload, { headers: authHeader(token) });
export const editFermentLog = (payload, token) => api.patch('production/editFermentLog', payload, { headers: authHeader(token) });
export const stillInitialize = (payload, token) => api.patch('production/stillInitialize', payload, { headers: authHeader(token) });
export const addStillDataPoint = (payload, token) => api.patch('production/addStillDataPoint', payload, { headers: authHeader(token) });
export const stillMashData = (payload, token) => api.patch('production/stillMashData', payload, { headers: authHeader(token) });
export const stillCutStarts = (payload, token) => api.patch('production/stillCutStarts', payload, { headers: authHeader(token) });
export const productionTransferLog = (payload, token) => api.post('production/productionTransferLog', payload, { headers: authHeader(token) });

// Warehousing requests
export const getTanks = token => api.get('/warehousing', { headers: authHeader(token) });
export const createTank = payload => api.post('/warehousing', payload); // for dealing with TIBs
export const setProductionTank = payload => api.post('/warehousing/setProductionTank', payload);
export const transferFromProduction = payload => api.patch('/warehousing/transferFromProduction', payload);
export const updateTank= payload => api.patch('/warehousing/updateTank', payload);
export const updateFill= payload => api.patch('/warehousing/updateFill', payload);
export const transferToNewTank= payload => api.patch('/warehousing/existing-to-new', payload);
export const transferToExistingTank= payload => api.patch('/warehousing/existing-to-existing', payload);
export const transferOutOfStorage = payload => api.patch('/warehousing/transferOutOfStorage', payload);

// Processing requests
export const getProcessing = token => api.get('/processing', { headers: authHeader(token) })
export const processNewBatch = payload => api.post('/processing', payload)

//TTB requests
export const processTTBReports = (payload, token) => api.post('/ttb', payload, { headers: authHeader(token) })
export const getTTBReports = token => api.get('/ttb', { headers: authHeader(token) })


const apis = {
    /* login,
    signup,
    logout, */
    getCurrentUser,
    //rawMaterials requests
    getRawMaterials,
    receiveRawMaterials,
    adjustQuantityOnHand,
    editRawMaterials,
    editQuantityAdjust,
    editMaterialsLog,
    //production requests
    getFerments,
    createMash,
    addIngredient,
    setFermentTank,
    addFermentData,
    stillInitialize,
    addStillDataPoint,
    stillMashData,
    stillCutStarts,
    productionTransferLog,
    //storage requests
    getTanks, 
    createTank,
    setProductionTank,
    transferFromProduction,
    updateTank,
    updateFill,
    transferToNewTank,
    transferToExistingTank,
    transferOutOfStorage,
    //processing requests
    getProcessing,
    processNewBatch,
    processTTBReports,
    getTTBReports
}

export default apis

/* This file & folder is not necessary.
can import axios into each react page and 
use directly from there. example: https://axios-http.com/docs/example 
another example: search "Then, in your Todo.js file you write the following code:"
in https://blog.devgenius.io/how-to-get-started-with-the-mern-stack-the-easy-way-b9758fe45956
and look at the code snippet below it.*/

//OR HAVE SMALLER ROUTES FOLDERS LIKE FOR THE BACKEND