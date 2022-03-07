// Contains all the queries for the table 'videos'
require("dotenv").config();
const { db, cloudinary, queryHelpers, fs, resolve } = require("./index");

const findAll = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT v.video_id, v.title, v.date, v.video_url, v.email, v.description, v.private, v.user_id, u.name, u.surname, count(l.email) as likes 
      FROM videos v 
      inner join users u using(email) 
      LEFT JOIN liked_videos l USING(video_id) 
      GROUP BY video_id, name, surname`,
      (err, results) => {
        queryHelpers.handleQuery(resolve, reject, err, results);
      }
    );
  });
};

const findAllByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT v.video_id, v.title, v.date, v.video_url, v.email, v.description, v.private, u.user_id, u.name, u.surname FROM videos v INNER JOIN users u USING(email) WHERE v.email = $1 ORDER BY video_id DESC",
      [email],
      (err, results) => {
        queryHelpers.handleQuery(resolve, reject, err, results);
      }
    );
  });
};

const findOneByEmailAndTitle = (email, title) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT v.video_id, v.title, v.date, v.video_url, v.email, v.description, v.private, u.user_id, u.name, u.surname FROM videos v INNER JOIN users u USING(email) WHERE v.email = $1 AND v.title = $2 ORDER BY video_id DESC",
      [email, title],
      (err, results) => {
        queryHelpers.handleQuery(resolve, reject, err, results);
      }
    );
  });
};

const findAllPublicByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT v.video_id, v.title, v.date, v.video_url, v.email, v.description, v.private, u.user_id, u.name, u.surname FROM videos v INNER JOIN users u USING(email) WHERE v.email = $1 AND private = false",
      [email],
      (err, results) => {
        queryHelpers.handleQuery(resolve, reject, err, results);
      }
    );
  });
};

const findOne = (video_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT v.video_id, v.title, v.date, v.video_url, v.email, v.description, v.private, v.user_id, u.name, u.surname, count(l.email) as likes FROM videos v inner join users u using(email) LEFT JOIN liked_videos l USING(video_id) WHERE video_id = $1 GROUP BY video_id, name, surname",
      [video_id],
      (err, results) => {
        queryHelpers.handleQueryOne(resolve, reject, err, results);
      }
    );
  });
};

const add = (title, user_id, email, description, videoUrl, private) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO videos (title, user_id, email, description, video_url, private) VALUES ($1, $2, $3, $4, $5, $6)",
      [title, user_id, email, description, videoUrl, private],
      (err, results) => {
        queryHelpers.handleQueryAdd(resolve, reject, err, "Video");
      }
    );
  });
};

const uploadVideo = (video_file, user_id) => {
  return cloudinary.v2.uploader.upload(video_file.tempFilePath, {
    resource_type: "auto",
    public_id: `SOS/${user_id}/${video_file.name}`,
  });
};

const uploadSubtitles = (subtitles, video_file, user_id) => {
  fs.writeFile("tmp/subtitles.srt", subtitles, (err) => {
    if (err) throw err;
  });
  return cloudinary.v2.uploader.upload(`tmp/subtitles.srt`, {
    resource_type: "raw",
    public_id: `SOS/${user_id}/${video_file.name}.srt`,
  });
};

const update = (title, description, private, video_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE videos SET title = $1, description = $2, private = $3 WHERE video_id = $4 RETURNING video_id",
      [title, description, private, video_id],
      (err, results) => {
        queryHelpers.handleQueryUpdate(resolve, reject, err, "Video");
      }
    );
  });
};

const deleteOne = (video_id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM videos WHERE video_id = $1 RETURNING video_id", [video_id], (err, results) => {
      queryHelpers.handleQueryDelete(resolve, reject, err, "Video");
    });
  });
};

const deleteAllByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM videos WHERE email = $1", [email], (err, results) => {
      queryHelpers.handleQueryDelete(resolve, reject, err, "Video");
    });
  });
};

const likeVideo = (email, video_id) => {
  return new Promise((resolve, reject) => {
    db.query("INSERT INTO liked_videos(email, video_id) values ($1, $2)", [email, video_id], (err, results) => {
      queryHelpers.handleQueryAdd(resolve, reject, err, "Like to video");
    });
  });
};

const unlikeVideo = (email, video_id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM liked_videos WHERE email = $1 AND video_id = $2", [email, video_id], (err, results) => {
      queryHelpers.handleQueryDelete(resolve, reject, err, "Like from video");
    });
  });
};

const checkVideoLike = (video_id, email) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * from liked_videos WHERE video_id = $1 AND email = $2", [video_id, email], (err, results) => {
      queryHelpers.handleQuery(resolve, reject, err, results);
    });
  });
};

const deleteAllVideoLikesByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM liked_videos WHERE email = $1 RETURNING video_id", [email], (err, results) => {
      queryHelpers.handleQueryDelete(resolve, reject, err, "Likes from videos");
    });
  });
};

const deleteVideo = (video_id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM videos WHERE video_id = $1`, [video_id], (err, results) => {
      queryHelpers.handleQueryDelete(resolve, reject, err, "Delete video");
    });
  });
};

const deleteAllVideoLikesByVideo = (video_id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM liked_videos WHERE video_id = $1 RETURNING video_id", [video_id], (err, results) => {
      queryHelpers.handleQueryDelete(resolve, reject, err, "Likes from videos");
    });
  });
};

const deleteCloudinary = (title, user_id) => {
  return cloudinary.v2.uploader.destroy(`SOS/${user_id}/${title}`, { resource_type: "video" }, function (error, result) {
    console.log(result, error);
  });
};

const deleteSubtitles = (title, user_id) => {
  return cloudinary.v2.uploader.destroy(`SOS/${user_id}/${title}.srt`, { resource_type: "raw" }, function (error, result) {
    console.log(result, error);
  });
};

const updateCloudinary = (old_title, new_title, user_id) => {
  return cloudinary.v2.uploader.rename(
    `SOS/${user_id}/${old_title}`,
    `SOS/${user_id}/${new_title}`,
    { resource_type: "video" },
    function (error, result) {
      console.log(result, error);
    }
  );
};

const updateSubtitles = (old_title, new_title, user_id) => {
  return cloudinary.v2.uploader.rename(
    `SOS/${user_id}/${old_title}.srt`,
    `SOS/${user_id}/${new_title}.srt`,
    { resource_type: "raw" },
    function (error, result) {
      console.log(result, error);
    }
  );
};

module.exports = {
  findAll,
  findAllByEmail,
  findAllPublicByEmail,
  findOne,
  add,
  update,
  deleteOne,
  deleteAllByEmail,
  uploadVideo,
  uploadSubtitles,
  likeVideo,
  unlikeVideo,
  checkVideoLike,
  deleteAllVideoLikesByEmail,
  updateCloudinary,
  updateSubtitles,
  deleteVideo,
  deleteCloudinary,
  deleteSubtitles,
  deleteAllVideoLikesByVideo,
  findOneByEmailAndTitle,
};
