const BACKEND = 'http://127.0.0.1:8000'

async function loadData() {
  const summaries = await fetch(`${BACKEND}/summaries`).then(r => r.json())
  const tasks = await fetch(`${BACKEND}/tasks?completed=false`).then(r => r.json())

  const summariesDiv = document.getElementById('summaries')
  // summariesDiv.innerHTML = '<h3>Summaries</h3>'
  summariesDiv.innerHTML = ''

  summaries.forEach(s => {
    const div = document.createElement('div')
    div.className = 'card'
    div.textContent = s.summary
    summariesDiv.appendChild(div)
  })

  const tasksDiv = document.getElementById('tasks')
  // tasksDiv.innerHTML = '<h3>Tasks</h3>'
  tasksDiv.innerHTML = ''

  tasks.forEach(t => {
    const div = document.createElement('div')
    div.className = 'card'
    div.innerHTML = `
      <div class="task-title">${t.title}</div>
      <div class="task-meta">
        Due: ${t.due_date ? new Date(t.due_date).toLocaleString() : '—'}
      </div>
      <button data-title="${t.title}" data-date="${t.due_date}">
        Push to Calendar
      </button>
    `
    tasksDiv.appendChild(div)
  })
}

loadData()
