// 你要镜像的网站.
const upstream_domain = 'www.google.com'

// 镜像网站的目录，比如你想镜像某个网站的二级目录则填写二级目录的目录名，镜像 google 用不到，默认即可.
const upstream_path = '/'



// 镜像站是否开启 HTTPS.
const https = true

// 文本替换.
const replace_dict = {
  '$upstream': '$custom_domain',
  '//google.com': ''
}

// 以下保持默认，不要动
addEventListener('fetch', event => {
  event.respondWith(fetchAndApply(event.request));
})

async function fetchAndApply(request) {

  let response = null;
  let url = new URL(request.url);
  let url_hostname = url.hostname;

  url.protocol = 'https:';
  url.host = upstream_domain;
  if (url.pathname == '/') {
    url.pathname = upstream_path;
  } else {
    url.pathname = upstream_path + url.pathname;
  }

  let request_headers = request.headers;
  let new_request_headers = new Headers(request_headers);
  new_request_headers.set('Host', url.hostname);
  new_request_headers.set('Referer', url.hostname);

  let original_response = await fetch(url.href, {
    method: request.method,
    headers: new_request_headers
  })


  let original_text = null;
  let response_headers = original_response.headers;
  let new_response_headers = new Headers(response_headers);
  let status = original_response.status;

  new_response_headers.set('access-control-allow-origin', '*');
  new_response_headers.set('access-control-allow-credentials', true);


  const content_type = new_response_headers.get('content-type');
  if (content_type.includes('text/html') && content_type.includes('UTF-8')) {
    original_text = await replace_response_text(original_response, upstream_domain, url_hostname);
  } else {
    original_text = original_response.body
  }

  response = new Response(original_text, {
    status:status,
    headers: new_response_headers
  })

  return response;
}

async function replace_response_text(response, upstream_domain, host_name) {
  let text = await response.text()

  var i, j;
  for (i in replace_dict) {
    j = replace_dict[i]
    if (i == '$upstream') {
      i = upstream_domain
    } else if (i == '$custom_domain') {
      i = host_name
    }

    if (j == '$upstream') {
      j = upstream_domain
    } else if (j == '$custom_domain') {
      j = host_name
    }

    let re = new RegExp(i, 'g')
    text = text.replace(re, j);
  }
  return text;
}

