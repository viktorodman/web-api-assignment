## /v1/user paths

#### POST /v1/user

##### Description

Creates a new user

##### Request Body

- username
- password

##### Example Success Response

```json
{
"username": "example-user",
"message": "Created User: example-user"
}
```

---

#### GET /v1/user/:user_name

##### Description

Gets information about a specific user

##### Attribute

- user_name: A specific users username

##### Example Success Response

```json
{
    "_links": {
        "self": {
            "href": "https://catchthatfish-api.herokuapp.com/v1/users/example-user"
        }
    },
    "username": "example-user",
    "permission": "normal"
}
```

---

## /v1/auth paths

---

#### POST /v1/auth/login

##### Description

Login path for a user. Returns a jwt token which will be used for authorization

##### Request Body

- username
- password

##### Example Success Response

```json
{
    "access_token": "<access_token>"
}
```

---

## /v1/catches paths

---

#### GET /v1/catches

##### Description

Gets a list of all catches by every user.

##### Example Success Response

```json

"_links": {
    "self": {
        "href": "https://catchthatfish-api.herokuapp.com/v1/catches"
    }
},
"size": 1,
"_embedded": {
    "catches": [
        {
            "_links": {
                "self": {
                    "href": "https://catchthatfish-api.herokuapp.com/v1/catches/{catch_id}"
                }
            },
            "fisher": "example-user",
            "fishSpecies": "example-fish",
            "measurement": {
                "length": 400,
                "weight": 1500
            },
            "location": {
                "city": "example-city",
                "lake": "example-lake",
                "latitude": "0101010",
                "longitude": "0101010"
            }
        }
    ]
}
```

---

#### POST /v1/catches

##### Description

Creates a new catch

##### Request Body

- fishSpecies
- length
- weight
- city
- lake
- latitude [Optional]
- longitude [Optional]

##### Example Success Response

- Status: 201

```json
{
    "catch_id": "catch_id",
    "created_catch": "https://catchthatfish-api.herokuapp.com/v1/catches/catch_id"
}
```

---

#### GET /v1/catches/:catch_id

##### Description

Show information about a specific catch

##### Attribute

- catch_id: A specific catch id

##### Example Success Response

```json
{
    "_links": {
        "self": {
            "href": "https://catchthatfish-api.herokuapp.com/v1/catches/:catch_id"
        }
    },
    "fisher": "example-user",
    "fishSpecies": "bass",
    "measurement": {
        "length": 400,
        "weight": 1500
    },
    "location": {
        "city": "big-city",
        "lake": "the-lake",
        "latitude": "10101010",
        "longitude": "10101010"
    }
}
```

---

#### PUT /v1/catches/:catch_id

##### Description

Updates the information about a specific catch

##### Request Body

- fishSpecies
- length
- weight
- city
- lake
- latitude
- longitude

##### Attribute

- catch_id

##### Example Success Response

- Status: 204

---

##### DELETE /v1/catches/:catch_id

##### Description

Deletes a specific catch

##### Attribute

- catch_id

##### Example Success Response

- Status: 204

---

## /v1/hooks paths

---

##### GET /v1/hooks

##### Description

Gets all the logged in users registered webhooks.

##### Example Success Response

- Status: 200

```json
{
    "_links": {
        "self": {
            "href": "https://catchthatfish-api.herokuapp.com/v1/hooks"
        }
    },
    "size": 1,
    "_embedded": {
        "user_hooks": [
            {
                "_links": {
                    "self": {
                        "href": "https://catchthatfish-api.herokuapp.com/v1/hooks/hook_id"
                    }
                },
                "id": "hook_id",
                "user": "example-user",
                "url": "https://test.com",
                "catch_event": true,
                "catch_event_lake_filter": "",
                "catch_event_species_filter": ""
            }
        ]
    }
}
```

---

#### GET /v1/hooks/:hook_id

##### Description

Gets a specific hook

##### Attribute

- hook_id

##### Example Success Response

- Status: 200

```json
{
    "_links": {
        "self": {
            "href": "https://catchthatfish-api.herokuapp.com/v1/hooks/hook_id"
        }
    },
    "id": "hook_id",
    "user": "example-user",
    "url": "https://test.com",
    "catch_event": true,
    "catch_event_lake_filter": "",
    "catch_event_species_filter": ""
}
      
```

---

#### POST /v1/hooks

##### Description

Creates a new webhook

##### Request Body

- url
- catch_event
- catch_event_lake_filter [Optional]
- catch_event_species_filter [Optional]

##### Example Success Response

- Status: 204

```json
{
    "hook_id": "hook_id",
    "created_hook": "http://catchthatfish-api.herokuapp.com/v1/hooks/hook_id"
} 
```

---

#### PUT /v1/hooks/:hook_id

##### Description

Updates a specific hooks information

##### Attribute

- hook_id

##### Request Body

- url
- catch_event
- catch_event_lake_filter [Optional]
- catch_event_species_filter [Optional]

##### Example Success Response

- Status: 204

---

#### DELETE /v1/hooks/:hook_id

##### Description

Deletes a specific webhook

##### Attribute

- hook_id

##### Example Success Response

- Status: 204
