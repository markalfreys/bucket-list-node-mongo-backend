const mongoose = require('mongoose')
const List = require('../models/List')

const getList = async (req, res) => {
    try {
        
        const { search } = req.params
        
        var options = search ? { $or: [ {status: 'Pending'}, { status: 'Done' } ], item: new RegExp(`${search}`, 'i') } 
                                : { $or: [ {status: 'Pending'}, { status: 'Done' } ] }

        var list = await List.find(options).sort({ status: -1, updatedAt: -1, createdAt: -1  })

        return res.status(200).json({ success: true, data: list || [] })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, data: 'Internal Servel Error!' })
    }
}

const newList = (req, res) => {
    try {
        const { item } = req.body

        if(!item) return res.status(400).json({ success: false, data: 'No item found!' })
       
        const newItem = new List({ item })
        
        newItem.save().then((inserted => {
            return res.status(200).json({ success: true, data: inserted })
        }))

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, data: 'Internal Servel Error!' })
    }
}

const updateList = async (req, res) => {
    try {

        const { item, id } = req.body

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, data: 'Invalid Id!' });

        const updateItem = await List.findByIdAndUpdate(id, { item });

        updateItem.item = item
        return res.status(200).json({ success: true, data: updateItem })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, data: 'Internal Servel Error!' })
    }
}

const removeList = async (req, res) => {
    try {
        const id = JSON.parse(req.params.id)

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, data: 'Invalid Id!' });

        const deleteItem = await List.findByIdAndRemove(id);

        return res.status(200).json({ success: true, data: id })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, data: 'Internal Servel Error!' })
    }
}

const setDoneList = async (req, res) => {
    try {
        const { id } = req.body

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, data: 'Invalid Id!' });

        var doneItem = await List.findByIdAndUpdate(id, { status: 'Done' });
        
        doneItem.status = 'Done'
        return res.status(200).json({ success: true, data: doneItem })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, data: 'Internal Servel Error!' })
    }
}

module.exports = { getList, newList, updateList, removeList, setDoneList }