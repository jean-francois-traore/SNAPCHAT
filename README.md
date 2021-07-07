
# Snapchat

## DESCRIPTION :

This group project is about making a **[Snapchat]** clone.  
The clone is made with **[React Native]** and **[Expo]**.  
To do so we have a public API which has 7 routes.  


[Snapchat]: <https://www.snapchat.com/l/fr-fr/>
[React Native]: <https://reactnative.dev/>
[Expo]: <https://expo.io/>

  ## VISUAL :
![](https://s6.gifyu.com/images/ezgif.com-gif-maker-3d1c0aa03a716c45b.gif)


  ## FEATURES :
- Register/Login/Logout.
- Take picture / take an image from phone library.
- Front and Back camera.
- Sending image to someone.
- Setting the duration of the snap.
- List of received snaps.
- Display of received snap with duration.  

## API REFERENCE :

  * [GET /all](#1-get-all)
  * [GET /snap/:id](#2-get-snapid)
  * [GET /snaps](#3-get-snaps)
  * [POST /connection](#4-post-connection)
  * [POST /inscription](#5-post-inscription)
  * [POST /seen](#6-post-seen)
  * [POST /snap](#7-post-snap)


--------  



### 1. GET /all



***Endpoint:***

```bash
Method: GET
Type: JSON
URL: {{api_url}}/all
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |
| token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...... | your personnal token |



***More example Requests/Responses:***


##### I. Example Request: GET /all SUCCESS


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |
| token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...... | your personnal token |



##### I. Example Response: GET /all SUCCESS
```json
{
    "code": "S_LIST_USERS",
    "message": "Users list",
    "status": 200,
    "data": [
        {
            "email": "test@test.fr"
        },
        ...
    ]
}
```


***Status Code:*** 200  


### 2. GET /snap/:id  



***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{api_url}}/snap/{{id}}
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...... | your personnal token |



***More example Requests/Responses:***


##### I. Example Request: GET /snap/:id ERROR


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...... | your personnal token |



##### I. Example Response: GET /snap/:id ERROR  
```json
{
    "code": "E_BUFFER",
    "message": {
        "message": "Cast to ObjectId failed for value \"60bbdb07603f43\" at path \"_id\" for model \"Snaps\"",
        "name": "CastError",
        "stringValue": "\"60bbdb07603f43\"",
        "kind": "ObjectId",
        "value": "60bbdb07603f43",
        "path": "_id"
    },
    "status": 400,
    "data": null
}
```


***Status Code:*** 400  



##### II. Example Request: GET /snap/:id SUCCESS


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...... | your personnal token |



##### II. Example Response: GET /snap/:id SUCCESS
```json
{
    "code": "S_SNAP",
    "message": "Snap Content",
    "status": 200,
    "data": {
        "image": {
            "data": {
                "type": "Buffer",
                "data": [...]
            },
            "contentType": "image/png",
            "link": "/image_1622924039685_1.png"
        },
        "duration": 5,
        "_id": "60bbdb07603f43......",
        "from": "test@example.com",
        "to": "test@example.fr",
        "createdAt": "2021-06-05T20:13:59.700Z",
        "updatedAt": "2021-06-05T20:13:59.700Z"
    }
}
```


***Status Code:*** 200  



### 3. GET /snaps



***Endpoint:***

```bash
Method: GET
Type: JSON
URL: {{api_url}}/snaps
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...... | your personnal token |
| Content-Type | application/json |  |



***Body:***



***More example Requests/Responses:***


##### I. Example Request: GET /snaps SUCCESS


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...... | your personnal token |
| Content-Type | application/json |  |



##### I. Example Response: GET /snaps SUCCESS
```json
{
    "code": "S_SNAPS",
    "message": "Snap Content",
    "status": 200,
    "data": []
}
```


***Status Code:*** 200  



### 4. POST /connection



***Endpoint:***

```bash
Method: POST
Type: JSON
URL: {{api_url}}/connection
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



***Body:***

```json        
{
    "email": "test@example.com",
    "password": "123456789"
}
```



***More example Requests/Responses:***


##### I. Example Request: POST /connection ERROR


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



***Body:***

```json        
{
    "email": "test@example.com",
    "password": "12345678"
}
```



##### I. Example Response: POST /connection ERROR
```json
{
    "code": "E_LOGIN_MISS",
    "message": "Wrong Password",
    "status": 400,
    "data": null
}
```


***Status Code:*** 400  



##### II. Example Request: POST /connection SUCCESS


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



***Body:***

```json        
{
    "email": "test@example.com",
    "password": "123456789"
}
```



##### II. Example Response: POST /connection SUCCESS
```json
{
    "code": "S_LOGGED",
    "message": "Successful login",
    "status": 200,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9........"
    }
}
```


***Status Code:*** 200  



### 5. POST /inscription



***Endpoint:***

```bash
Method: POST
Type: JSON
URL: {{api_url}}/inscription
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



***Body:***

```json        
{
    "email": "test@example.com",
    "password": "123456789"
}
```



***More example Requests/Responses:***


##### I. Example Request: POST /inscription ERROR


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



***Body:***

```json        
{
    "email": "test@example.com",
    "password": "123456789"
}
```



##### I. Example Response: POST /inscription ERROR
```json
{
    "code": "E_USER_ALREADY_EXIST",
    "message": "User with this email already exist",
    "status": 400,
    "data": null
}
```


***Status Code:*** 400  



##### II. Example Request: POST /inscription SUCCESS


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



***Body:***

```json        
{
    "email": "test@example.com",
    "password": "123456789"
}
```



##### II. Example Response: POST /inscription SUCCESS
```json
{
    "code": "S_REGISTERED",
    "message": "User registered",
    "status": 200,
    "data": {
        "id": "60bbd7ef603f432c......",
        "email": "test@example.com"
    }
}
```


***Status Code:*** 200  



### 6. POST /seen



***Endpoint:***

```bash
Method: POST
Type: JSON
URL: {{api_url}}/seen
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...... | your personnal token |
| Content-Type | application/json |  |



***Body:***

```json        
{
    "id": "{{id}}"
}
```



***More example Requests/Responses:***


##### I. Example Request: POST /seen SUCCESS


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...... | your personnal token |
| Content-Type | application/json |  |



***Body:***

```json       
{
    "id": "{{id}}"
}
```



##### I. Example Response: POST /seen SUCCESS
```json
{
    "code": "S_DELETE_SNAP",
    "message": "Snap Deleted",
    "status": 200,
    "data": "snap deleted"
}
```


***Status Code:*** 200  



### 7. POST /snap



***Endpoint:***

```bash
Method: POST
Type: FORMDATA
URL: {{api_url}}/snap
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | multipart/form-data |  |
| token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...... | your personnal token |



***Body:***

| Key | Value | Description |
| --- | ------|-------------|
| duration | 5 | snap duration after opening |
| to | test@example.fr | to whom you are sending |
| image | file | image you are sending |



***More example Requests/Responses:***


##### I. Example Request: POST /snap SUCCESS


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | multipart/form-data |  |
| token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...... | your personnal token |



***Body:***

| Key | Value | Description |
| --- | ------|-------------|
| duration | 5 | snap duration after opening |
| to | test@example.fr | to whom you are sending |
| image | file | image you are sending |



##### I. Example Response: POST /snap SUCCESS
```json
{
    "code": "S_SNAP",
    "message": "Snap Content",
    "status": 200,
    "data": {
        "image": {
            "data": {
                "type": "Buffer",
                "data": [...]
            },
            "contentType": "image/png",
            "link": "/image_1622923873513_1.png"
        },
        "duration": 5,
        "_id": "60bbda61603f432c14......",
        "from": "test@example.com",
        "to": "test@example.fr",
        "createdAt": "2021-06-05T20:11:13.528Z",
        "updatedAt": "2021-06-05T20:11:13.528Z"
    }
}
```


***Status Code:*** 200  



##### II. Example Request: POST /snap ERROR


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | multipart/form-data |  |
| token | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...... | your personnal token |



***Body:***

| Key | Value | Description |
| --- | ------|-------------|
| duration | 5 | snap duration after opening |
| to | test@example.fr | to whom you are sending |



##### II. Example Response: POST /snap ERROR
```json
{
    "message": "File can't be empty"
}
```


***Status Code:*** 401  

---
[Back to top](#api-reference-)
> Made with &#9829; by [thedevsaddam](https://github.com/thedevsaddam) | Generated at: 2021-06-05 22:28:37 by [docgen](https://github.com/thedevsaddam/docgen)

## AUTHORS : 
  
- [Abraham DIAW](https://github.com/AbrahamDiaw)
- [Jean-François TRAORE](https://github.com/inconnu060217)
- [Paul VALENTIN](https://github.com/pvalentinn)
