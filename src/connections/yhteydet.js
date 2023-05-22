let { origin,host,hostname,port,protocol,href } = window.location
let url = origin
if (port == '3000') url = url.replace(port,"5000")
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