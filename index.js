const express = require('express');
const store = require('store');
const update = require('store/plugins/update');
const localStorage = require('store/storages/localStorage')
const app = express();
app.use(express.json())
store.addPlugin(update)
store.createStore(localStorage)
app.post('/', (req, res) => {
    let {data, updatedAt} = req.body
    store.set('data', {data, updatedAt})
    res.status(200).json({message: "success", updatedAt: updatedAt})
    console.log("Updated at", updatedAt )
})
app.get('/', (req, res) => {
    let output = store.get('data')
    res.status(200).json(output)
})
app.listen(3000)