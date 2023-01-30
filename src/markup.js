export function createMarkup(array){
    return array.map(({id, webformatURL, largeImageURL, tags, likes, views, comments, downloads})=>{
        return `<a class="gallery__link" href=${largeImageURL}>
        <div class="gallery-item" id="${id}">
  <img  class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" width=370px height=294px/>
  <div class="info">
    <p class="info-item">
      <b>Likes </b> ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>  ${views}
    </p>
    <p class="info-item">
      <b>Comments </b> ${comments}
    </p>
    <p class="info-item">
      <b>Downloads </b> ${downloads}
    </p>
  </div>
</div>
</a>`
    }).join('')
}