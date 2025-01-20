const userRepository =require('../repositories/userRepository');
const purchaseRepositry=require('../repositories/purchaseRepository');

exports.getUserData=async (req,res)=>{
    const userId=req.user.AccountId;

    try{
        const userData=await userRepository.getUserData(userId);
        res.status(200).json(userData);

    }catch(err){
        res.status(500).json({ message: 'Błąd pobierania profilu użytkownika' });
    }
}
exports.getAllUserWithTotalCostPurchase=async (req,res)=>{
    try{
        const users=await userRepository.getAllUsers();
        res.status(200).json(users);
    }catch(err){
        res.status(500).json({message: 'Błąd pobierania użytkowników'});
    }
}

exports.deleteUser=async (req,res)=>{
    try{
        const {id}=req.params;
        if(!id){
            return res.status(400).json({message: 'Nie podano ID użytkownika'});
        }
        await userRepository.deleteUser(id);
        res.status(200).json({message: `Usunięto użytkownika o id: ${id}`});
    }catch(err){
        res.status(500).json({message: 'Błąd podczas usuwania użytkownika'})
    }
};

exports.getPurchasesUser=async (req,res)=>{
    try{
        const accountId=req.user.AccountId;
        console.log(accountId);
        const purchases=await purchaseRepositry.getAllPurchasesUser(accountId);
        const offPurchases=purchases.map(row=>({
            ...row, ProductImages: row.ProductImages ? row.ProductImages.split(','):[],
        }));
        res.status(200).json(offPurchases);
    }catch(err){
        res.status(500).json({message: 'Błąd podczas pobierania zamówień użytkownika'});
    }
};

