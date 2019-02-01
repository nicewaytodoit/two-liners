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
```
This will run server at the same time.

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

### Create React Start applicaiton 

`create-react-app two-liners-client`

+ move conent to client folder structure 


### Create Node/Express server servering



