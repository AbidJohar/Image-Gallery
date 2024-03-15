
const accessKey = 'oGfSkMny08NvXaTOP1YMAHI7sSBAvaSYm5pv_zHPp-M';
// oGfSkMny08NvXaTOP1YMAHI7sSBAvaSYm5pv_zHPp-M
var searchForm = document.querySelector("form");
var searchInput = document.getElementById("searchinput");
var imgcontainer = document.getElementById("container");
var btnload = document.querySelector(".btn_load");
var page=1;
var forBtn = true;
const fetchImage = async (query,page)=>{
   if(page===1){
    imgcontainer.innerHTML = "";
   }
    forBtn == true ? btnload.style.opacity = '1' : btnload.style.opacity = '1'
   var url = `https://api.unsplash.com/search/photos?query=${query}&per_page=27&client_id=${accessKey}`;
   var response = await fetch(url);
   var dataImg =  await response.json();
   console.log(dataImg);
  dataImg.results.forEach( (photo,page) => {
  const imgDiv = document.createElement('div');
  

  imgDiv.innerHTML = `<img src="${photo.urls.thumb}"/>`;
  
  imgcontainer.appendChild(imgDiv);


  imgDiv.addEventListener('click', (function(photo) {
   return function() {
      // for hidden the load more button when click on one photo
      forBtn = false;
      if(!forBtn){
         btnload.style.opacity = '0';
         forBtn = true;
      }
     const soloImg = document.createElement('div');
     soloImg.innerHTML = `<img src="${photo.urls.full}" "/>
     <button class="download-btn">Download</button>`;
     imgcontainer.innerHTML = '';
     imgcontainer.appendChild(soloImg);

     const downloadBtn = soloImg.querySelector('.download-btn');
     downloadBtn.addEventListener('click', function () {
       window.location.href = photo.links.download;
     });
   };
 })(photo));
   
  });
 
}

searchForm.addEventListener('submit', function(elem){
    elem.preventDefault();
     const textImg = searchInput.value.trim();
     if(textImg !== ""){
      page = 1;
        fetchImage(textImg,page);

     }
     else{
        imgcontainer.innerHTML = `<h2>Please search a photo </h2>`;
        console.log("enter words");
     }
});

btnload.addEventListener('click', function(){
   fetchImage(searchInput.value.trim(), ++page);

});


  






