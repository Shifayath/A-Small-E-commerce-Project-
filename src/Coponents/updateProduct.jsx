import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

const UpdateProduct = () => {

    const Params = useParams();
    const [productname, setProductname] = useState();
    const [productprice, setProductprice] = useState();
    const [productcategory, setproductcategory] = useState();
    const [productcompany, setProductcompany] = useState();
    console.log('Params.id',Params.id)


    useEffect(() => {
        GetProductDetail()
    }, [])

    const GetProductDetail = async () => {
        let result = await fetch(`http://localhost:3000/update/${Params.id}`);
        result = await result.json();
        setProductname(result.productname)
        setProductprice(result.price)
        setproductcategory(result.category)
        setProductcompany(result.brand)
    }


    const OnFinish = async () => {
        try {
            let result = await fetch(`http://localhost:3000/update/${Params.id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    productname: productname,
                    price: productprice,
                    category: productcategory,
                    brand: productcompany
                }),
                headers: { "Content-Type": "application/json",
                            autheroization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                        }
            });
            result = await result.json();
            if(result?.acknowledged==true)
            {
                GetProductDetail()
            }
        } catch (error) {
            console.error("API BAD Request")
        }
    }


    return (
        <>
            <h1>Update Product</h1>
            <div className="SineUpdiv">
                <input type='text' value={productname} className='Inputbox' placeholder="Enter Product Name" onChange={(e) => { setProductname(e.target.value) }} />
                <input type='Number' value={productprice} className='Inputbox' placeholder="Enter Product Price" onChange={(e) => { setProductprice(e.target.value) }} />
                <input type='text' value={productcategory} className='Inputbox' placeholder="Enter Prosuct category" onChange={(e) => { setproductcategory(e.target.value) }} />
                <input type='text' value={productcompany} className='Inputbox' placeholder="Enter Product company" onChange={(e) => { setProductcompany(e.target.value) }} />
                <button className='SignUp-Button' type='submit' onClick={OnFinish}>SUBMIT</button>
            </div>
        </>)
}

export default UpdateProduct;