const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'localhost',
    port: '3306',
    database: 'sandro', 
    user:'root', 
    password: 'password',
    connectionLimit: 5
});
var about;
console.log('Todo chido');
pool.getConnection()
    .then(conn => {
    
      conn.query("SELECT * FROM texto")
        .then((rows) => {
          about = JSON.stringify(rows[0]).substr(6,997);
          ach = JSON.stringify(rows[1]).substr(6,375);
          console.log(about)
          console.log(ach)
          document.getElementById("About").innerText = about;
          document.getElementById("ach").innerHTML =ach;
        })
        .then((res) => {
          //console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
          conn.end();
        })
        .catch(err => {
          //handle error
          console.log(err); 
          conn.end();
        })
        
    }).catch(err => {
      //not connected
    });
