import axios from "axios";
import {
    All_Product_Fail,
    All_Product_Request,
    All_Product_Success,
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
            paayload : error.response.data.message
        })
    }
}


//Clearing Errors
export const clearErrors = () =>async(dispatch)=>{
    dispatch({
        type : Clear_Errors
    })
}