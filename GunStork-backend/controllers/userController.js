const userModel =require('../models/userModel');

exports.getUserData=async (req,res)=>{
    const userId=req.user.AccountId;

    try{
        const userData=await userModel.getUserData(userId);
        res.status(200).json(userData);

    }catch(err){
        res.status(500).json({ message: 'Błąd pobierania profilu użytkownika' });
    }
}
