const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const Account=require('../models/accountModel');
const moment = require('moment');

const login=async (req,res)=>{
    const {loginOrEmail, Password}=req.body;

    if(!loginOrEmail || !Password){
        return res.status(401).json({message: 'blad'});
    }
    try{
        const account=await Account.login(loginOrEmail);
        console.log(account);
        if(account===0){
            return res.status(401).json({message: 'blad'});
        }
        const acc=account[0];
        const checkPassword=await bcrypt.compare(Password,acc.Password);
        if(!checkPassword){
            return res.status(401).json({message:'niepoprawny login/email lub hasło'});
        }
        const accessToken=jwt.sign({AccountId: acc.AccountId, loginOrEmail},process.env.JWT_SECRET,{expiresIn: '1h'});
        const refreshToken=jwt.sign({AccountId: acc.AccountId, loginOrEmail},process.env.JWT_SECRET,{expiresIn: '7d'});
        const refreshTokenExp=moment().add(7, 'days').format('YYYY-MM-DD HH:mm:ss');

        await Account.updateToken(acc.AccountId, accessToken, refreshToken, refreshTokenExp);
        
        return res.status(200).json({message: 'zalogowano',accessToken,refreshToken});

    }catch(err){
        return res.status(500).json({message: 'błąd podczas logowania'});
    }


};
module.exports={ login };