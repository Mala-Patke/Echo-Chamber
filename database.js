const { userInfo } = require('os');
const { join: joinPath } = require('path');
const Datastore = require('nedb-promises');

const userData = Datastore.create({
    filename:joinPath(userInfo().homedir, 'ec-save'),
    autoload:true
});

/**
 * @param {import('electron').IpcMain} ipcMain 
 */
module.exports = (ipcMain) => {
    ipcMain.on('form', async (event, input) => {
        let _id = await userData.count({}).catch(err => event.sender.send('dberror', err))
        await userData.insert({
            _id:_id+1,
            timestamp: Date.now(),
            input
        }).catch(err => event.sender.send('dberror', err))
        event.sender.send('dbsuccess')
    })

    ipcMain.on('readrequest', async(event, type, value) => {
        let obj = Object.defineProperty({}, type, {
            value: value,
            writable: true
        });
        let res = await userData.findOne(obj);
        event.sender.send('found', res);
    })
}