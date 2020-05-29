const express = require('express');
const shortid = require('shortid');

const server = express();

server.use(express.json())


let hubs = [];
let lessons = [];

server.get('/', (req, res) => {
    res.json({message: 'Hello Jordan!!'});
});

/////POST/////
server.post('/api/hubs', (req,res) => {
    const hubInfo = req.body;
    

    hubInfo.id = shortid.generate();
    hubs.push(hubInfo);

    res.status(201).json(hubInfo); 
})

/////READ-GET/////
server.get('/api/hubs', (req,res) => {
    res.status(200).json(hubs)
})

/////DELETE/////
server.delete('/api/hubs/:id', (req,res) => {
    const {id} = req.params;
    const found = hubs.find(hub => hub.id == id)

    if (found) {
        hubs = hubs.filter(hub => hub.id !== id)
        res.status(200).json({message: `Deleted id: ${id}` })
    }else{
        res.status(404).json({message: `hub id: ${id} not found`})
    }
})

/////UPDATE/////
server.put('/api/hubs/:id', (req,res) => {
    const {id} = req.params;
    const changes = req.body;

    let index = hubs.findIndex(hub => hub.id === id); 

    if (index !== -1){
        changes.id = id;
        hubs[index] = changes;
        res.status(200).json(hubs[index]);
    }else{
        res.status(404).json({message: `Sorry id: ${id} not found`})
    }
})

/////UPDATE/PATCH/////
server.patch('/api/hubs/:id', (req,res) => {
    const {id} = req.params;
    const changes = req.body

    let found = hubs.find(hub => hub.id === id);

    if (found){
        Object.assign(found, changes);
        res.status(200).json(found);
    }else{
        res.status(404).json({message: `Sorry id: ${id} not found`}) 
    } 
}) 

//----------------------------------------------------------------------
const PORT = 5000;

server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});


