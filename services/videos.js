// Contains all the queries for the table 'videos'
const db = require('../configuration/db')

const getAllVideos = (req, res) => {
    console.log(`Request for all videos`)
    db.query('SELECT * FROM videos ORDER BY video_id ASC', (err, results) => {
        if (err) throw err
        res.status(200).json(results.rows)
    })
}

const getVideoById = (req, res) => {
    const video_id = req.params.video_id
    console.log(`Request for video by id with id #${video_id}`)
    db.query('SELECT * FROM videos WHERE video_id = $1', [video_id], (err, results) => {
        if (err) throw err
        res.status(200).json(results.rows[0])
    })
}

const createVideo = (req, res) => {
    const {title, r_u_number} = req.body
    console.log(`Request to create video with ${title}, ${r_u_number}`)
    db.query('INSERT INTO videos (title, r_u_number) VALUES ($1, $2)', [title, r_u_number], (err, results) => {
        if (err) throw err
        res.status(200).send(`Video created with title: ${title} by ${r_u_number}`)
    })
}

const updateVideo = (req, res) => {
    const video_id = req.params.video_id
    const {title} = req.body
    console.log(`Request to update video with id #${video_id} and ${title}`)
    db.query('UPDATE videos SET title = $1 WHERE video_id = $2', [title, video_id], (err, results) => {
        if (err) throw err
        res.status(200).send(`Video #${video_id} has been updated to ${title}`)
    })
}

const deleteVideo = (req, res) => {
    const video_id = req.params.video_id
    console.log(`Request to delete video with id #${video_id}`)
    db.query('DELETE FROM videos WHERE video_id = $1', [video_id], (err, results) => {
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