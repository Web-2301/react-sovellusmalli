let { origin,host,hostname,port,protocol,href } = window.location
console.log(`window.location:${origin},${host},${hostname},${port},${protocol},${href}`)
let url = origin
/* Paikallinen react- ja flask-kehityspalvelin */
//if (port == '3000') url = url.replace(port,"5000")
if (false) {}
/* XAMPP ja flask-kehityspalvelin */
else if (host == 'localhost') {
    url = url + ':5000'
    console.log("host:"+host+",url:"+url)
    }
else if (hostname == 'localhost') {
    url = url + ':5000'
    console.log("hostname:"+hostname+",url:"+url)
    }  
const baseUrl = url + '/reactapi'
//const closeUrl = 'http://localhost:5000/reactapi/logout'
const closeUrl = baseUrl + '/logout'
const loginUrl = baseUrl + "/signin"
const csrfUrl = baseUrl + '/getcsrf'
console.log("loginUrl:"+loginUrl)

let consoleSivu = () => console.log(`host:${host},href:${href},location:`,window.location)

let csrfFetch = () => fetch(csrfUrl, {credentials: "include"})

let loginFetch = (formData,csrfToken) => fetch(loginUrl,{
    method:'POST',
    headers: {"X-CSRFToken": csrfToken},
    credentials:'include',
    body:formData})

let closeFetch = () => fetch(closeUrl,{credentials:'include'})

export { baseUrl,consoleSivu,closeFetch,csrfFetch,loginFetch };