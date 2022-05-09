const http = require('http');

const server = http.createServer(handler);
server.listen(3000);





const { Headers } = require('node-fetch');
const up_website = 'https://www.google.com/'


async function handler(req, res) {
  let url = new URL(req.url, up_website);
  let new_request_headers = new Headers(req.headers);
  new_request_headers.set('Host', url.hostname);
  new_request_headers.set('Referer', url.hostname);

  // console.log(ua)
  try {

    const original_response = await fetch(url.href, {
      method: req.method,
      headers: new_request_headers
    })
    let original_response_clone = original_response.clone();
    let response_headers = original_response.headers;
    let new_response_headers = new Headers(response_headers);
    let status = original_response.status;

    new_response_headers.set('access-control-allow-origin', '*');
    new_response_headers.set('access-control-allow-credentials', true);

    // await res.writeHead(200, new_response_headers)
    await res.end(original_response_clone.body);
  } catch(e) {
    console.log(e)
    //console.log(url)
    //console.log(url.href)
  }

}
