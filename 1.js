const http = require('http');

import fetch from 'node-fetch';

const server = http.createServer(handler);
server.listen(3000);


const up_website = 'https://www.google.com/'


async function handler(req, res) {
  let url = new URL(req.url, up_website);


  // console.log(ua)
  try {

    const original_response = await fetch(url.href, {
      method: req.method,
      headers: req.headers
    })


    await res.writeHead(200, original_response.headers)
    await res.end(original_response.text());
  } catch(e) {
    console.log(e)
    //console.log(url)
    //console.log(url.href)
  }

}
