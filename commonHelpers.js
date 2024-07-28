import{a as L,i as m,S as w}from"./assets/vendor-c493984e.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const S="45141077-2f2085cf6ccd740accb993600",T="https://pixabay.com/api/",x=document.querySelector(".search-form"),f=document.querySelector(".input-field"),p=document.querySelector(".gallery-result-list"),E=document.querySelector(".query-word"),P=document.querySelector(".more"),$=document.querySelector(".top"),d=t=>({enable:()=>document.querySelector(t).classList.remove("disabled"),disable:()=>document.querySelector(t).classList.add("disabled")}),n=d(".spinner"),l=d(".loading-text"),b=d(".query-text"),c=d(".more"),u=d(".top");x.addEventListener("submit",t=>{t.preventDefault();const r=f.value;g=1,q(r,g),E.textContent=f.value});let g=1,v=0,h=30;async function q(t,r=1){n.enable(),l.enable(),r===1&&(p.innerHTML="");try{const o=await L.get(T,{params:{key:S,q:t,image_type:"photo",orientation:"horizontal",safesearch:"true",page:r,per_page:h}}),i=Math.ceil(o.data.totalHits/h);return o.data.hits?(v=o.data.totalHits,B(o.data.hits),n.disable(),l.disable(),b.enable(),g=r):r>i?(c.disable(),u.disable(),l.disable,n.disable(),m.warning({position:"topRight",message:"We're sorry, but you've reached the end of search results."})):(c.disable(),u.disable(),m.warning({message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"#ef4040",messageColor:"#fff"})),o.data}catch(o){throw n.disable(),l.disable(),c.disable(),u.disable(),console.error(o),m.warning({title:"Error",message:"An error occurred while fetching images"}),new Error(`Error! status: ${res.status}`)}}const C="Sorry, there are no images matching your search query. Please try again!";function B(t,r){if(r===1&&(p.innerHTML=""),v>t.length&&(c.enable(),u.enable()),t.length===0){n.disable(),l.disable(),b.disable(),c.disable(),u.disable(),m.warning({message:C,backgroundColor:"#ef4040",messageColor:"#fff",position:"topRight",timeout:2e3}),setTimeout(y,2e3);return}const o=t.map(I).join("");p.insertAdjacentHTML("beforeend",o),setTimeout(y,500),H.refresh()}function y(){f.value=""}const H=new w(".gallery-result-list a",{captions:!0,captionsData:"alt",captionDelay:250,close:!0,className:"simpleLightboxGallery",doubleTapZoom:2,scrollZoom:!0,overlay:!0});function I({webformatURL:t,largeImageURL:r,tags:o,downloads:i,likes:e,comments:s,views:a}){return`<li class="list-container">
    <div>
      <div class="image-container">
        <a href="${r}">
          <img src="${t}" alt="${o}" />
        </a>
      </div>
      <div class="descr-element">
        <ul class="descr-list">
          <li>
            <h3>Likes</h3>
              <p>${e}</p>
          </li>
          <li>
            <h3>Views</h3>
              <p>${a}</p>
          </li>
          <li>
            <h3>Comments</h3>
            <p>${s}</p>
          </li>
          <li>
            <h3>Downloads</h3>
              <p>${i}</p>
          </li>
        </ul>
      </div>
    </div>
  </li>`}P.addEventListener("click",()=>{const t=f.value;q(t,g+1)});p.getBoundingClientRect();$.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})});
//# sourceMappingURL=commonHelpers.js.map
