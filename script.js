const rangeSelect = document.getElementById('range');
const timeline = document.getElementById('timeline');

const ranges = {
  7: [
    { title: 'Pilot signed with Nova Corp', sub: 'Initial $4.8k ARR', time: 'Today, 2:05 PM' },
    { title: 'Weekly sync completed', sub: 'Reviewed Q3 priorities', time: 'Yesterday, 10:20 AM' },
    { title: 'Billing error resolved', sub: 'Refunded duplicate invoice', time: 'Mon, 5:45 PM' }
  ],
  30: [
    { title: 'North America expansion closed', sub: 'Signed $24k ARR upgrade', time: 'Today, 3:10 PM' },
    { title: 'Onboarding program launched', sub: 'New guided setup for enterprise', time: 'Yesterday, 9:45 AM' },
    { title: 'Ticket backlog cleared', sub: 'Support team resolved 186 tickets', time: 'Mon, 4:20 PM' }
  ],
  90: [
    { title: 'New data center live', sub: 'Latency reduced by 38%', time: 'Oct 02, 11:00 AM' },
    { title: 'ISO 27001 renewal', sub: 'Audit completed successfully', time: 'Sep 18, 4:30 PM' },
    { title: 'APAC partnership', sub: 'Closed with Zephyr Global', time: 'Aug 29, 1:50 PM' }
  ]
};

function renderTimeline(items) {
  timeline.innerHTML = items
    .map(
      (item) => `
        <li class="timeline__item">
          <span class="timeline__dot"></span>
          <div>
            <p class="list__title">${item.title}</p>
            <p class="list__sub">${item.sub}</p>
          </div>
          <time class="timestamp">${item.time}</time>
        </li>`
    )
    .join('');
}

rangeSelect.addEventListener('change', (event) => {
  const value = event.target.value;
  renderTimeline(ranges[value]);
});

renderTimeline(ranges[rangeSelect.value]);
