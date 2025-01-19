const db=require('../database');
require('dotenv').config();

const Account={
    findExistsAccountByLoginOrEmail: async (login, email)=>{
        const [rows]= await db.execute(`SELECT * FROM Account WHERE Login= ? OR Email = ?`,[login,email]);
        return rows;
    },
    createAccount: async (accountData)=>{
        const query= `INSERT INTO Account (Name, LastName, Login, Email, Role, Password, Salt, DateOfBirth, Adress, LicenseNumber, AccessToken, RefreshToken, RefreshTokenExp)
        VALUES(?,?,?,?,'user',?,?,?,?,?, NULL, NULL, NULL);`
        const values=[
            accountData.Name,
            accountData.LastName,
            accountData.Login,
            accountData.Email,
            accountData.Password,
            accountData.Salt,
            accountData.Date,
            accountData.Adress,
            accountData.Licence
        ]
        const [result]=await db.execute(query,values);
        return result;
    },
    login: async (loginOrEmail)=>{
        const query=`SELECT * FROM Account WHERE Login= ? OR Email=?`;
        const [rows]=await db.execute(query,[loginOrEmail,loginOrEmail]);
        return rows;
    },
    updateToken: async (accountId, accessToken, refreshToken, refreshTokenExp)=>{
        
        const query=`UPDATE Account SET AccessToken= ?, RefreshToken= ?, RefreshTokenExp= ? WHERE AccountId= ?`;
        const [rows]=await db.execute(query,[accessToken, refreshToken, refreshTokenExp, accountId]);
        console.log(rows);
        return rows;
    }

};
module.exports=Account;