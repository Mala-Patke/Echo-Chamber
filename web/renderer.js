const { ipcRenderer } = require('electron');
const $ = require('jquery');

document.getElementById('main').addEventListener('submit', event => {
    event.preventDefault();
    
    let value = document.getElementById('input').value;
    if(!value.length) return;
    ipcRenderer.send('form', value);

    $('#input').val('');

    let submit = $('#submit').addClass('disabled');
    setTimeout(() => {
        submit.removeClass('disabled');
        $('#input').val('');
    }, 3000);
});

document.getElementById('input').addEventListener('keyup', () => {
    document.getElementById('count').innerText = 500 - document.getElementById('input').value.length;
});

document.getElementById('input').addEventListener('focus', event => event.preventDefault());

ipcRenderer.on('dbsuccess', log);
ipcRenderer.on('dberror', log);

function log(arg){
    let log = document.getElementById('log');
    if(typeof arg !== 'string') log.innerText = `Success!`
    else log.innerText = `There's been an error: ${JSON.stringify(arg)}`
    setTimeout(() => {
        log.innerText = '';
    }, 3000);
}