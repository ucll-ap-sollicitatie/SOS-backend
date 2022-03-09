# Slim Op Sollicitatie API

An API created for the functioning of the web application '**Slim Op Sollicitatie**', a place to practice job interviews without fear or pressure. Created with the ease and efficiency of Express.js, a Node.js framework.

_Please be advised: We refer to multiple files in a different repository to make this guide more readable. The other repository is nothing more than a supplementary place which holds files that help us reduce clutter in this guide._

**[Usage](#Usage) | [Installation](#Installation) | [Prerequisites](#Prerequisites) | [FAQ](#FAQ) | [Secret](#Secret)**

## Usage

To use this API you must make use of JSON and apply a 'x-api-key' header to all of your requests, with the value being the api key you produce and save in your [.env](#Secret) file.

Click [here](https://github.com/ucll-ap-sollicitatie/database-scripts/blob/main/REQUESTS.md) to view all possible routing. For exemplary json requests, please view our exported Postman compilations.

## Installation

To begin, we must set up a PostgreSQL (psql) database server. To install it, please refer to the [prerequisites](#Prerequisites). Once you have a database server configured we can begin created a schema, database and the needed tables.

In the terminal of your psql server execute the following commands to create the database and schema:

```
CREATE DATABASE dbname; (example: soc)
\c dbname;
CREATE SCHEMA IF NOT EXISTS solicitaties;
```

Under this schema we can create the tables we need.
All 'CREATE TABLE' queries are listed in [this](https://github.com/ucll-ap-sollicitatie/database-scripts/blob/main/TABLES.md) file.

It's entirely up to you to choose the data you want to insert into the database, you can do it either using a query tool or already set up the API to use that. For examples and sample data, go [here](https://github.com/ucll-ap-sollicitatie/database-scripts/blob/main/INSERTS.md).

It's time to clone the repository locally in a place of your choice using a terminal.

```
git clone https://github.com/ucll-ap-sollicitatie/backend.git desired-name-of-directory
cd path/to/soc-backend
```

Once inside the folder, go ahead and execute the following command: **`npm install`**.
This command will install most needed dependencies for the application to work leaving out a few that need to be installed manually, this includes the single most important one: **Express.js (v4.17.1 or later)**.  
To do this simply execute this command:

```
npm install
```

and if all went without error we can enjoy the application to the fullest with just one command: **`npm run dev`**.

**`npm run start`** is the command you want to use in a production environment.

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

The one and of course, only... _Frédéric Vogels_.

![UCLL](https://user-images.githubusercontent.com/55389806/154109962-3bc1cba1-6d18-4ee0-ba81-bbff7a01f369.png)

## Secret

In the root of the application, create a `.env` file with following content:

```
DATABASE_USER=your_database_username
DATABASE_PASS=your_database_password
DATABASE_HOST=your_database_address
DATABASE_DB=your_database_name

[Following 3 entries are only if you use cloudinary]
--------------------------------------------------------
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_secret_key
--------------------------------------------------------

[Following entry is if you use Sendgrid as your SMTP service
--------------------------------------------------------
SENDGRID_API_KEY=your_sendgrid_api_key
--------------------------------------------------------

FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:3001
API_ALLOW_HOST=localhost
API_KEY=[sha512 encryption of your own choice]
```
