let api = '4f2f28d5773044d9a4dc1a1cfb6a130f';
let headLinesURL = 'https://newsapi.org/v2/top-headlines?' +
          'country=in&' +
          `apiKey=${api}`;
let categoryURL = `http://newsapi.org/v2/top-headlines?country=in&category=!!&apiKey=${api}`;

let modal = document.querySelector('.loader');
let headlinesParent = document.querySelector('.headlines-parent');
let categoryNewsParent = document.querySelector('.category-news__container');
let categoryNewsLoader = categoryNewsParent.children[0];
let headlineList = [];
let headlineIndex = 0;
let totalHeadlines = 0;
let totalCategoryNews = 0;


window.onload =  ()=>{
    
    listenToNavEvents();
    listenToCatEvents();
    
    

    //Get Headlines.... 
    fetchNews(headLinesURL).then((result)=>{
        if(result.status === 'error'){
            alert(`News API does not work in free plan on Github.`);
            window.history.back();
            return;
        }


        modal.style.display = 'none';
        //spawning list of headlines on the page... 
        totalHeadlines = result.articles.length;
        
        for(let index = 0; index < totalHeadlines; index ++)
            headlineList.push(loadHeadlinesToDOM(result.articles[index]));
        
        //shows news one by one...on the slider... 
        display();
    })
    fetchCatNews('business');
}
    
function fetchCatNews(category){
    //Get Category news...
    let catURL = categoryURL.replace('!!', category);

    fetchNews(catURL).then(result=>{
        
        categoryNewsLoader.style.display = 'none';
        totalCategoryNews = result.articles.length
        for(let index = 0; index < totalCategoryNews; index ++)
            loadCategoryNewsToDOM(result.articles[index]);
    })
}


async function fetchNews(url){
    //Fetch the data from server.... 
    let req = new Request(url);
    let result = await (await fetch(req)).json();
    return result;
}

function listenToCatEvents(){
 
    for(var cat of document.querySelectorAll('.category-news__category')){
 
        cat.addEventListener('click', async (eve)=>{

            //Resetting the selected class... 
            document.querySelectorAll('.category-news__category')
            .forEach(    x=> x.classList.remove('selected'));
            
            //adding selected class to clicked element...
            eve.target.classList.add('selected');
            //display loader...            
            categoryNewsLoader.style.display = 'block';
            
            let prevArticles = document.querySelectorAll('.category-news__article');
            prevArticles.forEach(x=>x.remove());
            fetchCatNews(eve.target.textContent.toLowerCase())
        })
    }
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

function loadCategoryNewsToDOM(article){
    let artDiv = document.createElement('div');
    artDiv.classList.add('category-news__article');
    
    let artAnchor = document.createElement('a');
    artAnchor.setAttribute('href', article.url);
    artAnchor.classList.add('category-news__link');

    let artHeading = document.createElement('h4');
    artHeading.textContent = article.title.substring(0, 60)+ "...";
    artHeading.classList.add('category-news__heading')

    let artImg = document.createElement('img');
    if(article.urlToImage)
        artImg.src = article.urlToImage;
    else
        artImg.alt = "Could not load the image.";
    

    artImg.classList.add('category-news__img');
    
    artAnchor.append( artImg, artHeading);


    artDiv.append(artAnchor);
    categoryNewsParent.appendChild(artDiv);

}
    

function loadHeadlinesToDOM(article){
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
