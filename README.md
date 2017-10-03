REST Queue Server with a distributed listeners
-----------------

[![Build Status](https://travis-ci.org/stanislav-web/nodejs-rest-queue-server.svg?branch=master)](https://travis-ci.org/stanislav-web/nodejs-rest-queue-server) [![npm version](https://badge.fury.io/js/nodejs-rest-queue-server.svg)](https://badge.fury.io/js/nodejs-rest-queue-server)

Requirements
-----------------
- NodeJS >=6 & NPM 8.x
- Postgress 9.x

Implemented
-----------------
- KOA2 middleware
- Postgres Listen/Notify
- Sockets
- Native Promise queuing
- ES2017 async/await

Configuration
-----------------
- .env

Installation
----------------
- `npm i` - install dependencies
- `npm start`  - start server (localhost:8081)
- `npm run tracker waiting`  - process (waiting tasks) -> complete 
- `npm run tracker pending`  - process (pending tasks) -> complete 
- `npm run test` - run rest api tests
- `npm run dev` - run with nodemon

[![NPM](https://nodei.co/npm/nodejs-rest-queue-server.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/nodejs-rest-queue-server/)

Using
----------------
1. Start nodejs server `npm start`. By defaults it listening on localhost:8081
2. Create some jobs for further work. Use POST request for `http://localhost:8081/jobs {body}`
3. The next step to launch tracker by command `npm run tracker waiting` or `npm run tracker pending` depends on what status of the task you want to perform
4. The tracker will process the tasks while they exist, then every second it will ask the server to process for new tasks in the order of the queue FIFO one by one and in real time to notify the client of the fulfillment


Conclusion
----------------
- Documentation: /docs
- Client: /public/index.html

```
curl -XPOST  "localhost:8081/jobs" -d '{"title":"Test title","description":"Test Description","type":"feature", "status" : "waiting"}' -H 'Content-Type: application/json'
curl -XGET   "localhost:8081/jobs"
curl -XGET   "localhost:8081/jobs/status/:waiting/limit/:1"
curl -XPUT   "localhost:8081/jobs/1" -d '{"title":"Test1", "type" : "hotfix", "status" : "waiting"}' -H 'Content-Type: application/json'
curl -XGET   "localhost:8081/jobs/1"
curl -XDELETE "localhost:8081/jobs/1"
```