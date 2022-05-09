const UP_SITE = 'https://www.google.com/';
const CDN_SITE = 'https://cdn.sc21.tk/'



export default async function handler(req, res) {

  let url = new URL(req.url, UP_SITE);


  const pathnames = ['/', '/search', '/complete/search', '/translate', '/async/translate']

  if (!pathnames.includes(url.pathname)) {
    let sUrl = new URL(req.url, CDN_SITE);
    res.setHeader('Referer', url.hostname);
    res.setHeader('user-agent', req.headers['user-agent']);
    res.redirect(sUrl.href);
  } else {
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

      console.log('path:' + url.pathname)
      console.log('content-type:' + content_type)
      let original_text = await original_response.text();
      res.setHeader('Content-Type', content_type);
      res.setHeader('access-control-allow-origin', '*');
      res.setHeader('access-control-allow-credentials', true);
      res.end(original_text);

    } catch (e) {
      console.log(e)
      console.log(url)
    }

  }
}
