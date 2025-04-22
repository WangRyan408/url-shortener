# URL-Shortener Project

## Introduction
Just a simple URL shortener. Nothing fancy in the way of functionality or design (and there are probably some implementation problems I'm new to this). Stores user data and URLs into MongoDB and has a simple dashboard to list shortened URLs. Enjoy playing around with it!
<br>
__(DISCLAIMER!!!!): There is NO reset password feature and there will not be one implemented!!!!! Try not to forget your info :)__

## Dependencies
- Node.js (v18+)
- An internet connection (duh)
- npm (which should be bundled with Node.js)
- A hash for the JWT
- A MongoDB URI link

## Quickstart
You'll need to install dependencies for both the frontend and backend. To do so, you'll need to have two terminals running in both directories.

```sh
//Assuming you have an SSH Key
git clone git@github.com:WangRyan408/url-shortener.git

//HTTPS Clone or Github Desktop
git clone https://github.com/WangRyan408/url-shortener.git
```

You'll also need a .env file for handling auth and connecting to MongoDB (You'll need to create/provide this yourself). 
```
//Create a .env file for the JWT secret and MongoDB URI
touch .env   //I don't know powershell so you windows users are on your own for this one.
```
Your .env file should have the following format/variables
```
MONGO_URI=<insert your database connection key here>
JWT_SECRET=<insert your 32-bit JWT hash here>
```
Install npm dependencies
```
//Run this command in both client and server directories
npm install
```
To start the client side, run
```
npm run dev
```
To start the backend, run
```
npm start
```

## Screenshots
![image](https://github.com/user-attachments/assets/56d3d4b6-877f-4dc7-bcd6-e28084be2703)
_The User Dashboard_

![image](https://github.com/user-attachments/assets/203a07eb-efa6-48c6-bdbe-ff1c99b577fc)
_Context Menu for the generated links_

![image](https://github.com/user-attachments/assets/38bd57fa-5d72-4c66-932d-ece5824b1c38)
<br>
_Sign in page_

![image](https://github.com/user-attachments/assets/a13ac401-2078-4ba7-94a1-381a30db60c9)
<br>
_Registration Page_


