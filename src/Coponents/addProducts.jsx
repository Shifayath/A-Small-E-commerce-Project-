import { computeHeadingLevel } from "@testing-library/react";
import React, { useState } from "react";

const AddProduct = () =>
{
    const [productname,setProductname] = useState();
    const [productprice,setProductprice] = useState();
    const [productcategory,setproductcategory] = useState();
    const [productcompany,setProductcompany] = useState();


    const OnFinish = async () =>
    {
        const UserID = JSON.parse(localStorage.getItem('user'))._id;
        try{
            let result = await fetch('http://localhost:3000/add-product',{
            method:'POST',
            body:JSON.stringify({
                productname: productname,
                price:productprice,
                category:productcategory,
                userId:UserID,
                brand:productcompany}),
            headers:{ 
                "Content-Type": "application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`  }
            });
            result = await result.json();
            console.log('Response>>>',result)
        }catch (error) {
            console.error("API BAD Request")
        }
        
    }
 

return(
    <div>
    <h1>Add Products</h1>
    <div className="SineUpdiv">
        <input type='text' value={productname} className='Inputbox' placeholder="Enter Product Name" onChange={(e)=>{setProductname(e.target.value)}}/>
        <input type='Number' value={productprice} className='Inputbox' placeholder="Enter Product Price" onChange={(e)=>{setProductprice(e.target.value)}}/>
        <input type='text' value={productcategory} className='Inputbox' placeholder="Enter Prosuct category" onChange={(e)=>{setproductcategory(e.target.value)}}/>
        <input type='text' value={productcompany} className='Inputbox' placeholder="Enter Product company" onChange={(e)=>{setProductcompany(e.target.value)}}/>
        <button className='SignUp-Button' type='submit' onClick={OnFinish}>SUBMIT</button>
    </div>
    
    </div>);
}

export default AddProduct;