const express = require('express');
const store = require('store');
const fs = require('fs')
const update = require('store/plugins/update');
const localStorage = require('store/storages/localStorage')
const app = express();
app.use(express.json())
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
app.listen(3000)