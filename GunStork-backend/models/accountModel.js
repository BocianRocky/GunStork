const db=require('../database');

const Account={
    findExistsAccountByLoginOrEmail: async (login, email)=>{
        const [rows]= await db.execute(`SELECT * FROM Account WHERE Login= ? OR Email = ?`,[login,email]);
        return rows;
    },
    createAccount: async (accountData)=>{
        const query= `INSERT INTO Account (Name, LastName, Login, Email, Role, Password, Salt, DateOfBirth, Adress, LicenseNumber, RefreshToken, RefreshTokenExp)
        VALUES(?,?,?,?,'user',?,?,?,?,?, NULL, NULL);`
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
    }

};
module.exports=Account;