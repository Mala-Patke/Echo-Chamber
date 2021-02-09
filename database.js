const { userInfo } = require('os');
const { join: joinPath } = require('path');
const { Sequelize, Model, DataTypes } = require('sequelize');

const sq = new Sequelize({
    dialect: 'sqlite',
    storage: joinPath(userInfo().homedir, 'ec-save'), 
});

class Message extends Model {}
Message.init({
    id:{
       primaryKey: true, 
       type: DataTypes.INTEGER
    },
    message: DataTypes.STRING
}, { sequelize: sq, modelName: 'message'});
sq.sync();

/**
 * @param {import('electron').IpcMain} ipcMain 
 */
module.exports = async (ipcMain) => {
    ipcMain.on('form', async (event, message) => {
        let id = (await Message.count())+1;
        Message.create({
            id, message, timestamp: Date.now()
        })
    }) 
}
