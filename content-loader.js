(function () {
  const filename = location.pathname.split('/').pop() || 'index.html';
  const page = filename === 'index.html' || filename === '' ? 'home' : filename.replace(/\.html$/, '');
  function el(tag, cls, txt) { const n = document.createElement(tag); if (cls) n.className = cls; if (txt) n.textContent = txt; return n; }
  function setText(selector, value) { const n = document.querySelector(selector); if (n && value != null) n.textContent = value; }
  function setImage(selector, url) { const n = document.querySelector(selector); if (n && url) n.src = url; }
  function renderItems(data) {
    const items = data.items || [];
    if (!items.length) return;
    const body = document.querySelector('.page-body');
    if (!body) return;
    const old = body.querySelector('.panel');
    if (old) old.remove();
    const previous = body.querySelector('.editable-items');
    if (previous) previous.remove();
    const holder = el('div', 'editable-items');
    for (const item of items) {
      const card = el('article', 'editable-card');
      if (item.image) { const img = el('img', 'editable-photo'); img.src = item.image; img.alt = item.title || item.name || 'Project photograph'; card.append(img); }
      const content = el('div', 'editable-copy');
      content.append(el('h3', '', item.title || item.name || 'Untitled'));
      if (item.role) content.append(el('p', 'editable-role', item.role));
      if (item.authors) content.append(el('p', '', item.authors + (item.year ? ' (' + item.year + ').' : '') + (item.journal ? ' ' + item.journal + '.' : '')));
      if (item.description || item.bio) content.append(el('p', '', item.description || item.bio));
      if (item.url && /^https:\/\//.test(item.url)) { const a = el('a', 'text-link', 'View publication →'); a.href = item.url; a.rel = 'noopener noreferrer'; a.target = '_blank'; content.append(a); }
      // Research themes may contain nested projects. Other collections retain their original card layout.
      if (page === 'research' && Array.isArray(item.projects) && item.projects.length) {
        const projects = el('div', 'research-projects');
        projects.style.cssText = 'display:grid;gap:1rem;margin-top:1.4rem;';
        for (const project of item.projects) {
          const projectCard = el('section', 'research-project');
          projectCard.style.cssText = 'padding:1rem 1.2rem;border:1px solid rgba(100,120,100,.25);border-radius:12px;';
          if (project.image) { const img = el('img', 'editable-photo'); img.src = project.image; img.alt = project.title || 'Research project'; img.style.cssText = 'max-width:100%;height:auto;border-radius:8px;margin-bottom:.75rem;'; projectCard.append(img); }
          projectCard.append(el('h4', '', project.title || 'Untitled project'));
          if (project.description) projectCard.append(el('p', '', project.description));
          projects.append(projectCard);
        }
        content.append(projects);
      }
      card.append(content); holder.append(card);
    }
    body.append(holder);
  }
  function renderPeople(data) {
    const target = document.getElementById('people-directory');
    if (!target) return;
    setText('#people-heading', data.heading);
    setText('#people-intro', data.body);
    setText('#people-join-heading', data.join_heading);
    setText('#people-join-text', data.join_text);
    target.replaceChildren();
    const groups = [
  'Principal Investigator',
  'Graduate Students',
  'Undergraduate Researchers',
  'Postdoctoral Researchers',
  'Alumni'
];
    function portrait(person) {
      if (person.image) { const img = el('img','people-portrait'); img.src=person.image; img.alt='Portrait of '+person.name; img.loading='lazy'; return img; }
      const placeholder = el('div','people-placeholder'); placeholder.setAttribute('aria-label','Photo coming soon'); placeholder.textContent=(person.name||'?').split(/\s+/).slice(0,2).map(x=>x[0]).join('').toUpperCase(); return placeholder;
    }
    for (const group of groups) {
      const people=(data.items||[]).filter(p=>p.group===group);
      if (!people.length) continue;
      const section=el('section','people-section');
      section.append(el('h2','people-title',group));
     const grid = el('div', group === 'Principal Investigator' ? 'people-pi' : group === 'Graduate Students' ? 'people-graduate-grid' : group === 'Alumni' ? 'people-alumni' : 'people-card-grid');
      for (const person of people) {
        const card=el('article','people-card');
        const photo=portrait(person);
        const copy=el('div','people-copy');
        copy.append(el('h3','',person.name));
        if (person.role) copy.append(el('p','people-role',person.role));
        if (person.bio) copy.append(el('p','',person.bio));
        if (person.url && /^(https:\/\/|[a-z0-9-]+\.html$)/i.test(person.url)) {const link=el('a','people-button','View full profile →'); link.href=person.url; if (person.url.startsWith('https://')) {link.target='_blank';link.rel='noopener noreferrer';} copy.append(link);}
        if (group==='Principal Investigator') {grid.append(photo,copy);} else {card.append(photo,copy);grid.append(card);}
      }
      section.append(grid);target.append(section);
    }
  }
 
  function renderTeaching(data) {
    const sections = document.querySelectorAll(
      '.teaching-content .teaching-section'
    );
    if (sections.length < 4) return;

    setText('.page-hero h1', data.heading);

    // Teaching philosophy
    const philosophy = sections[0];
    const philosophyHeading = philosophy.querySelector('h2');
    if (philosophyHeading && data.philosophy_heading) {
      philosophyHeading.textContent = data.philosophy_heading;
    }
    if (Array.isArray(data.philosophy_paragraphs)) {
      philosophy.querySelectorAll('p').forEach(p => p.remove());
      data.philosophy_paragraphs.forEach(paragraph => {
        philosophy.append(el('p', '', paragraph));
      });
    }

    // Courses at LSU
    const coursesSection = sections[1];
    const coursesHeading = coursesSection.querySelector('h2');
    if (coursesHeading && data.courses_heading) {
      coursesHeading.textContent = data.courses_heading;
    }
    const courseGrid = coursesSection.querySelector('.course-grid');
    if (courseGrid && Array.isArray(data.courses)) {
      courseGrid.replaceChildren();
      data.courses.forEach(course => {
        const card = el('article', 'course-card');
        card.append(el('div', 'course-code', course.code || ''));
        card.append(el('h3', '', course.title || ''));
        card.append(el('p', '', course.description || ''));
        courseGrid.append(card);
      });
    }

    // Learning by doing
    const learning = sections[2];
    const learningHeading = learning.querySelector('h2');
    if (learningHeading && data.learning_heading) {
      learningHeading.textContent = data.learning_heading;
    }
    const learningParagraph = learning.querySelector('p');
    if (learningParagraph && data.learning_text != null) {
      learningParagraph.textContent = data.learning_text;
    }

    // Student mentorship
    const mentorship = sections[3];
    const mentorshipHeading = mentorship.querySelector('h2');
    if (mentorshipHeading && data.mentorship_heading) {
      mentorshipHeading.textContent = data.mentorship_heading;
    }
    const mentorshipParagraph = mentorship.querySelector('p');
    if (mentorshipParagraph && data.mentorship_text != null) {
      mentorshipParagraph.textContent = data.mentorship_text;
    }
  }

  if (location.protocol === 'file:') return;
fetch(page + '.json', { cache: 'no-cache' })
    .then(r => { if (!r.ok) throw Error('Content unavailable'); return r.json(); })
    .then(data => {
      if (page === 'people') { renderPeople(data); } else if (page === 'home') {
        setText('.hero h1', data.headline); setText('.hero .lead', data.intro);
        setText('.two h2', data.welcome_heading); setText('.two p', data.welcome_text);
        setImage('.hero-image', data.hero_image); setImage('.feature-img', data.welcome_image);
        const cards = document.querySelectorAll('.card');
        fetch('/sydney-moyo-website/research.json').then(r => r.json()).then(research => {
          (research.items || []).slice(0, 3).forEach((item, i) => {
            if (!cards[i]) return;
            const h = cards[i].querySelector('h3'), p = cards[i].querySelector('p'), img = cards[i].querySelector('img');
            if (h) h.textContent = item.title;
            if (p) p.textContent = item.description;
            if (img && item.image) img.src = item.image;
          });
        }).catch(() => {});
      } else {
        setText('.page-hero h1', data.heading); setText('.page-body .lead', data.body);
        if (page === 'contact' && data.email) { const a = document.querySelector('.page-body a[href^="mailto:"]'); if (a) a.href = 'mailto:' + data.email; }
        if (['research', 'publications', 'people'].includes(page)) renderItems(data);
      }
    }).catch(e => console.warn('Using built-in page content:', e.message));
})();
