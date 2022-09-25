
 const imageContainer=document.getElementById('image-container');
 const loader=document.getElementById('loader');
let photosArray=[];
let ready=false;
let imagesLoaded=0;
let totalImages=0;
//UnsPlash API
const count=10;
const apiKey= 'FZ0384o1uuj4UofB8SYODWnJy89VBIdRfH_ALzavgk8';
const apiUrl= `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

//
function imageLoaded(){
    
    imageLoaded++;
    console.log(imageLoaded);
    if(imagesLoaded === totalImages){
        ready=true;
        console.log('ready=',ready)
    }
}
function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}
// GET pHOTOS FROM uNSLPASH aPI
function displayPhotos(){
    imageLoaded=0;
    totalImages=photosArray.length;
    photosArray.forEach((photo)=>{ 
        //CERATING AN ANCHOR ELEMENT<A> LINK TO UNSLPL
        const item=document.createElement('a');
        // item.setAttribute('href',photo.links.html);
        // item.setAttribute('target','_blanks');
        //Create Image <img> for photo
        setAttributes(item,{
            href:photo.links.html,
            target:'_blank',

        });
        const img=document.createElement('img');
        // img.setAttribute('src',photo.urls.regular);
        // img.setAttribute('alt',photo.alt_description);
        // img.setAttribute('title',photo.alt_description);//put image inside <a> element
        setAttributes(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description
        })
        //event listener .check when each is finished loading......
        img.addEventListener('load',imageLoaded);
        item.appendChild(img);
        imageContainer.appendChild(item);


});
}
async function getPhotots(){
    try{
        const response=await fetch(apiUrl);
        photosArray=await response.json();
        console.log(photosArray)
        displayPhotos();


    }
    catch(error){
        //catch error here

    }

}
//check to see if scrolling near bottom of the page,load more image
window.addEventListener('scroll',() =>{
    if(window.innerHeight+window.scrollY >=  document.body.offsetHeight-1000 && ready){
        ready=false;
        getPhotots();
        console.log('load more');

    }

});


//onLoad
getPhotots();
