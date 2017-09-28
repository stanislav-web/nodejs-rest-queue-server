Development
----------------

- [ADD] Migration `npm run migration` @estimated 1h30m
- [LINKED] Async/Await `models < controllers > router` instead of Promises @estimated 2h30m
- [COMPLETE] REST API @estimated 1h30m
- [COMPLETE] SOCKET IO implemented @estimated 40m
- [COMPLETE] Postgress Listen/Notify @estimated 30m
- [COMPLETE] Tests @estimated 30m
- [ADD] Client tracker @estimated 3h
- [COMPLETE] ES6 beautify )

Summary : 10h30m

Requirements
-----------------
- NodeJS & NPM 8.x
- Postgress 9.x

Configuration
-----------------
- .env
- /dump/schema.sql
- /dump/demo.sql

Installation
----------------
- `npm i` - install dependencies
- `npm start`  - start server (localhost:8081)
- `npm run tracker waiting`  - process (waiting tasks) -> complete 
- `npm run tracker pending`  - process (pending tasks) -> complete 
- `npm run test` - run rest api tests

Using
----------------
1. Start nodejs server `npm start`. By defaults it listening on localhost:8081
2. Create some jobs for further work. Use POST request for `http://localhost:8081/jobs {body}`
3. The next step to launch tracker by command `npm run tracker waiting` or `npm run tracker pending` depends on what status of the task you want to perform
4. The tracker will process the tasks while they exist, then every second it will ask the server to process for new tasks in the order of the queue FIFO one by one and in real time to notify the client of the fulfillment


Conclusion
----------------
- Documentation: /docs
- Client: /app/public/index.html
- Demo data /dump/demo.sql

```
curl -XPOST  "localhost:8081/jobs" -d '{"title":"Test title","description":"Test Description","type":"feature", "status" : "waiting"}' -H 'Content-Type: application/json'
curl -XGET   "localhost:8081/jobs"
curl -XGET   "localhost:8081/jobs/status/:waiting/limit/:1"
curl -XPUT   "localhost:8081/jobs/1" -d '{"title":"Test1", "type" : "hotfix", "status" : "waiting"}' -H 'Content-Type: application/json'
curl -XGET   "localhost:8081/jobs/1"
curl -XDELETE "localhost:8081/jobs/1"
```