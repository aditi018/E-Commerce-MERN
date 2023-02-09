import axios from "axios";
import {
    All_Product_Fail,
    All_Product_Request,
    All_Product_Success,

    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,

    Clear_Errors}
from "../constants/productConstants";


export const getProduct = ()=>async(dispatch)=>{
    try{
        dispatch({
            type:All_Product_Request,
        })
        const data = await axios.get("/api/v1/products");
        console.log(data);

        dispatch({
            type : All_Product_Success,
            payload : data,
        })
    }catch(error){
        dispatch({
            type : All_Product_Fail,
            payload : error.response.data.message
        })
    }
}

export const getProductDetails = (id)=>async(dispatch)=>{
    try{
        dispatch({
            type:PRODUCT_DETAIL_REQUEST,
        })
        const data = await axios.get(`/api/v1/product/${id}`);
        console.log(data);

        dispatch({
            type : PRODUCT_DETAIL_SUCCESS,
            payload : data.product,
        })
    }catch(error){
        dispatch({
            type : PRODUCT_DETAIL_FAIL,
            payload : error.response.data.message
        })
    }
}


//Clearing Errors
export const clearErrors = () =>async(dispatch)=>{
    dispatch({
        type : Clear_Errors
    })
}