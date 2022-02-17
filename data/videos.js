// Contains all the queries for the table 'videos'
const db = require('../configuration/db')

const findAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM videos ORDER BY video_id ASC', (err, results) => {
            if (err) reject(err)
            if (results.rowCount != 0) {
                resolve(results.rows)
            } else {
                reject({error: 'No videos found.'})
            }
        })
    })
}

const findOne = (video_id) => {
    return new Promise((resolve, reject) => { 
        db.query('SELECT * FROM videos WHERE video_id = $1', [video_id], (err, results) => {
            if (err) reject(err)
            if (results.rowCount == 1) {
                resolve(results.rows[0])
            } else {
                reject({error: 'Video not found.'})
            }
        })
    })
}

const add = (title, r_u_number) => {
    return new Promise((resolve, reject) => { 
        db.query('INSERT INTO videos (title, r_u_number) VALUES ($1, $2)', [title, r_u_number], (err, results) => {
            if (err) reject(err)
            resolve({success: 'Video created.'})
        })
    })
}

const update = (title, video_id) => {
    return new Promise((resolve, reject) => { 
        db.query('UPDATE videos SET title = $1 WHERE video_id = $2', [title, video_id], (err, results) => {
            if (err) reject(err)
            resolve({success: 'Video updated.'})
        })
    })
}

const deleteOne = (video_id) => {
    return new Promise((resolve, reject) => { 
        db.query('DELETE FROM videos WHERE video_id = $1', [video_id], (err, results) => {
            if (err) reject(err)
            resolve({success: 'Video deleted.'})
        })
    })
}

module.exports = {
    findAll,
    findOne,
    add,
    update,
    deleteOne
}