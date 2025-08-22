self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Only handle /set-theme endpoint
  if (url.pathname === '/set-theme') {
    event.respondWith(handleThemeToggle(event.request));
  }
  // For all other requests, let the browser handle them normally
});

async function handleThemeToggle(request) {
  // Get the referrer URL for redirect
  const referrer = request.headers.get('Referer') || '/';
  
  // Parse existing cookies from the request
  const cookieHeader = request.headers.get('Cookie') || '';
  const cookies = parseCookies(cookieHeader);
  
  // Get current theme cookie value
  const currentTheme = cookies['Theme-Toggled'];
  
  // Toggle the value: if no cookie exists, set to 'yes'
  // If exists, swap between 'yes' and 'no'
  let newThemeValue;
  if (!currentTheme) {
    newThemeValue = 'yes';
  } else if (currentTheme === 'yes') {
    newThemeValue = 'no';
  } else {
    newThemeValue = 'yes';
  }
  
  // Create response with redirect and updated cookie
  const response = new Response(null, {
    status: 307, // Temporary Redirect - preserves request method and body
    headers: {
      'Location': referrer,
      'Set-Cookie': `Theme-Toggled=${newThemeValue}; Path=/; HttpOnly; SameSite=Strict`
    }
  });
  
  return response;
}

function parseCookies(cookieHeader) {
  const cookies = {};
  
  if (!cookieHeader) return cookies;
  
  cookieHeader.split(';').forEach(cookie => {
    const [name, ...rest] = cookie.trim().split('=');
    if (name && rest.length > 0) {
      cookies[name] = rest.join('=');
    }
  });
  
  return cookies;
}

//self.addEventListener("fetch", event =>{
//    
//    //TODO: make an endpoint to set the localStorage up then set the form to go to there and have it HTTP 302 or 307
//    event.respondWith((async ()=>{
//        const resp = await fetch(event.request);
//        const body = await resp.text();
//        return new Response(body.replace("<body>", '<body class="toggled">'), {
//            headers:resp.headers,
//            status: resp.status
//        });
//    })());
//})
