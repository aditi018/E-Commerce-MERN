import {All_Product_Fail,All_Product_Request,All_Product_Success, Clear_Errors} from "../constants/productConstants";



export const productReducer = ((state = {products:[]}),action =>{

    switch (action.type) {
        case All_Product_Request:
            
            return{
                loading:true,
                product:[]
            }
            case All_Product_Success:
            
            return{
                loading:false,
                product:action.payload.products,
                productsCount:action.payload.productscount,
            }
            case All_Product_Fail:
            
            return{
                loading:false,
                error:action.payload
            }
            case Clear_Errors:
            
            return{
                ...state,
                error:null
            }
    
        default:
            return state;
    }
})