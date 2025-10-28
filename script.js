// script.js - review system using localStorage
(function(){
  const STORAGE_KEY = 'ekta_reviews_v1';

  const sampleReviews = [
    {name:'Aisha R.', rating:5, text:'Dr. Ekta helped me recover quickly after my ACL surgery. Very professional and explained exercises clearly.', date: new Date().toISOString()},
    {name:'Rahul M.', rating:4, text:'Great hands-on treatment and personalised program. My back pain is much better.', date: new Date().toISOString()}
  ];

  function $(sel){return document.querySelector(sel)}
  function $all(sel){return Array.from(document.querySelectorAll(sel))}

  function loadReviews(){
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      if(!raw){
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleReviews));
        return sampleReviews.slice();
      }
      return JSON.parse(raw) || [];
    }catch(e){
      console.error('Failed to load reviews', e);
      return [];
    }
  }

  function saveReviews(arr){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  }

  function esc(str){
    return String(str).replace(/[&<>"']/g, function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[m]});
  }

  function renderStars(rating){
    const full = Math.round(rating);
    let out='';
    for(let i=1;i<=5;i++){ out += `<span class="star">${i<=full? '★':'☆'}</span>` }
    return out;
  }

  function render(){
    const reviews = loadReviews();
    const list = $('#reviewsList');
    list.innerHTML = '';

    if(reviews.length===0){
      list.innerHTML = '<p class="muted">No reviews yet — be the first to leave feedback.</p>';
    }else{
      reviews.forEach((r, idx)=>{
        const d = new Date(r.date||Date.now());
        const el = document.createElement('div'); el.className='review';
        el.innerHTML = `
          <div class="rev-head">
            <div>
              <div class="rev-author">${esc(r.name)}</div>
              <div class="muted small">${d.toLocaleDateString()}</div>
            </div>
            <div class="rev-rating">${renderStars(r.rating)}</div>
          </div>
          <div class="rev-text">${esc(r.text)}</div>
        `;
        list.appendChild(el);
      });
    }

    const avg = reviews.reduce((s, r)=>s + (r.rating||0), 0) / (reviews.length || 1);
    $('#avgRating').textContent = reviews.length ? (Math.round(avg*10)/10).toFixed(1) : '0.0';
    $('#avgStars').innerHTML = renderStars(avg);
    $('#reviewCount').textContent = `${reviews.length} review${reviews.length!==1?'s':''}`;
  }

  function init(){
    // set year
    document.getElementById('year').textContent = new Date().getFullYear();

    render();

    const form = document.getElementById('reviewForm');
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const name = document.getElementById('reviewerName').value.trim();
      const rating = parseInt(document.getElementById('reviewRating').value,10);
      const text = document.getElementById('reviewText').value.trim();

      if(!name || !text || !rating){
        alert('Please fill all review fields.');
        return;
      }

      const reviews = loadReviews();
      const newReview = {name, rating, text, date: new Date().toISOString()};
      reviews.unshift(newReview); // newest first
      saveReviews(reviews);
      form.reset();
      render();
      // focus list for accessibility
      document.getElementById('reviewsList').focus();
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
