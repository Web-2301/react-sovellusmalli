let { origin,host,hostname,port,protocol,href } = window.location
console.log(`window.location:${origin},${host},${hostname},${port},${protocol},${href}`)
let url = origin
let base = '/react-sovellusmalli'
/* Paikallinen react- ja flask-kehityspalvelin */
// if (port != '' && port == '3000') url = url.replace(port,"5000")
if (port && port === '3000') {
    console.log(`yhteydet,port:${port}`)
    url = url.replace(port,"5000")
    }
/* XAMPP ja flask-kehitys- tai -waitress -palvelin, huom. waitress muuntaa localhostin IP-osoitteeksi. */
else if (host === 'localhost') {
    console.log(`yhteydet,host:${host}`)
    url = '127.0.0.1:5000'
    console.log("host:"+host+",url:"+url)
    }
else {
    //url = process.env.REACT_APP_API_URL
    /* Flask-sovellus myös Azuressa */
    url = 'https://flask-sovellusmalli-ii.azurewebsites.net'
    base = ''
    console.log("host:"+host+",url:"+url)
    }    
const baseUrl = url + '/reactapi'
//const closeUrl = 'http://localhost:5000/reactapi/logout'
const closeUrl = baseUrl + '/logout'
const loginUrl = baseUrl + "/signin"
const csrfUrl = baseUrl + '/getcsrf'
const confirmUrl = baseUrl + '/confirm'
const basename = base


console.log("loginUrl:"+loginUrl)
/* Huom. Tarvitaanko CORSia varten palvelimelta header:
   'Access-Control-Allow-Origin': 'http://localhost:3000' 
*/   

let consoleSivu = () => console.log(`host:${host},href:${href},location:`,window.location)

let csrfFetch = () => fetch(csrfUrl, {credentials: "include"})

let confirmFetch = () => fetch(confirmUrl, {credentials: "include"})
                         .then(response => response.text())  

let loginFetch = (formData,csrfToken,next) => {
    /* Huom. toimii myös ilman kauttaviivojen muuntamista
    next = encodeURIComponent(next) */
    let url = loginUrl+'?next='+next
    console.log("loginFetch,url:"+url) 
    return fetch(url,{
        method:'POST',
        headers: {"X-CSRFToken": csrfToken},
        credentials:'include',
        body:formData})
    .then(response => {
        console.log('loginFetch,response:',response.ok,response.status,response.url,response.redirected)
        return response.text()
        })  
    }

let closeFetch = () => fetch(closeUrl,{credentials:'include'})

export { basename,baseUrl,csrfUrl,consoleSivu,closeFetch,csrfFetch,loginFetch,confirmFetch };