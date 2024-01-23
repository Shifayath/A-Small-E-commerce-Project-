const express = require('express')
const Product = require('./DB/Products');
const cors = require('cors');
const User = require('./DB/users');
const JWT = require('jsonwebtoken')
require('./DB/config');

const JWT_KEY = 'e-commerce'
const app = express();
app.use(cors());
  
app.use(express.json());

app.post('/register', async (req,res)=>
{
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    JWT.sign({result},JWT_KEY,{expiresIn:'2h'},(err,token)=> {
        if(err){
        res.send('user not found');
        }
        else{
            res.send({result,auth : token})
        }
    })
})

app.post('/login', async (req,res)=>
{
    if(req.body.password && req.body.email)
    {
        let user = await User.findOne(req.body).select('-password');
        if(user)
        {
            JWT.sign({user},JWT_KEY,{expiresIn:'2h'},(err,token)=> {
                if(err){
                res.send('user not found');
                }
                else{
                    res.send({user,auth : token})
                }
            })
            
        }else
        {
        res.send({result:'No Data Found1'})
        }
    }else
    {
    res.send({result:'No Data Found2'})
    }
})



app.post('/add-product', VerifyToken,  async (req,res)=>
{
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result)
})

app.get('/products', VerifyToken, async (req,res)=>
{
    let products  = await Product.find();
    if(products.length>0)
    {
    res.send(products)}
    else{
    res.send({result:'No Products found'})
    }
})

app.delete('/delete', VerifyToken, async (req, res) => {
    try {
        let product = await Product.deleteOne({ _id: req.body.id });
        res.send(product);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


app.get('/update/:id', VerifyToken, async (req,res)=>
{
let result = await Product.findOne({_id:req.params.id});
if(result){
    res.send(result);}
    else{
    res.send({result:"No Data Found"});
    }
})

app.put('/update/:id', VerifyToken, async (req,res)=>
{
    let result = await Product.updateOne(
        {_id:req.params.id},
        {
            $set:req.body
        }
        ) 
    res.send(result)
})

app.get('/search/:key', VerifyToken ,async (req,res)=>
{
let result = await Product.find({
    "$or": [
    {name: {$regex: req.params.key}},
    {brand : {$regex : req.params.key}},
    {category : {$regex : req.params.key}},
    {price: {$regex: req.params.key}}]
})
res.send(result);
})


function VerifyToken (req,res,next) {
let token = req.headers['authorization'];
if(token)
{
 token = token.split(' ');
 console.log("middle ware called succesfully...",token[1])
 JWT.verify(token[1],JWT_KEY,(err,valid)=>
 {
    if(err){
    res.status(401).send('please provide valid token');
    }
    else{
        next();
    }
})
}else{
res.status(403).send('please add token..')
}

}

app.listen(3000);