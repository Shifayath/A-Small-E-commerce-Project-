import React, { useEffect, useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState();

    useEffect(() => {
        getProductApi()
    }, [])

    const getProductApi = async () => {
        let result = await fetch('http://localhost:3000/products',{
        headers:{
            authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
    });
        result = await result.json();
        setProducts(result)
    }

    const getSearchedProduct = async (event) => {
        if(event=='')
        {
            getProductApi()
        }
        else{
            let result = await fetch(`http://localhost:3000/search/${event}`,{
        headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
        }
        );
            result = await result.json();
            setProducts(result)
        }
    }


    const DeleteProduct = async (event) => {
        let result = await fetch('http://localhost:3000/delete', {
            method: 'delete',
            body: JSON.stringify({ id: event }),
            headers: { 'Content-Type': 'application/json',
            authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}` }
        })

        result = await result.json();

        if (result) {
            getProductApi()
            alert('Are you sure you want to Delete Product?')
        }
    }
console.log('products',products)
    return (
        <div className="tablediv">
            <h1>Product List</h1>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                <IoSearch style={{ fontSize: '25px', marginTop: '21px' }} />
                <input 
                    className='Inputbox' 
                    style={{ width: "45rem" }} 
                    type="search" 
                    onChange={(e)=>{getSearchedProduct(e.target.value)}}
                    placeholder="Search your Product hear..." 
                />
            </div>
            <div className="Table-subdiv">
                <table className="TABLE">
                    <thead >
                        <th className="TH">SL.NO</th>
                        <th className="TH">NAME</th>
                        <th className="TH">CATEGORY</th>
                        <th className="TH">BRAND</th>
                        <th className="TH">PRICE</th>
                        <th className="TH">Action</th>
                    </thead>
                    <tbody >
                        {products?.map((item, index) =>
                            <tr key={index}>
                                <td className="TD">{index + 1}</td>
                                <td className="TD">{item.productname}</td>
                                <td className="TD">{item.category}</td>
                                <td className="TD">{item.brand}</td>
                                <td className="TD">{item.price}</td>
                                <td className="TD">
                                    <Link to={"/Update/" + item._id}>
                                        <RiEdit2Fill style={{ fontSize: '20px', color: 'blue' }} />
                                    </Link>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <MdDeleteForever onClick={() => { DeleteProduct(item._id) }} style={{ fontSize: '20px', color: 'red' }} />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Products;