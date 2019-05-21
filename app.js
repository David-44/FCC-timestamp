'use strict';

const http = require('http'),
    url = require('url');

let httpserver = http.createServer();
httpserver.on('request', (req, res) => {

  res.setHeader('Content-Type', 'application/json');

  let url_path = url.parse(req.url, true).path;
  let query = url_path.split(":")[1].slice(0, -1);

  let day = new Date(query),
      date = null;

  if (isNaN(day.getTime())) {
    day = new Date(parseInt(query));
  }

  if (isNaN(day.getTime())) {
    date = {error: day.toUTCString()};
  } else {
    date = {
      unix: day.getTime(),
      utc: day.toUTCString()
    }
  }

  res.end(JSON.stringify(date));
});

httpserver.listen(8000);
