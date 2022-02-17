const Video = require('../data/videos')

const findAll = async (req, res) => {
    let result = await Video.findAll()
    .catch((e) => {
        res.fail(e)
    })
    res.respond(result)
}

const findOne = async (req, res) => {
    const video_id = req.params.video_id
    let result = await Video.findOne(video_id)
    .catch((e) => {
        res.fail(e)
    })
    res.respond(result)
    
}

const add = async (req, res) => { 
    const {title, r_u_number} = req.body
    let result = await Video.add(title, r_u_number)
    .catch((e) => {
        res.fail(e)
    })
    res.respond(result)
}

const update = async (req, res) => {
    const video_id = req.params.video_id
    const {title} = req.body
    let result = await Video.update(title, video_id)
    .catch((e) => {
        res.fail(e)
    })
    res.respond(result)
}

const deleteOne = async (req, res) => {
    const video_id = req.params.video_id
    let result = await Video.deleteOne(video_id)
    .catch((e) => {
        res.fail(e)
    })
    res.respond(result)
}

module.exports = {
    findAll,
    findOne,
    add,
    update,
    deleteOne
}