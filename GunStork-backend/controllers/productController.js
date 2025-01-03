const productModel =require('../models/productModel');

exports.getAllProducts= async (req,res)=>{
    try{
        const products= await productModel.getAllProducts();
        res.status(200).json(products);
    }catch(err){
        
        res.status(500).json('blad pobrania danych z serwera');
    }
};
exports.getOnlyTwoSaleProducts= async(req,res)=>{
    try{
        const products=await productModel.getOnlyTwoSaleProducts();
        res.status(200).json(products);
    }catch(err){
        res.status(500).json('blad pobrania danych z serwera');
    }
};

exports.getOnlyTwoNewProducts=async(req,res)=>{
    try{
        const products=await productModel.getOnlyTwoNewProducts();
        res.status(200).json(products);
    }catch(err){
        res.status(500).json('blad pobrania danych z serwera');
    }
}

exports.getProductsByCategory=async(req,res)=>{
    try{
        const {categoryName,caliber=null,producer=null, limit='20', offset='0'} =req.query;
        const products=await productModel.getProductsByCategory(categoryName,caliber,producer,limit,offset);
        res.status(200).json(products);

    }catch(err){
        res.status(500).json('blad pobrania danych z serwera');
    }
};

exports.getCategories=async (req,res)=>{
    try{
        const {categoryName='1!=1'}=req.query;
        const categories = await productModel.getCategories(categoryName);
        res.status(200).send(categories);
    }catch(err){
        res.status(500).send('Blad pobrania danych z serwera');
    }
}

exports.getProductById=async (req,res)=>{
    try{
        const {productId}=req.params;
        const product= await productModel.getProductById(productId);
        res.status(200).send(product);
    }catch(err){
        res.status(500).send('Blad pobrania danych z serwera');
    }
}