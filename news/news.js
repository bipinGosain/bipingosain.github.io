let api = '4f2f28d5773044d9a4dc1a1cfb6a130f';
let url = 'https://newsapi.org/v2/top-headlines?' +
          'country=in&' +
          `apiKey=${api}`;

var modal = document.querySelector('.loader');
var headlinesParent = document.querySelector('.headlines-parent');
let headlineList = [];
let headlineIndex = 0;
var totalHeadlines = 0;

window.onload =  ()=>{
    
    listenToNavEvents();
    
    fetchNews().then((result)=>{
        console.log(result);
        modal.style.display = 'none';
        //spawning list of headlines on the page... 
        totalHeadlines = result.articles.length;
        
        for(let index = 0; index < totalHeadlines; index ++)
            headlineList.push(spawnArticle(result.articles[index]));
        
        //shows news one by one...on the slider... 
        display();
    })
}

async function fetchNews(){
    //Fetch the data from server.... 
    let req = new Request(url);
    let result = await (await fetch(req)).json();
    return result;
}


function listenToNavEvents(){
    let leftNav = document.getElementById('left');
    let rightNav = document.getElementById('right');
    leftNav.addEventListener('click', (eve)=>{
        
        hideCurrent();
        headlineIndex = headlineIndex === 0 ? totalHeadlines - 1 : headlineIndex-1;
        display();
    });

    right.addEventListener('click', (eve)=>{
        hideCurrent();
        headlineIndex = headlineIndex ===  totalHeadlines - 1 ? 0 : headlineIndex+1;
        display();
    })
}


function display(){
    
    let div = headlineList[headlineIndex];
    div.classList.add('show');

    setTimeout(()=>{
        let articleImg =  div.children[0].children[0]
        articleImg.classList.add('show-article-img');
    }, 200);

}
    
    
function hideCurrent()
{
    let div = headlineList[headlineIndex];
    div.classList.remove('show');
    let articleImg =  div.children[0].children[0]
    articleImg.classList.remove('show-article-img');
}

    
    

function spawnArticle(article){
    let artDiv = document.createElement('div');
    artDiv.classList.add('article');
    
    let artAnchor = document.createElement('a');
    artAnchor.setAttribute('href', article.url);
    artAnchor.classList.add('article-a');

    let artHeading = document.createElement('h3');
    artHeading.textContent = article.title;
    artHeading.classList.add('article-heading')

    let artImg = document.createElement('img');
    if(article.urlToImage)
        artImg.src = article.urlToImage;
    else
        artImg.alt = "Article Image";
    

    artImg.classList.add('article-img');
    
    artAnchor.append( artImg, artHeading);


    artDiv.append(artAnchor);
    headlinesParent.appendChild(artDiv);

    return artDiv;
    
}
