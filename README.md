# LRTH06 MERN Template

This is the framework for an advanced, modern REST API.
Everything is ready for you, just install the base application and front end, set environment variables, and you are off to the races!

> Thanks for taking interest in my project, hope you enjoy and feel free to submit any feedback/requests! -Toby Hagan

## Pre-Requisite Accounts

| Requirement           | Paid ?                                       |
| --------------------- | -------------------------------------------- |
| MongoDB Atlas Account | Free Tier Available (No CC Required)         |
| Heroku Account        | Free Tier Available (No CC With Limitations) |
| Amazon AWS Account    | Free Tier Available (CC Required)            |

## Pre-Requisite Technologies

| Technology | To Download                     |
| ---------- | ------------------------------- |
| NPM        | https://nodejs.org/en/download/ |

_*Tip:*_ To install Yarn Package Manager, run:

```
npm install -g yarn
```

## To Install and Run

Using Yarn:

```
git clone https://github.com/lrth06/react-template.git
cd react-template
yarn install
yarn install-frontend
```

Using NPM:

```
git clone https://github.com/lrth06/react-template.git
cd react-template
npm install
npm run install-frontend
```

#### Set Environment Variables

_Make a .env File in the Root Directory and Set the Following Variables:_

```
MONGO_URI      = <Your MongoDB connection URI>
TOKEN_SECRET   = <A Secret you Assign for JWT Authentication>
S3_ACCESS      = <Your S3 Access Key>
S3_KEY_ID      = <Your S3 Access Key ID>
S3_BUCKET      = <The Name of your S3 Bucket>
MAIL_SENDER    = <This will be where all administration emails will originate from, e.g. admin@testwebsite.com>
MAIL_RECIPIENT = <This is where you want contact emails etc to be directed e.g. owner@testwebsite.com>
MAIL_PASSWORD  = <This is the SMTP password required to remotely send E-mail>
MAIL_HOST      = <This is the host for your SMTP e.g. testwebsite.com>

```

#### To run _only_ the Backend Server

```
yarn server
```

#### To Run _only_ the Frontend Server

```
yarn client
```

#### To run _*BOTH*_ Servers Concurrently

```
yarn dev
```

### Technologies Used

At its core this is a MERN (MongoDB, ExpressJs, ReactJs, NodeJs) application.
There are also some other tricks under the hood, such as utilizing AWS S3 buckets for image storage, and JWT(Json Web Tokens) for authenticatiion.

## Backend

This is where the rest API powered by ExpressJS lives, endpoints are active beingly added, the status of which are listed in detail below. All endpoints will be prepended with the following BaseURL ('http://localhost://5000/api/'). Sending a get request to this endpoint will return a text response simply stating that you are at the API Home.

### Backend Completion Status

#### User Endpoints ('/users') (<http://localhost:5000/api/users>)

| Completed ?        | Method | Endpoint | Action                     | Access Control |
| ------------------ | ------ | -------- | -------------------------- | -------------- |
| :heavy_check_mark: | POST   | '/'      | Registers a New User       | _Public_       |
| :heavy_check_mark: | POST   | '/login' | Logs a User in             | _Public_       |
| :x:                | GET    | '/'      | Returns All Users          | _Admin_        |
| :x:                | PUT    | '/:id'   | Modify a Single User by ID | _Protected_    |
| :x:                | DELETE | '/:id'   | Delete a Single User By ID | _Protected_    |

##### Endpoint Details

- POST ('/register') _Public_ This endpoint takes in the following fields in JSON format

       - name
       - email
       - password

This will create a new user instance in the database, and return basic user info such as the default administration level (not admin) as well as the user's dynamically generated ID, and the username they provided.

- POST ('/login') _Public_ This endpoint takes in the following fields in JSON format

       - email
       - password

This will verify the entered password against the user password in the database (which has been encrypted upon registration) and returns the user's JWT as well as the information returned upon registration.

### Posts

| Completed ?        | Method | Endpoint | Action                     | Access Control |
| ------------------ | ------ | -------- | -------------------------- | -------------- |
| :heavy_check_mark: | POST   | '/'      | Create New Post            | _Public_       |
| :heavy_check_mark: | GET    | '/'      | Get All Posts              | _Public_       |
| :heavy_check_mark: | GET    | '/:id'   | Get Single Post By ID      | _Protected_    |
| :x:                | PUT    | '/:id'   | Modify Single Post By ID   | _Protected_    |
| :x:                | DELETE | '/:id'   | Delete a Single Post By ID | _Protected_    |

##### Endpoint Details

- POST ('/') _Public_ This Endpoiunt Takes in the following fields in JSON format

       - user
       - title
       - subject
       - content
       - image (only accepts location string)

- GET ('/') Returns all posts

- GET ('/:id') _Protected_ This endpoint will return a single post which has an ID matching the request's "id" paramater.

#### Upload Endpoints ('/contact/) (<http://localhost:5000/api/upload>)

| Completed ?        | Method | Endpoint | Action                  | Access Control |
| ------------------ | ------ | -------- | ----------------------- | -------------- |
| :heavy_check_mark: | POST   | '/'      | Uploads image to AWS S3 | _Protected_    |

##### Endpoint Details

- POST ('/') _Public_ This endpoint takes in a file and filters by mimetype, currently allowed mimetypes are jpg|jpeg|png

#### Contact Endpoints ('/contact/) (<http://localhost:5000/api/contact>)

| Completed ?        | Method | Endpoint | Action                   | Access Control |
| ------------------ | ------ | -------- | ------------------------ | -------------- |
| :heavy_check_mark: | POST   | '/'      | Sends Mail to Site Admin | _Public_       |

##### Endpoint Details

- POST ('/') _Public_ This endpoint takes in the following fields in JSON format

       - name
       - email
       - content

This will utilize Nodemailer to send a message to the address you assigned as MAIL_RECIPIENT above, and sets the REPLY-TO field of the sent email, to that of the user who has sent the contact.

### Test Endpoint (<http://localhost:5000/api/test/>)

##### Endpoint Details

| Completed ?        | Method | Endpoint | Action               | Access Control |
| ------------------ | ------ | -------- | -------------------- | -------------- |
| :heavy_check_mark: | POST   | '/'      | Returns Request Body | _Public_       |

- POST ('/test') _Public_ When sent a request, this enpoint will simply return the request's body.

## Frontend ![react logo](https://github.com/lrth06/react-template/blob/main/frontend/src/Components/Icons/react.svg)

This is the user-facing side of the application. Built with React, there is already a navigation structure in place utilizing react-router, axios for API calls and node-sass for styling. To demonstrate the flexibility of this combination you will notice a number of their benefits exemplified throughout the existing pages and example components.

### Frontend Completion Status

Pages are being completed all the time so if you don't see what you need finished, be sure to check back or submit a request!

### Pages Completed

| Completed?         | Page Name | URL           |
| ------------------ | --------- | ------------- |
| :heavy_check_mark: | Home      | '/'           |
| :heavy_check_mark: | About     | '/About'      |
| :x: (in progress)  | Blog      | '/blog'       |
| :x: (in progress)  | Blog      | '/blog/:id'   |
| :x: (in progress)  | Add Post  | '/blog/:add'  |
| :x: (in progress)  | Contact   | '/contact     |
| :x:                | Admin     | '/admin'      |
| :x:                | Profile   | '/profile/:id |
