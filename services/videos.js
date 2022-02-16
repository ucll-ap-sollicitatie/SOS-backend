// Contains all the queries for the table 'videos'
const db = require('../configuration/db')

const getAllVideos = (req, res) => {
    console.log(`Request for all videos`)
    db.query('SELECT * FROM video ORDER BY video_id ASC', (err, results) => {
        if (err) throw err
        res.status(200).json(results.rows)
    })
}

const getVideoById = (req, res) => {
    const video_id = req.params.video_id
    console.log(`Request for video by id with id #${video_id}`)
    db.query('SELECT * FROM video WHERE video_id = $1', [video_id], (err, results) => {
        if (err) throw err
        res.status(200).json(results.rows)
    })
}

const createVideo = (req, res) => {
    const {titel, eigenaar_r_nummer} = req.body
    console.log(`Request to create video with ${titel}, ${eigenaar_r_nummer}`)
    db.query('INSERT INTO video (titel, eigenaar_r_nummer) VALUES ($1, $2)', [titel, eigenaar_r_nummer], (err, results) => {
        if (err) throw err
        res.status(200).send(`Video created with title: ${titel} by ${eigenaar_r_nummer}`)
    })
}

const updateVideo = (req, res) => {
    const video_id = req.params.video_id
    const {titel} = req.body
    console.log(`Request to update video with id #${video_id} and ${titel}`)
    db.query('UPDATE video SET titel = $1 WHERE video_id = $2', [titel, video_id], (err, results) => {
        if (err) throw err
        res.status(200).send(`Video #${video_id} has been updated to ${titel}`)
    })
}

const deleteVideo = (req, res) => {
    const video_id = req.params.video_id
    console.log(`Request to delete video with id #${video_id}`)
    db.query('DELETE FROM video WHERE video_id = $1', [video_id], (err, results) => {
        if (err) throw err
        res.status(200).send(`Comment deleted with id: ${video_id}`)
    })
}

module.exports = {
    getAllVideos,
    getVideoById,
    createVideo,
    updateVideo,
    deleteVideo
}