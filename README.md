# two-liners
Just very simple SCRUM tool with MERN (MongoDB, Express, React, Node)


## TODO list 
+ Install MongdoDB 
    - For version 2 time try LiteDB (LERN)
    + create new database in mongo
    + create two collections users and dailytasks

+ Create React Start application 
    + install packages
    + test run ? = done + working

- Create Node/Express server servering:
    * React static 
    * and MS end points for MongoDB


## How to

### Installing and Running MongoDB

MongoDB official website download page:
(https://www.mongodb.com/download-center/community)[https://www.mongodb.com/download-center/community]

Choose your OS and download package. In my case Windows = ~200Mb.

- Installed only Client & Server without having mongose and other nice tools.
- Alos opted out of running MongoDB as service, really I need it when I need it.
- Graphic tool is just nice to have but I planning to use shell commands as much as possible.

- For windows you will find Mongo here `c:\Program Files\MongoDB\Server\4.0\bin`

But first you need to make two folders data and log. In my case these were located:
```
c:\proj\mongodb\data 
c:\proj\mongodb\log 
```

1. Initiate log: 
```
echo logpath=c:\proj\mongodb\log\mongo.log > c:\Program Files\MongoDB\Server\4.0\bin\mongod.cfg
```

2. Set the data path
```bash
./mongod.exe --dbpath=c:/proj/mongodb/data/ 
../Program\ Files/MongoDB/Server/4.0/bin/mongod.exe --dbpath=c:/proj/mongodb/data/
```
This will run server at the same time.
pid=6668 port=27017 
localhost:27017


```
/c/Program\ Files/MongoDB/Server/4.0/bin/mongo.exe
but you need CMD or Powershell in windows as interface does not works good 

```

3. Testing client 
Open up new command (from some reason bash is not working)
```
> mongo.exe
```
Then inside mongo type:

```
show dbs
use twoliners
db.createCollection("users")
db.createCollection("dailytasks")
show collections
```

Or you can forget all this and just use Services like mLab that will give you DB as Service:
https://mlab.com/ and 500MB is quite enough for small test projects like this one.


You have to create databese that will have same name as in `/server/app.js` mongoDB link setup
`const dbRoute = "mongodb://localhost:27017/messagetest";` the end chunk `messagetest`.

```
show dbs
use messagetest
db.createCollection("test")
show collections
```

Newly create collections for our purpose will be created automatically with name `datas`

```
> db.datas.find()
> db.datas.find().pretty()
```

Name 'datas' is created by defining mongoose schema and MongoDB decides on its own to make it plural:
```module.exports = mongoose.model("Data", DataSchema);```



### Create React Start applicaiton 

`create-react-app two-liners-client`

+ move conent to client folder structure 


### Create Node/Express server

* Serving both 
    - React Static 
    - REST service end points (Adding concurently runner at bottom level)



### Creating Mongo DB Hierachy Structure 




## Errors

### Cross-Origin Request Blocked
Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at http://localhost:3001/api/getData. (Reason: CORS request did not succeed).[Learn More]

* Solution > #Fix-001

### CORS - Method DELETE is not allowed
Access to XMLHttpRequest at 'http://localhost:3001/api/deleteData' from origin 'http://localhost:3000' has been blocked by CORS policy: Method DELETE is not allowed by Access-Control-Allow-Methods in preflight response.

* Solution > #Fix-002

# What am I trying to achieve 
```json
{
    "date": "2019-03-19",
    "liners": [
        {
            "user": "Aleks", // hashed userID if recognised update
            "IP": "ip",
            "date": "2019-03-19",
            "yestarday": "Developing Countries 2017",
            "today": "Developing Titles 2015",
            "comment": {
                "type": "comment",
                "text": "Developint Titles 2015",
            },
            "createdAt": "dd-MM-yyyy hh-mm-ss",
            "updatedAt": "dd-MM-yyyy hh-mm-ss",
        },
        {
            "user": "Barbara",
            "date": "2019-03-19", // visual only 
            "yestarday": "Developing Countries 2017",
            "today": "Developing Titles 2015",
            "comment": {
                "type": "comment",
                "text": "Developint Titles 2015",
            },
            "createdAt": "dd-MM-yyyy hh-mm-ss",
            "updatedAt": "dd-MM-yyyy hh-mm-ss",
        }
    ]
}

```












