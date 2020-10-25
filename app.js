const http = require('http')
const mariadb = require('mariadb');
const fs = require('fs')
const port = 3000
const pool = mariadb.createPool({
    host: 'localhost',
    port: '3306',
    database: 'sandro', 
    user:'root', 
    password: 'password',
    connectionLimit: 5
});
pool.getConnection()
    .then(conn => {
    
      conn.query("SELECT * FROM texto")
        .then((rows) => {
          var about = JSON.stringify(rows[0]).substr(6,997);
          console.log('The following text will be added to index.html')
          console.log(about)
          //document.getElementById('About').innerHTML = about;
        })
        .catch(err => {
          //handle error
          console.log(err); 
          conn.end();
        })
        
    }).catch(err => {
      //not connected
    });
const server = http.createServer(function(req, res){
 res.writeHead(200, {'Content-Type': 'text/html'})
 fs.readFile('index.html',function(error,data){
     if(error){
         res.writeHead(404)
         res.write('Error: File Not Found')
     }else{
         res.write(data)
     }
     res.end()
 })
})

server.listen(port, function(error){
    if(error){
        console.log('Something Went Wrong', error)
    } else {
        console.log('Server Active and Listening on Port '+port)
    }
})