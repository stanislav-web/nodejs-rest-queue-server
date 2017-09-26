Development
----------------

- [ADD] Migration `npm run migration` @estimated 1h30m
- [LINKED] Async/Await `models < controllers > router` instead of Promises @estimated 2h30m
- [COMPLETE] REST API @estimated 1h30m
- [COMPLETE] SOCKET IO implemented @estimated 40m
- [COMPLETE] Postgress Listen/Notify @estimated 30m
- [COMPLETE] Tests @estimated 30m

Summary : 7h30m

Requirements
-----------------
- NodeJS & NPM 8.x
- Postgress 9.x

Configuration
-----------------
- /app/config.js
- /dump/scheme.sql

Installation
----------------
- `npm i` - install dependencies
- `npm start`  - start app (localhost:8081)
- `npm run test` - run rest api tests

Run
----------------
```
curl -XPOST  "localhost:8081/jobs" -d '{"title":"Test title","description":"Test Description","type":"feature", "status" : "waiting"}' -H 'Content-Type: application/json'
curl -XGET   "localhost:8081/jobs"
curl -XPUT   "localhost:8081/jobs/1" -d '{"title":"Test1", "type" : "hotfix", "status" : "waiting"}' -H 'Content-Type: application/json'
curl -XGET   "localhost:8081/jobs/1"
curl -XDELETE "localhost:8081/jobs/1"
```