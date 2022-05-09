const up_website = 'https://www.google.com/'



export default async function handler(req, res) {
  let url = new URL(req.url, up_website);
  let method = req.method;

  let request_headers = req.headers;
  let new_request_headers = new Headers(request_headers);

  new_request_headers.set('Host', url.hostname);
  new_request_headers.set('Referer', url.hostname);

  // console.log(ua)
  try {

    const original_response = await fetch(url.href, {
      method: method,
      headers: new_request_headers
    })
    let new_response_headers = new Headers(original_response.headers);
    const content_type = new_response_headers.get('content-type');

    console.log(content_type)

    if (content_type.includes('text/html')) {
      let original_text = await original_response.text();
      //new_response_headers.set('access-control-allow-origin', '*');
      //new_response_headers.set('access-control-allow-credentials', true);
      res.setHeader('Content-Type', content_type);
      res.send(original_text);
    } else {
      let sUrl = new URL(req.url, 'https://google.glook.workers.dev/');
      //console.log(sUrl.href)
      res.redirect(sUrl.href);

    }

  } catch (e) {
    console.log(e)
    //console.log(url)
    console.log(url.href)
  }

}
