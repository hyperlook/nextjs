function Page() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}


// This gets called on every request
async function createMarkup() {
  const res = await fetch('https://www.google.com/');
  const html = await res.text();
  var parser = new DOMParser();
	var doc = parser.parseFromString(html, 'text/html');

  // Pass data to the page via props
  return { __html : 'First &middot; Second' };
}


export default Page