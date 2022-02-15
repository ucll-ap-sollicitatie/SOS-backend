# Slim Op Sollicitatie API
---
An API created for the functioning of the web application '**Slim Op Sollicitatie**', a place to practice job interviews without fear or pressure. Created with the ease and efficiency of Express.js, a Node.js framework.

[Usage](#Usage) | [Installation](#Installation) | [Prerequisites](#Prerequisites) | [FAQ](#FAQ)
## Installation
---
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
cd path/to/soc-backend**
```
Once inside the folder, go ahead and execute the following command: **`npm install`**
This command will install all needed dependencies for the application to work leaving out the single most important one which we must install seperately, the Express.js framework (v4.17.1 or later). To do this simply execute the command: **`npm install express --save`** and if all went without error we can enjoy the application to the fullest with just one command: **`node app.js`**.
## Prerequisites
---
To start up the application you need: 
- **[npm](https://www.npmjs.com/)** (v8.5.0 or later)
- **[Node.js](https://nodejs.org/en/)** (v16.13.1 or later)
- **[PostgreSQL](https://www.postgresql.org/)** (14 or later)

To install npm and node.js please refer to a tutorial.