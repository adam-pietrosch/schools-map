const express = require('express')
const sqlite3 = require('sqlite3').verbose()

const app = express()
app.use(express.json())

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


module.exports = app