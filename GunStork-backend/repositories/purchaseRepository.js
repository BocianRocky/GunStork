const db=require('../database');

const Purchase={
    createPurchase: async (AccountId, PaymentMethod, TotalCost, Products)=>{
        try{
            const [purchaseResult]=await db.execute(`INSERT INTO Purchase (AccountId, PurchaseDate, PaymentMethod, TotalCost)
            VALUES (?,CURRENT_TIME(),?,?);`,[AccountId,PaymentMethod,TotalCost]);

            const purchaseId=purchaseResult.insertId;

            for(const product of Products){
                await db.execute(`INSERT INTO OrderedProduct (ProductId, PurchaseId, Quantity)
                VALUES (?,?,?);`,[product.ProductId,purchaseId,product.Quantity]);
                await db.execute(`UPDATE Product SET Quantity=Quantity-? WHERE ProductId= ?`,[product.Quantity,product.ProductId]);
            }
            return purchaseId;
        }catch(err){
            console.error('blad wstawiania koszyka');
            throw new Error('Nie udało sie utworzyć za zamówienia.');
        }
    },
    getAllPurchasesUser: async (AccountId)=>{
        try{
            const query=`SELECT p.PurchaseId, p.AccountId, p.PurchaseDate, p.TotalCost, GROUP_CONCAT(pr.Image) AS ProductImages
                FROM Purchase p JOIN OrderedProduct o ON p.PurchaseId = o.PurchaseId
                JOIN Product pr ON pr.ProductId = o.ProductId
                WHERE p.AccountId = ?
                GROUP BY p.PurchaseId
                ORDER BY p.PurchaseId;`;
            const [rows]=await db.execute(query,[AccountId]);
            return rows;
        }catch(err){
            throw new Error('Nie udało się pobrać zakupów użytkownika');
        }

    }
    
}
module.exports=Purchase;
