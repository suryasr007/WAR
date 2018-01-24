# Write A Robot(W.A.R)
This source is the backend for Write a Robot website (Yet to build) built using **nodejs**.

# Features
1. REST API.
2. HTTP Basic Auth.
3. Mysql Database.

# Dependencies
1. Node.
2. MySql DB.
Rest of the dependencies are mentioned in package json file.

# Environment setup
Set up environmental variables for the app.

### DB Setup
| Environment Variable | Value |
| -------------------- | ----- |
| WAR_DB               | MySql DB being used |
| WAR_DB_HOST          | MySql Host |
| WAR_DB_USER          | MySql User |
| WAR_DB_PASS          | MySql Password |

### HTTP Auth Setup
1. Create a file **users.htpasswd** in the root folder of app.
2. Create users and associate a password to it in the following format in the **users.htpasswd** file.  
    *user_name*:*password*

# Run
1. Make sure the mysql/maria service is started and running.
2. Setup the Environment.
3. Install all the dependencies.
    ```javascript
    npm install
    ```
4. Run the app
    ```javascript
    npm start
    ```

# API End-points
1. Get project details
    ```javascript
    GET base_url/api/projects
    GET base_url/api/trainings
    ```
    Following Query Strings are available  
    title, tags, category(trainings) limit and offset

2. Add new project details
    ```javascript
    POST base_url/api/projects
    POST base_url/api/trainings
    ```

3. Delete project Details
    ```javascript
    DELETE base_url/api/projects?title=
    DELETE base_url/api/trainings?title=
    ```

3. Update project Details
    ```javascript
    PUT base_url/api/projects?title=
    PUT base_url/api/trainings?title=
    ```
