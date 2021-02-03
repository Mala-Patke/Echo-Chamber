const { ipcRenderer } = require('electron');
const $ = require('jquery');

document.getElementById('main').addEventListener('submit', event => {
    event.preventDefault();
    ipcRenderer.send('form', document.getElementById('input').innerText);
    $('#input').text('');
});

ipcRenderer.on('dbsuccess', log);
ipcRenderer.on('dberror', log);

function log(arg){
    let log = document.getElementById('log');
    if(typeof arg !== 'string') log.innerText = `Success!`
    else log.innerText = `There's been an error: ${JSON.stringify(arg)}`
    setTimeout(() => {
        log.innerText = ''
    }, 3000);
}