// const BACKEND = 'http://127.0.0.1:8000'

// async function loadData() {
//   const summariesRes = await fetch(`${BACKEND}/summaries`)
//   const tasksRes = await fetch(`${BACKEND}/tasks?completed=false`)

//   const summaries = await summariesRes.json()
//   const tasks = await tasksRes.json()

//   const summariesDiv = document.getElementById('summaries')
//   summaries.forEach(s => {
//     const p = document.createElement('p')
//     p.textContent = s.summary
//     summariesDiv.appendChild(p)
//   })

//   const tasksDiv = document.getElementById('tasks')
//   tasks.forEach(t => {
//     const div = document.createElement('div')
//     // div.innerHTML = `
//     //   <strong>${t.title}</strong><br/>
//     //   Due: ${t.due_date || '—'}
//     //   <button data-title="${t.title}" data-date="${t.due_date}">
//     //     Push
//     //   </button>
//     //`
//     //  tasksDiv.appendChild(div)
//     div.className = 'card'

//   div.innerHTML = `
//     <div class="task-title">${t.title}</div>
//     <div class="task-meta">
//       Due: ${t.due_date ? new Date(t.due_date).toLocaleString() : '—'}
//     </div>
//     <div class="task-actions">
//       <button data-title="${t.title}" data-date="${t.due_date}">
//         Push to Calendar
//       </button>
//     </div>
//   `
//     tasksDiv.appendChild(div)
//   })

//   document.querySelectorAll('button').forEach(btn => {
//     btn.onclick = async () => {
//       await fetch(`${BACKEND}/calendar/push`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           title: btn.dataset.title,
//           due_date: btn.dataset.date
//         })
//       })
//       alert('Added to calendar')
//     }
//   })
// }

// loadData()




const BACKEND = 'http://127.0.0.1:8000'

async function loadData() {
  try {
    const [summariesRes, tasksRes] = await Promise.all([
      fetch(`${BACKEND}/summaries`),
      fetch(`${BACKEND}/tasks?completed=false`)
    ])

    const summaries = await summariesRes.json()
    const tasks = await tasksRes.json()

    /* ---------- SUMMARIES ---------- */
    const summariesDiv = document.getElementById('summaries')
    summariesDiv.innerHTML = '' // clear old content

    summaries.forEach(s => {
      const div = document.createElement('div')
      div.className = 'card'
      div.textContent = s.summary
      summariesDiv.appendChild(div)
    })

    /* ---------- TASKS ---------- */
    const tasksDiv = document.getElementById('tasks')
    tasksDiv.innerHTML = '' // clear old content

    tasks.forEach(t => {
      const div = document.createElement('div')
      div.className = 'card'

      div.innerHTML = `
        <div class="task-title">${t.title}</div>
        <div class="task-meta">
          Due: ${t.due_date ? new Date(t.due_date).toLocaleString() : '—'}
        </div>
        <div class="task-actions">
          <button 
            class="push-btn"
            data-title="${t.title}"
            data-date="${t.due_date || ''}">
            Push to Calendar
          </button>
        </div>
      `

      tasksDiv.appendChild(div)
    })

    /* ---------- BUTTON HANDLERS ---------- */
    document.querySelectorAll('.push-btn').forEach(btn => {
      btn.onclick = async () => {
        try {
          await fetch(`${BACKEND}/calendar/push`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title: btn.dataset.title,
              due_date: btn.dataset.date
            })
          })

          alert('Added to Google Calendar')
        } catch (err) {
          console.error('Calendar push failed', err)
          alert('Failed to add event')
        }
      }
    })

  } catch (err) {
    console.error('Failed to load data', err)
  }
}

loadData()
