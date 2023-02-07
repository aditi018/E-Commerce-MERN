import {
    All_Product_Fail,
    All_Product_Request,
    All_Product_Success,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    Clear_Errors}
from "../constants/productConstants";



export const productReducer = (state = {products:[]},action) =>{

    switch (action.type) {
        case All_Product_Request:
            
            return{
                loading:true,
                products:[]
            }
            case All_Product_Success:
            
            return{
                loading:false,
                products:action.payload.data.products,
                productsCount:action.payload.productsCount,
            }
            case All_Product_Fail:
            
            return{
                loading:false,
                error:action.payload
            }
            case Clear_Errors:
            
            return{
                ...state,
                error : null
            }
    
        default:
            return state;
    }
}

export const productDetailsReducer = (state = {product:{}},action) =>{

    switch (action.type) {
        case PRODUCT_DETAIL_REQUEST:
            
            return{
                loading:true,
                ...state
            }
            case PRODUCT_DETAIL_SUCCESS:
            
            return{
                loading:false,
                products:action.payload.data
            }
            case PRODUCT_DETAIL_FAIL:
            
            return{
                loading:false,
                error:action.payload
            }
            case Clear_Errors:
            
            return{
                ...state,
                error : null
            }
    
        default:
            return state;
    }
}