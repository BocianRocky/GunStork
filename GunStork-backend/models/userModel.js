const db=require('../database');

exports.getUserData=async (accountId)=>{
    try{
        const [rows]=await db.execute(`SELECT Name, LastName FROM Account WHERE AccountId=?`,[accountId]);
        return rows;
    }catch(err){
        throw new Error('Blad pobierania danych z serwera');
    }
}