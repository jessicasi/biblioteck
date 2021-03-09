const express = require('express')
const path = require('path')
const { Pool } = require('pg');
const PORT = process.env.PORT || 5000
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});


const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))


app.post(function (req, res, next) {
  next();
});




// async function () {
//   let response = await fetch('/math_service')
//   let responseJson = await response.json()
//   let fromServer = responseJson.myString
//   alert(fromServer)
// }
// app.get(fetch('/results')
//   .then(response => response.json())
//   .then(data => console.log(data));


//   componentWillMount: function(){
//     var fromServer = fetch('/results')
//     .then(function(response) {
//       return response.json()
//     })
//     .then(function(responseJson) {

//       return responseJson.myString
//     })

//     alert(fromServer);

//   },

app.listen(PORT, () => console.log(`Listening on ${PORT}`))




