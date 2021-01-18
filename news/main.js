let api = '4f2f28d5773044d9a4dc1a1cfb6a130f';
let url = 'http://newsapi.org/v2/top-headlines?' +
          'country=in&' +
          `apiKey=${api}`;
window.onload= async ()=>{
    let req = new Request(url);


    let result = await fetch(req);
    console.log(result);
    
}