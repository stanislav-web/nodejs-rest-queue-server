N

Development
----------------
[ADD] Migration `npm run migration` @estimated 1h30m
[LINKED] Async/Await `models < controllers > router` instead of Promises @estimated 2h30m
[COMPLETE] REST API @estimated 1h30m
[COMPLETE] SOCKET IO implemented @estimated 40m

Installation
----------------
`npm run db` - install db


Run
----------------
```
curl -XPOST  "localhost:8081/jobs" -d '{"title":"Test title","description":"Test Description","type":"feature", "status" : "waiting"}' -H 'Content-Type: application/json'
curl -XGET   "localhost:8081/jobs"
curl -XPUT   "localhost:8081/jobs/1" -d '{"title":"Test1", "type" : "hotfix", "status" : "waiting"}' -H 'Content-Type: application/json'
curl -XGET   "localhost:8081/jobs/1"
curl -XDELETE "localhost:8081/jobs/1"
```