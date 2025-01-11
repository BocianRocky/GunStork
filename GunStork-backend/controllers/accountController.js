const bcrypt =require('bcrypt');
const Account =require('../models/accountModel');

const register=async (req,res)=>{
    const {Name,LastName,Login,Email,Password,Date,Adress,Licence}=req.body;
    console.log(Name,LastName,Login,Email,Password,Date,Adress,Licence)
    if(!Name || !LastName || !Login || !Email || !Password || !Date || !Adress || !Licence){
        return res.status(400).json({message:'nie podano wszystkich pól'});
    }

    const checkAge=(dateBirth)=>{
        const today=new global.Date();
        const dateBirthday=new global.Date(dateBirth);
        const age=20 //today.getFullYear()-dateBirthday.getFullYear;
        console.log(age);
        return age>=18;
    };
    if(!checkAge(Date)){
        return res.status(400).json({message: ' musisz miec przymajmniej 18 lat'});
    }
    try{
        const existAccounts=await Account.findExistsAccountByLoginOrEmail(Login,Email);
        console.log(existAccounts);
        if(existAccounts.length>0){
            return res.status(500).json({message: 'Login lub Email jest już zajęty'});
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(Password,salt);

        const newAccount={
            Name, LastName, Login, Email, Password: hashedPassword, Salt: salt, Date, Adress, Licence
        }
        await Account.createAccount(newAccount);
        return res.status(201).json({message:'rejestracja zakonczona sukcesem'});

    }catch(err){
        console.log(err);
        return res.status(500).json({message: 'blad podczas rejetracji'});
    }
};
module.exports={ register };
