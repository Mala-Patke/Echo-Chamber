window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('username').innerText = require('os').userInfo().username
});