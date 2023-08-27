const express = require('express')
const Router = express.Router()

const { getList, newList, updateList, removeList, setDoneList } = require('../controller/listController')

Router.get('/getList', getList)
Router.get('/getList/:search', getList)
Router.post('/newList', newList)
Router.put('/updateList', updateList)
Router.delete('/removeList/:id', removeList)
Router.patch('/setDoneList', setDoneList)

module.exports = Router