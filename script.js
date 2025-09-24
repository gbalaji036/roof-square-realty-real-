async function loadResume() {
  try {
    const res = await fetch('resume.json')
    if (!res.ok) throw new Error('Failed to fetch resume')
    const data = await res.json()

    // Hero
    document.getElementById('name').textContent = data.name
    document.getElementById('summary').textContent = data.summary

    // Contact
    document.getElementById('address').textContent = data.address
    document.getElementById('phone').textContent = data.phone
    document.getElementById('email').textContent = data.email

    // Experience
    const jobsEl = document.getElementById('jobs')
    data.experience.forEach(job => {
      const art = document.createElement('article')
      art.innerHTML = `
        <h3>${job.role} @ ${job.company}</h3>
        <small>${job.period}</small>
        <ul>${job.duties.map(d => `<li>${d}</li>`).join('')}</ul>
      `
      jobsEl.appendChild(art)
    })

    // Education
    const eduEl = document.getElementById('edu')
    const e = data.education
    const eduArt = document.createElement('article')
    eduArt.innerHTML = `
      <h3>${e.degree}</h3>
      <small>${e.university} | ${e.period} | CGPA: ${e.cgpa}</small>
      <ul>${e.coursework.map(c => `<li>${c}</li>`).join('')}</ul>
    `
    eduEl.appendChild(eduArt)

    // Skills
    const skillsEl = document.getElementById('skillList')
    Object.entries(data.skills).forEach(([cat, items]) => {
      const li = document.createElement('li')
      li.textContent = `${cat.charAt(0).toUpperCase() + cat.slice(1)}: ${items.join(', ')}`
      skillsEl.appendChild(li)
    })

  } catch (err) {
    console.error(err)
    document.body.insertAdjacentHTML('afterbegin',
      '<p style="color:#f55; text-align:center;">Error loading resume data.</p>')
  }
}

window.addEventListener('DOMContentLoaded', loadResume)
