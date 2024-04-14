const Sequelize =require('sequelize')
const dataBase=require('../Data_Base/db.config');
   
const Users = dataBase.define('Users', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true 
        },
        fullname: {
            type: Sequelize.STRING, 
            allowNull: false,
        },
        phone: {
            type: Sequelize.STRING, 
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING, 
            allowNull: false,
            unique: true
        },
        image:{
            type: Sequelize.STRING, 
            allowNull: true,
        },
        password: {
            type: Sequelize.STRING, 
            allowNull: false
        },
        token:{
            type: Sequelize.STRING,
            allowNull: true
        },
        reset_token: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });


module.exports=Users;
