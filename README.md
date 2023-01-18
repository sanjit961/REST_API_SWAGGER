
###### REST API with PAGING, SEARCHING, SORTING #####
  ## COMMAND TO INSTALL THE APP ##
  ```
  npm install
  ```
  ## COMMAND TO RUN APP ##
  ```
  npm start
  ```
**Filter with Page and limit METHOD GET**
e.g; http://localhost:5001/api/users?page=1&limit=4  

**search with username || name || hobby METHOD GET**
eg; http://localhost:5001/api?username=sanjit&name=sanjit&hobby=dancing

**Sort in ascending || descending order METHOD GET**
e.g; http://localhost:5001/api/users/ascending

**GET ALL USERS METHOD GET**
endpoint: http://localhost:5001/api/users

**REGISTER NEW USER METHOD POST**
endpoint: http://localhost:5001/api/post

**DELETE USER BY ID METHOD DELETE**
endpoint: http://localhost:5001/delete/id

**UPDATE USER BY ID METHOD PATCH**
endpoint: http://localhost:5001/update/id

**GET USER BY ID METHOD GET**
endpoint: http://localhost:5001/api/getById

***Swagger UI***
http://localhost:5001/api-docs


