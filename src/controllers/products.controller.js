import {getConnection, sql, queries} from '../database';


//Select product into database
export const getProducts = async (req,res)=>{
    try{
        const pool = await getConnection()
        const result = await pool.request().query(queries.getAllProducts)
    }
    catch(err){
        res.status(500);
        res.send(err.message);
    }
}


//Insert product into database
export const createNewProduct = async (req,res)=>{
    const {name, description} = req.body
    let {quantity} = req.body 

    if(name == null || description == null){
        return res.status(400).json({msg: "Bad request, please fill all fields"})
    }
    if (quantity == null) quantity = 0;

    try{
        const pool = await getConnection();
        const result = await pool.request()
        .input('name', sql.VarChar, name)
        .input('description_',sql.Text, description)
        .input('quantity',sql.Int, quantity)
        .query(queries.addNewProduct);
        
        res.json({name,description,quantity});
    }
    catch(err){
        res.status(500);
        res.send(err.message);
    }
}

//Get product by id into database
export const getProductById = async (req,res)=>{
    const {id} = req.params;
    const pool = await getConnection();
    const result = await pool.request()
        .input('id',sql.Int, id)
        .query(queries.getProductById);

    console.log(result.recordset[0]);

    res.send(id);
}

//delete product by id into database
export const deleteProductById = async (req,res)=>{
    const {id} = req.params;
    const pool = await getConnection();
    const result = await pool.request()
        .input('id',sql.Int, id)
        .query(queries.deleteProductById);

    console.log(result);

    res.send(id);
}

//count products into database
export const getTotalProducts = async (req,res)=>{
    const pool = await getConnection();
    const result = await pool.request()
        .query(queries.getTotalProducts);

    console.log(result.recordset[0]['']);
}

//update products into database
export const updateProductById = async (req,res)=>{
    const {name, description, quantity} = req.body;
    const {id} = req.params;

    if(name == null || description == null, quantity === null){
        return res.status(400).json({msg: "Bad request: Please fill all fields"});
    }

    const pool = await getConnection()
    const result = await pool.request()
        .input('name',sql.VarChar,name)
        .input('description',sql.Text,description)
        .input('quantity',sql.Int,quantity)
        .input('id',sql.Int,id)
        .query(queries.updateProductById);
}