# Slim Op Sollicitatie API

An API created for the functioning of the web application '**Slim Op Sollicitatie**', a place to practice job interviews without fear or pressure. Created with the ease and efficiency of Express.js, a Node.js framework.

**[Usage](#Usage) | [Installation](#Installation) | [Prerequisites](#Prerequisites) | [FAQ](#FAQ) | [Secret](#Secret)**

## Usage

To use this API you must make use of JSON. Below are all the possible routes and example request bodies to help you create, read, update and delete data from the used database tables:

**[Users](#Users) | [Comments](#Comments) | [Videos](#Videos) | [Questions](#Questions) | [Formations](#Formations) | [Roles](#Roles) | [Categories](#Categories)**

### Users

The table 'Users' contains data about each user, this includes their full name, business e-mail, r/u number and their role. You can update an user's name, e-mail and course.  
_Please note: for users, id means their r/u number._
| Request (URL) | Request Type |
| ----------- | ----------- |
| Get all users (/users) | GET |
| Get user by id (/users/:id) | GET |
| Get user by email (/users/email/:id) | GET |
| Create user (/users) | POST |
| Update user (/users/:id) | PUT |
| Delete user (/users/:id) | DELETE |

**Example** usage of json to create an user:

```
{
    "r_u_number": "rXXXXXXX",
    "name": "First name",
    "surname": "Last name",
    "email": "example@example.com",
    "role_id": "1"
    "formation_id": "1"
}
```

### Comments

The table 'Comments' contains data about every comment, including the text, whether it's feedback, date, author and under which video it is. You can update a comment's text.  
_Please note: for comments, id means 'comment_id'._
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
_Please note: for videos, id means 'video_id'._
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
    "title": "Example video title",
    "r_u_number": "rXXXXXXX"
}
```

### Questions

The table 'Questions' contains data about every question, including the question itself as its category. You can update a question's text.  
_Please note: for questions, id means 'question_id'._
| Request (URL) | Request Type |
| ----------- | ----------- |
| Get all questions (/questions) | GET |
| Get question by id (/questions/:id) | GET |
| Create question (/questions) | POST |
| Update question (/questions/:id) | PUT |
| Delete question (/questions/:id) | DELETE |
| Get all questions based on category (/questions/category/:question_category_id) | GET |

**Example** usage of json to create a question:

```
{
    "vraag": "I am an example question?"
}
```

### Formations

The table 'Formations' contains data about every formation.  
_Please note: for formations, id means 'formation_id'._
| Request (URL) | Request Type |
| ----------- | ----------- |
| Get all formations (/fomrations) | GET |
| Get formation by id (/formations/:id) | GET |
| Get formation by name (/formations/name/:name) | POST |

### Roles

The table 'Roles' is a table that simply contains all the possible roles for authorization.
| Request (URL) | Request Type |
| ----------- | ----------- |
| Get all roles (/roles) | GET |

### Categories

The table 'Categories' contains data about question categories.
_Please note: for categories, id means 'question_category_id'._
| Request (URL) | Request Type |
| ----------- | ----------- |
| Get all categories (/question-questions) | GET |
| Get category by id (/question-questions/:id) | GET |
| Get category by name (/question-questions/category/:category) | GET |
| Create category (/question-questions) | POST |

**Example** usage of json to create a question:

```
{
    "category": "example-category"
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

#### Table 'roles'

```
CREATE TABLE roles (
   role_id SERIAL PRIMARY KEY,
   role varchar(8) not NULL DEFAULT 'student'
);
```

#### Table 'formations'

```
CREATE TABLE formations (
   formation_id SERIAL PRIMARY KEY,
   formation varchar(128) NOT NULL
);
```

#### Table 'users'

```
CREATE TABLE users (
   r_u_number varchar(8) PRIMARY KEY,
   name varchar(50) NOT NULL,
   surname varchar(50) NOT NULL,
   email varchar(100) NOT NULL,
   photo_url varchar(512) NOT NULL DEFAULT 'temp_link',
   hashed_password varchar(512) NOT NULL DEFAULT 't',
   role_id integer NOT NULL,
   formation_id integer NOT NULL,
   CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(role_id),
   CONSTRAINT fk_formation FOREIGN KEY (formation_id) REFERENCES formations(formation_id)
);
```

#### Table 'videos'

```
CREATE TABLE videos (
   video_id SERIAL PRIMARY KEY,
   title varchar(50) NOT NULL,
   date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
   video_url varchar(256) NOT NULL,
   r_u_number varchar(8) NOT NULL,
   CONSTRAINT fk_user FOREIGN KEY (r_u_number) REFERENCES users(r_u_number)
);
```

#### Table 'comments'

```
CREATE TABLE comments (
   comment_id SERIAL PRIMARY KEY,
   text varchar(256) NOT NULL,
   feedback boolean NOT NULL,
   date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
   author varchar(8) NOT NULL,
   video_id integer NOT NULL,
   CONSTRAINT fk_video FOREIGN KEY (video_id) REFERENCES videos(video_id)
);
```

#### Table 'question_categories'

```
CREATE TABLE question_categories (
   question_category_id SERIAL PRIMARY KEY,
   category varchar(100) NOT NULL
);
```

#### Table 'questions'

```
CREATE TABLE questions (
   question_id SERIAL PRIMARY KEY,
   question varchar(256) NOT NULL,
   question_category_id integer NOT NULL,
   CONSTRAINT fk_category FOREIGN KEY (question_category_id) REFERENCES question_categories(question_category_id)
);
```

It's entirely up to you to choose the data you want to insert into the database, you can do it either using a query tool or already set up the API to use that. Here are some examples:

```
insert into formations (formation) values('Toegepaste informatica');
insert into users(r_u_number, name, surname, email, role_id, formation_id) values('r0000001', 'Test', 'User', 'test@test.com', 1, 1);
```

It's time to clone the repository locally in a place of your choice using a terminal.

```
git clone https://github.com/ucll-ap-sollicitatie/backend.git name-of-folder
cd path/to/soc-backend
```

Once inside the folder, go ahead and execute the following command: **`npm install`**
This command will install most needed dependencies for the application to work leaving out a few that need to be installed manually, this includes the single most important one: Express.js (v4.17.1 or later).  
To do this simply execute these commands one after another:

```
npm install express --save
npm install cors --save
npm install express-response-helper --save
npm install express-session --save
npm install helmet --save
npm install cloudinary --save
npm install formidable --save
```

and if all went without error we can enjoy the application to the fullest with just one command: **`node app.js`**.

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
DATABASE_USER=database_user
DATABASE_PASS=database_password
CLOUDINARY_NAME=cloudinary_name
CLOUDINARY_API=cloudinary_api
CLOUDINARY_SECRET=cloudinary_secret
SENDGRID_API_KEY=sendgrid_api_key
```
