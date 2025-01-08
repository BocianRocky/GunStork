const db=require('../database');

exports.getAllProducts=async ()=>{
    try{
        const [products]=await db.execute('SELECT * FROM Products');
        return products;
    }catch(err){
        console.log(`blad podczas pobierania produktów: ${err}`);
        throw new Error('Blad pobierania danych z serwera');
    }
};

exports.getOnlyTwoSaleProducts=async ()=>{
    try{
        const [products]=await db.execute(`SELECT p.ProductId,p.ProductName,p.Price,p.image, p.Description,s.PercentDiscount 
        FROM Product p JOIN Sale s ON p.ProductId=s.ProductId 
        WHERE DateEnd>CURRENT_DATE AND Quantity>0 
        LIMIT 2;`);
        return products;
    }catch(err){
        console.log(`blad podczas pobierania dwóch produktow promocyjnych ${err}`);
        throw new Error('Blad pobierania danych z serwera');
    }
};

exports.getOnlyTwoNewProducts=async ()=>{
    try{
        const [products]=await db.execute(`SELECT p.ProductId, p.ProductName, p.Price, p.image, p.Description,
            COALESCE(CASE
                WHEN s.DateEnd>=CURRENT_DATE THEN s.PercentDiscount
                ELSE 0
            END, 0) AS Discount
        FROM Product p
        LEFT JOIN Sale s ON p.ProductId=s.ProductId
        ORDER BY p.DateAdded DESC
        LIMIT 2;`);
        return products;
    }catch(err){
        console.log(`blad podczas pobierania dwóch najnowszych produktow ${err}`);
        throw new Error('Blad pobierania danych z serwera');
    }
};

exports.getProductsByCategory=async (categoryName,caliber,producer,limit, offset)=>{
    try{
        const [products]= await db.execute(
            `SELECT p.ProductId, p.ProductName, p.Producer, p.image, p.Quantity, p.Description, p.Caliber, p.Price, COALESCE(
            CASE
                WHEN CURRENT_DATE BETWEEN s.DateStart AND s.DateEnd THEN s.PercentDiscount
                    ELSE 0
                END, 0)
                AS DiscountPrice
            FROM Product p LEFT JOIN Sale s ON p.ProductId = s.ProductId JOIN Category c ON p.CategoryId = c.CategoryId
            WHERE c.CategoryName= ? AND ((? IS NULL OR p.Caliber=?) AND (? IS NULL OR p.Producer=?))
            LIMIT ? OFFSET ?;`,
            [categoryName,caliber,caliber, producer,producer,limit,offset]
        );
        return products;
    }catch(err){
        throw new Error('Blad pobierania danych z serwera');
    }
};

exports.getCountProductsByCategories=async (categoryName,caliber,producer)=>{
    try{
        const [row]=await db.execute(
            `SELECT COUNT(*) AS Total
            FROM Product p LEFT JOIN Sale s ON p.ProductId = s.ProductId JOIN Category c ON p.CategoryId = c.CategoryId
            WHERE c.CategoryName= ? AND ((? IS NULL OR p.Caliber=?) AND (? IS NULL OR p.Producer=?));`,[categoryName,caliber,caliber, producer,producer]);
        const total=row[0].Total;
        return total;
    }catch(err){
        throw new Error('Blad pobierania danych z serwera');
    }
};

exports.getCategories=async (categoryName)=>{
    try{
        const [categories]=await db.execute(`SELECT DISTINCT p.Producer AS ProdCal,'Producer' AS Type FROM Product p JOIN Category c ON p.CategoryId=c.CategoryId WHERE c.CategoryName= ?
        UNION
        SELECT DISTINCT p.Caliber AS ProdCal, 'Caliber' AS Type FROM Product p JOIN Category c ON p.CategoryId=c.CategoryId WHERE c.CategoryName= ?
        ORDER BY Type, ProdCal;`,[categoryName,categoryName]);
        return categories;
    }catch(err){
        throw new Error('Blad pobierania danych z serwera');
    }
}

exports.getProductById=async (productId)=>{
    try{
        const [product]=await db.execute(`SELECT p.ProductId,p.ProductName,p.Producer,p.image,p.Price,p.Caliber,p.Quantity,p.Description,p.Mass,COALESCE(s.PercentDiscount,0) AS DiscountPrice,c.CategoryName AS PathName, cparent.CategoryName AS ParentPathName
        FROM Product p LEFT JOIN Sale s ON p.ProductId=s.ProductId
        JOIN Category c ON p.CategoryId=c.CategoryId
        LEFT JOIN Category cparent ON c.CategoryParentId=cparent.CategoryId
        WHERE p.ProductId= ?;`,[productId]);
        return product[0];
    }catch(err){
        throw new Error('Blad pobierania danych z serwera');
    }
}