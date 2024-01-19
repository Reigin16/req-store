const express = require('express');
const store = require('store');
const fs = require('fs')
const cors = require('cors')
const update = require('store/plugins/update');
const localStorage = require('store/storages/localStorage')
const app = express();
app.use(express.json())
app.use(cors())
store.addPlugin(update)
store.createStore(localStorage)
app.post('/', (req, res) => {
    let {data, updatedAt} = req.body
    store.set('data', {data: data, updatedAt: updatedAt})

    fs.writeFileSync('data.json', JSON.stringify(store.get('data')));

    res.status(200).json({message: "success", updatedAt: updatedAt})
    console.log("Updated at", updatedAt )
})
app.get('/', (req, res) => {
    let output = JSON.parse(fs.readFileSync('data.json'));
    res.status(200).json(output)
})
app.post('/data', async(req, res) => {

    let data = req.body
    console.log(data)
    res.header('Access-Control-Allow-Origin', '*')
    fs.writeFileSync('data.json', JSON.stringify(data))
    return res.status(200).json({success: true, message: "Data changed"})
})
app.get('/data', (req, res) => {
    let output = fs.readFileSync('data.json')
    res.header('Access-Control-Allow-Origin', '*')
    res.status(200).json({success: true, data: JSON.parse(output)})
})



app.listen(8000)