# Slim Op Sollicitatie API

An API created for the functioning of the web application '**Slim Op Sollicitatie**', a place to practice job interviews without fear or pressure. Created with the ease and efficiency of Express.js, a Node.js framework.

**[Usage](#Usage) | [Installation](#Installation) | [Prerequisites](#Prerequisites) | [FAQ](#FAQ)**

## Secret
In the `configuration` folder, create a `secret.js` file with following structure:
```js
const r_u_number = 'r_u_number'
const password = 'password'

module.exports = password
``` 

## Usage

To use this API you must make use of JSON. Below are all the possible routes and example request bodies to help you create, read, update and delete data from the used database tables: 

**[Users](#Users) | [Comments](#Comments) | [Videos](#Videos) | [Questions](#Questions)**

### Users
The table 'Users' contains data about each user, this includes their full name, business e-mail, r/u number and their role. You can update an user's name, e-mail and course.  
*Please note: for users, id means their r/u number.*
| Request (URL) | Request Type |
| ----------- | ----------- |
| Get all users (/users) | GET |
| Get user by id (/users/:id) | GET |
| Create user (/users) | POST |
| Update user (/users/:id) | PUT |
| Delete user (/users/:id) | DELETE |

**Example** usage of json to create an user:
```
{
    "r_u_nummer": "rXXXXXXX",
    "voornaam": "First name",
    "familienaam": "Last name",
    "e_mail": "example@example.com",
    "richting": "Example course"
}
```

### Comments
The table 'Comments' contains data about every comment, including the text, whether it's feedback, date, author and under which video it is. You can update a comment's text.  
*Please note: for comments, id means 'commentaar_id'.*
| Request (URL) | Request Type |
| ----------- | ----------- |
| Get all comments (/comments) | GET |
| Get comment by id (/comments/:id) | GET |
| Create comment (/comments) | POST |
| Update comment (/comments/:id) | PUT |
| Delete comment (/comments/:id) | DELETE |

**Example** usage of json to create a comment:
```
{
    "tekst": "Example comment",
    "feedback": false,
    "eigenaar": "rXXXXXXX",
    "video_id": 264
}
```

### Videos
The table 'Videos' contains data about every video, including the title, date and time, author and the server-side url to the video. You can update a video's title.  
*Please note: for videos, id means 'video_id'.*
| Request (URL) | Request Type |
| ----------- | ----------- |
| Get all videos (/videos) | GET |
| Get video by id (/videos/:id) | GET |
| Create video (/videos) | POST |
| Update video (/videos/:id) | PUT |
| Delete video (/videos/:id) | DELETE |

**Example** usage of json to create a video:
```
{
    "titel": "Example video title",
    "eigenaar_r_nummer": "rXXXXXXX"
}
```

### Questions
The table 'Questions' contains data about every question, including the question itself as its category. You can update a question's text.  
*Please note: for questions, id means 'vraag_id'.*
| Request (URL) | Request Type |
| ----------- | ----------- |
| Get all questions (/questions) | GET |
| Get question by id (/questions/:id) | GET |
| Create question (/questions) | POST |
| Update question (/questions/:id) | PUT |
| Delete question (/questions/:id) | DELETE |

**Example** usage of json to create a question:
```
{
    "vraag": "I am an example question?"
}
```

## Installation

To begin, we must set up a PostgreSQL (psql) database server. To install it, please refer to the [prerequisites](#Prerequisites). Once you have a database server configured we can begin created a schema, database and the needed tables.

In the terminal of your psql server execute the following commands to create the database and schema:

```
CREATE DATABASE dbname; (example: soc_db)
\c dbname;
CREATE SCHEMA IF NOT EXISTS solicitaties;
```
Under this schema we can create the tables we need.
Enter the following commands to create the tables:

#### Table 'gebruikers'

```
CREATE TABLE gebruikers (
   r_u_nummer SERIAL PRIMARY KEY,
   voornaam varchar(50) NOT NULL,
   familienaam varchar(50) NOT NULL,
   e_mail varchar(100) NOT NULL,
   rol varchar(7) NOT NULL,
   richting varchar(100) NOT NULL,
   table_constraints
);
```
#### Table 'commentaar'
```
CREATE TABLE commentaar (
   commentaar_id SERIAL PRIMARY KEY,
   tekst varchar(256) NOT NULL,
   feedback boolean NOT NULL,
   datum TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
   eigenaar varchar(7) NOT NULL,
   video_id integer NOT NULL,
   CONSTRAINT fk_video FOREIGN KEY (video_id) REFERENCES video(video_id)
);
```
#### Table 'video'
```
CREATE TABLE video (
   video_id SERIAL PRIMARY KEY,
   titel varchar(50) NOT NULL,
   datum TIMESTAMP WITH TIME ZONE NOT NULL,
   eigenaar_r_nummer varchar(8) NOT NULL,
   video_url varchar(256) NOT NULL
);
```
#### Table 'vragen'
```
CREATE TABLE vragen (
   vraag_id SERIAL PRIMARY KEY,
   vraag varchar(256) NOT NULL,
   categorie varchar(100) NOT NULL
);
```

It's entirely up to you to choose the data you want to insert into the database, you can do it either using a query tool or already set up the API to use that. It's time to clone the repository locally in a place of your choice using a terminal.
```
git clone https://github.com/ucll-ap-sollicitatie/backend.git name-of-folder
cd path/to/soc-backend
```
Once inside the folder, go ahead and execute the following command: **`npm install`**
This command will install all needed dependencies for the application to work leaving out the single most important one which we must install seperately, the Express.js framework (v4.17.1 or later).  
To do this simply execute the command: **`npm install express --save`** and if all went without error we can enjoy the application to the fullest with just one command: **`node app.js`**.
## Prerequisites

To start up the application you need: 
- **[npm](https://www.npmjs.com/)** (v8.5.0 or later)
- **[Node.js](https://nodejs.org/en/)** (v16.13.1 or later)
- **[PostgreSQL](https://www.postgresql.org/)** (14 or later)

To install npm and node.js please refer to a tutorial. (**[Linux](https://linuxize.com/post/how-to-install-node-js-on-ubuntu-20-04/)** | **[Windows](https://phoenixnap.com/kb/install-node-js-npm-on-windows)** | **[Mac](https://www.newline.co/@Adele/how-to-install-nodejs-and-npm-on-macos--22782681)**)

An installation guide for PostgreSQL is provided on their official **[website](https://www.postgresql.org/)**.
You may choose how to host the database server, this could be local or using a service.

## FAQ

### Some features do not work for me, why?
Some functionality may be missing due to not all files being in the repository or some functions relying on credentials not provided. 

### What query language is this application based on?
The app is made with PostgreSQL 14 in mind.

### What port does the application run on?
The app runs on 3001, this can be changed by accessing the 'app.js' file and changing the port to the desired one.  
`const port = 3001`

### What type of data does this application use?
This application strictly uses `application/json`.

### Can I use this project for my own needs?
This is made strictly for and by UC Leuven-Limburg and is not to be used outside its limits.

### Who's the mysterious person behind the team?
The one and of course, only... *Frederic Vogels*.

![UCLL](https://user-images.githubusercontent.com/55389806/154109962-3bc1cba1-6d18-4ee0-ba81-bbff7a01f369.png)
