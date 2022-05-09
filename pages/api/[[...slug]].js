const UP_SITE = 'https://www.google.com/';
const CDN_SITE = 'https://google.glook.workers.dev/'



export default async function handler(req, res) {
  let url = new URL(req.url, UP_SITE);
  let new_request_headers = new Headers(req.headers);

  new_request_headers.set('Host', url.hostname);
  new_request_headers.set('Referer', url.hostname);

  try {
    const original_response = await fetch(url.href, {
      method: req.method,
      headers: new_request_headers
    })
    const content_type = original_response.headers.get('content-type');

    //console.log(original_response.headers)

    if (content_type.includes('text/html')) {
      let original_text = await original_response.text();
      res.setHeader('Content-Type', content_type);
      res.setHeader('access-control-allow-origin', '*');
      res.setHeader('access-control-allow-credentials', true);
      res.send(original_text);
    } else {
      let sUrl = new URL(req.url, CDN_SITE);
      res.redirect(sUrl.href);
    }
  } catch (e) {
    console.log(e)
    console.log(url)    
  }

}
