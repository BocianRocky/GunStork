const userModel =require('../repositories/userRepository');

exports.getUserData=async (req,res)=>{
    const userId=req.user.AccountId;

    try{
        const userData=await userModel.getUserData(userId);
        res.status(200).json(userData);

    }catch(err){
        res.status(500).json({ message: 'Błąd pobierania profilu użytkownika' });
    }
}
exports.getAllUserWithTotalCostPurchase=async (req,res)=>{
    try{
        const users=await userModel.getAllUsers();
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
        await userModel.deleteUser(id);
        res.status(200).json({message: `Usunięto użytkownika o id: ${id}`});
    }catch(err){
        res.status(500).json({message: 'Błąd podczas usuwania użytkownika'})
    }
};
