const express = require('express')
const sqlite3 = require('sqlite3').verbose()

const app = express()
app.use(express.json())

// example for admin credentials
const adminEmail = 'admin@example.com'
const adminHashPassword = '8C6976E5B5410415BDE908BD4DEE15DFB167A9C873FC4BB8A81F6F2AB448A918'

var adminLoggedIn = false


let db = new sqlite3.Database(String.raw`C:\DEVELOPMENT\vue.js\schools-map\api\db\database.db`, (err) => {
    if (err) {
     return console.error(err.message + ' - fail');
    }
    console.log('Connected to the database.');
})

app.get('/school', async (req, res) => {
  db.all('SELECT * FROM skola', (err, rows) => {
    if (err) console.log('fail')
    //console.log(row)
    res.json(rows)
  })
  

})

app.get('/city', async (req, res) => {
  db.all('SELECT * FROM mesto', (err, rows) => {
    if (err) console.log('fail')
    //console.log(row)
    res.json(rows)
  })
})

app.get('/accepted', async (req, res) => {
  db.all('SELECT * FROM pocet_prijatych', (err, rows) => {
    if (err) console.log('fail')
    //console.log(row)
    res.json(rows)
  })
})
  
app.get('/field', async (req, res) => {
  db.all('SELECT * FROM obor', (err, rows) => {
    if (err) console.log('fail')
    //console.log(row)
    res.json(rows)
  })
  
})

/*
app.post('/login', async (req, res) => {
  if (adminLoggedIn) return res.send('Už jste přihlášen!')

  const email = req.body.email
  const password = req.body.password

  if (email != adminEmail) return res.send('Špatný email!')
  if (password != adminHashPassword) return res.send('Špatné heslo!')

  adminLoggedIn = true
  res.send('success')
})

app.get('/logout', async (req, res => {
  adminLoggedIn = false
  res.send('Jste odhlášen!')
}))

app.get('/logged', async (req, res) => {
  res.send(adminLoggedIn)
})
*/

module.exports = app