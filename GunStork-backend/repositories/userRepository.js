const db=require('../database');

exports.getUserData=async (accountId)=>{
    try{
        const [rows]=await db.execute(`SELECT Name, LastName, Login, Email, Role, Adress, LicenseNumber,DateOfBirth FROM Account WHERE AccountId=?`,[accountId]);
        return rows[0];
    }catch(err){
        throw new Error('Blad pobierania danych z serwera');
    }
}
exports.getAllUsers=async ()=>{
    try{
        const [rows]=await db.execute(`SELECT a.AccountId, a.Name, a.LastName, a.Login, COALESCE(SUM(p.TotalCost),0) AS TotalCost 
        FROM Account a LEFT JOIN gunstork_db.Purchase p on a.AccountId = p.AccountId 
        WHERE role!='admin' GROUP BY a.AccountId,a.Name, a.LastName, a.Login;`);
        return rows;
    }catch(err){
        throw new Error('Blad pobierania z serwera uzytkownikow');
    }
}
exports.deleteUser= async (id)=>{
    try{
        const [result]=await db.execute(`DELETE FROM Account WHERE AccountId= ?;`,[id]);
        if(result.affectedRows===0){
            throw new Error(`Nie znaleziono użytkownika o podanym ${id}`);
        }
        return {message:`Użytkownik o id: ${id} został usunięty`};

    }catch(err){
        throw new Error('Blad podczas usuwania użytkownika')
    }
}