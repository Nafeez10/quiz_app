Quiz App - Developed By Mohamed Nafees.

Steps to run the web app.

1. - First, you need to install the packages for the webapp which are used to develop the app,  using this command -- " npm i " or " npm install "

2. - You need to run the json-server in your local machine to run the api on you local machine using this command -- " npx json-server@0.16.3 -p 4500 -w data/data.json "

3. - And then run the app using " npm run dev " or you can visit the website where the app is deployed in which is -- " https://quiz-app-6c18e.web.app/ "

Note: You should run the json-server in your local machine even if you are visiting the deployed site. because the api will be running on your local machine, you can see the data of the api in the data/data.json file.

Note: I used the version 0.16.3 of the json-server becuase in that version the api genreates the id in numbers instead of string, and there is nothing to do with that in this project but still i usually use this particular version that's why i used it.

Note: The -p in the command indicates the port number where the api should run if you change the port number in the command you should also need to change the same port number in the baseUrl in the axiosApi baseUrl which is in src/axiosApi/axiosApi.tsx.

Note: The json-server command is -- npx json-server@0.16.3 -p 4500 -w data/data.json

