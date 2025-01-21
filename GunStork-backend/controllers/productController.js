const productRepository =require('../repositories/productRepository');

exports.getAllProducts= async (req,res)=>{
    try{
        const products= await productRepository.getAllProducts();
        res.status(200).json(products);
    }catch(err){
        
        res.status(500).json('blad pobrania danych z serwera');
    }
};
exports.getOnlyTwoSaleProducts= async(req,res)=>{
    try{
        const products=await productRepository.getOnlyTwoSaleProducts();
        res.status(200).json(products);
    }catch(err){
        res.status(500).json('blad pobrania danych z serwera');
    }
};

exports.getOnlyTwoNewProducts=async(req,res)=>{
    try{
        const products=await productRepository.getOnlyTwoNewProducts();
        res.status(200).json(products);
    }catch(err){
        res.status(500).json('blad pobrania danych z serwera');
    }
}

exports.getProductsByCategoryAndCount=async(req,res)=>{
    try{
        const {categoryName,caliber=null,producer=null, limit='12', offset='0'} =req.query;
        
        const products=await productRepository.getProductsByCategory(categoryName,caliber,producer,limit,offset);
        const total=await productRepository.getCountProductsByCategories(categoryName,caliber,producer);
        res.status(200).json({products,total});

    }catch(err){
        console.log(err);
        res.status(500).json('bladwwww pobrania danych z serwera');
    }
};

exports.getCategories=async (req,res)=>{
    try{
        const {categoryName='1!=1'}=req.query;
        const categories = await productRepository.getCategories(categoryName);
        res.status(200).send(categories);
    }catch(err){
        res.status(500).send('Blad pobrania danych z serwera');
    }
}

exports.getProductById=async (req,res)=>{
    try{
        const {productId}=req.params;
        const product= await productRepository.getProductById(productId);
        res.status(200).send(product);
    }catch(err){
        res.status(500).send('Blad pobrania danych z serwera');
    }
}
exports.getChildrenCategory=async (req,res)=>{
    try{
        const {categoryName}=req.query;
        const categories=await productRepository.getChildrenCategory(categoryName);
        res.status(200).json(categories);
    }catch(err){
        res.status(500).send('Blad pobrania podkategorii z serwera');
    }
}