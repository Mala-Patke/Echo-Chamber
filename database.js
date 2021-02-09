const { userInfo } = require('os');
const { join: joinPath } = require('path');
const db = require('better-sqlite3')(joinPath(userInfo().homedir, 'ec-save'));

db.prepare(`CREATE TABLE IF NOT EXISTS echos (
    id INTEGER PRIMARY KEY,
    timestamp DATETIME UNIQUE,
    message STRING
);`).run();

/**
 * @param {import('electron').IpcMain} ipcMain 
 */
module.exports = async (ipcMain) => {
    let id = db.prepare(`SELECT COUNT(id) FROM echos`).get()+1;
    ipcMain.on('form', async (event, message) => {
        try{
            db.prepare(`INSERT INTO echos (id, timestamp, message) VALUES (NULL, ${Date.now()}, '${message}');`).run();
            event.sender.send('dbsuccess');
        } catch (e){
            event.sender.send('dberror', e);
            console.error(e);
        }
    });
}
