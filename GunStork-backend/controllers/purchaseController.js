const purchaseRepository =require('../repositories/purchaseRepository');

const handlePurchase=async (req,res)=>{
    try{
        const {PaymentMethod, TotalCost, Products}=req.body;
        const AccountId=req.user.AccountId;
        console.log(AccountId, PaymentMethod, TotalCost, Products);
        const purchaseId=await purchaseRepository.createPurchase(AccountId, PaymentMethod, TotalCost, Products);
        console.log('koszyk: ',purchaseId);
        res.status(201).json({message:'zamówienie zostalo złożone'});

    }catch(err){
        res.status(500).json({message:'wystąpił błąd podczas realizacji koszyka'});
    }
}
module.exports = { handlePurchase };