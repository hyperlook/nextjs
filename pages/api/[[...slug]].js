const up_website = 'https://www.google.com/'



export default async function handler(req, res) {
  let url = new URL(req.url, up_website);
  let method = req.method;
  let new_request_headers = new Headers(req.headers);
  new_request_headers.set('Host', url.hostname);
  new_request_headers.set('Referer', url.hostname);

  // console.log(ua)
  try {

    const original_response = await fetch(url.href,{
      method: method,
      headers: new_request_headers
  })
    let original_response_clone = original_response.clone();
    let original_text = null;
    let response_headers = original_response.headers;
    let new_response_headers = new Headers(response_headers);
    let status = original_response.status;

    new_response_headers.set('access-control-allow-origin', '*');
    //new_response_headers.set('access-control-allow-credentials', true);

    
    const content_type = new_response_headers.get('content-type');

    console.log(content_type)

    if (content_type.includes('text/html')) {
      original_text = await original_response_clone.text();
    } else {
      original_text = '123';
    }
    res
    .writeHead(200, new_response_headers)
    .end(original_text);
  } catch (e) {
    console.log(e)
    //console.log(url)
    console.log(url.href)
  }

}
