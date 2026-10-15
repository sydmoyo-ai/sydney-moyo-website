(function(){
const page=(location.pathname.split('/').pop()||'index.html').replace('.html','')==='index'?'home':location.pathname.split('/').pop().replace('.html','');
function el(tag,cls,txt){const n=document.createElement(tag);if(cls)n.className=cls;if(txt)n.textContent=txt;return n;}
function setText(selector,text){const n=document.querySelector(selector);if(n&&text)n.textContent=text;}
function setImage(selector,url){const n=document.querySelector(selector);if(n&&url)n.src=url;}
function renderItems(data){const items=data.items||[];if(!items.length)return;
const body=document.querySelector('.page-body');if(!body)return;
const old=body.querySelector('.panel');if(old)old.remove();
const holder=el('div','editable-items');
for(const item of items){const card=el('article','editable-card');
if(item.image){const img=el('img','editable-photo');img.src=item.image;img.alt=item.title||item.name||'Project photograph';card.append(img);}
const content=el('div','editable-copy');
content.append(el('h3','',item.title||item.name||'Untitled'));
if(item.role)content.append(el('p','editable-role',item.role));
if(item.authors)content.append(el('p','',item.authors+(item.year?' ('+item.year+').':'')+(item.journal?' '+item.journal+'.':'')));
if(item.description||item.bio)content.append(el('p','',item.description||item.bio));
if(item.url&&/^https:\/\//.test(item.url)){const a=el('a','text-link','View publication →');a.href=item.url;a.rel='noopener noreferrer';a.target='_blank';content.append(a);}
card.append(content);holder.append(card);}
body.append(holder);}
if(location.protocol==='file:')return;
fetch('/content/'+page+'.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error('Content unavailable');return r.json()}).then(data=>{
if(page==='home'){
setText('.hero h1',data.headline);setText('.hero .lead',data.intro);
setText('.two h2',data.welcome_heading);setText('.two p',data.welcome_text);
setImage('.hero-image',data.hero_image);setImage('.feature-img',data.welcome_image);
const cards=document.querySelectorAll('.card');fetch('/content/research.json').then(r=>r.json()).then(research=>{(research.items||[]).slice(0,3).forEach((item,i)=>{if(!cards[i])return;const h=cards[i].querySelector('h3'),p=cards[i].querySelector('p'),img=cards[i].querySelector('img');if(h)h.textContent=item.title;if(p)p.textContent=item.description;if(img&&item.image)img.src=item.image;});}).catch(()=>{});
}else{
setText('.page-hero h1',data.heading);setText('.page-body .lead',data.body);
if(page==='contact'&&data.email){const a=document.querySelector('.page-body a[href^="mailto:"]');if(a)a.href='mailto:'+data.email;}
if(['research','publications','people'].includes(page))renderItems(data);
}
}).catch(e=>console.warn('Using built-in page content:',e.message));
})();