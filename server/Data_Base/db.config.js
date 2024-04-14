const  Sequelize= require('sequelize');

const dbName='maxlence';
const dbUser='root';
const dbPassword='password';



const db=new  Sequelize(dbName,dbUser,dbPassword,{
    host:'localhost',
    port:3306,
    dialect:'mysql'
   
});

  async function  testConenction(){
    try {
        await db.authenticate();
        console.log('Database Connected sussefuly ');
    } catch (error) {
        console.error('Database not Connected :', error);
    }
  }

  testConenction();




module.exports=db;

