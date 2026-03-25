/* ===== CAE DASHBOARD - app.js ===== */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initHeader();
  initCharts();
  animateMetrics();
  initCalendar();
  initModals();
});

/* ===== NAVIGATION ===== */
function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const page = item.dataset.page;
      navigateTo(page);
      // Close sidebar on mobile
      if (window.innerWidth <= 900) {
        document.getElementById('sidebar').classList.remove('open');
      }
    });
  });
}

function navigateTo(page) {
  // Update nav active state
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const activeNav = document.querySelector(`.nav-item[data-page="${page}"]`);
  if (activeNav) activeNav.classList.add('active');

  // Show correct page
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const activePage = document.getElementById(`page-${page}`);
  if (activePage) activePage.classList.add('active');

  // Init page-specific features
  if (page === 'relatorios') {
    setTimeout(() => initFullCharts(), 100);
  }
  if (page === 'agenda') {
    renderCalendar();
  }
}

/* ===== HEADER ===== */
function initHeader() {
  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  menuToggle?.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  // Close sidebar when clicking outside
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 900 &&
        !sidebar.contains(e.target) &&
        !menuToggle.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  });

  // Notification panel
  const notifBtn = document.getElementById('notifBtn');
  const notifPanel = document.getElementById('notifPanel');
  const closeNotif = document.getElementById('closeNotif');

  notifBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    notifPanel.classList.toggle('open');
    userDropdown.classList.remove('open');
  });

  closeNotif?.addEventListener('click', () => {
    notifPanel.classList.remove('open');
  });

  // User dropdown
  const userBtn = document.getElementById('userBtn');
  const userDropdown = document.getElementById('userDropdown');

  userBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    userDropdown.classList.toggle('open');
    notifPanel.classList.remove('open');
  });

  document.addEventListener('click', () => {
    userDropdown?.classList.remove('open');
    notifPanel?.classList.remove('open');
  });
}

/* ===== METRIC COUNTER ANIMATION ===== */
function animateMetrics() {
  const metricValues = document.querySelectorAll('.metric-value[data-target]');
  metricValues.forEach(el => {
    const target = parseInt(el.dataset.target);
    const duration = 1200;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current);
    }, 16);
  });
}

/* ===== CHARTS ===== */
let barChartInstance = null;
let pieChartInstance = null;
let barChartFullInstance = null;
let pieChartFullInstance = null;

function initCharts() {
  // Bar Chart - Dashboard
  const barCtx = document.getElementById('barChart')?.getContext('2d');
  if (barCtx && !barChartInstance) {
    barChartInstance = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out'],
        datasets: [{
          label: 'Atendimentos',
          data: [42, 58, 51, 67, 73, 60, 82, 75, 88, 87],
          backgroundColor: '#2563b0',
          borderRadius: 4,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1a3a6b',
            titleFont: { size: 12 },
            bodyFont: { size: 12 },
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { size: 10 }, color: '#94a3b8' }
          },
          y: {
            grid: { color: '#f1f5f9' },
            ticks: { font: { size: 10 }, color: '#94a3b8' },
            beginAtZero: true
          }
        }
      }
    });
  }

  // Pie Chart - Dashboard
  const pieCtx = document.getElementById('pieChart')?.getContext('2d');
  if (pieCtx && !pieChartInstance) {
    pieChartInstance = new Chart(pieCtx, {
      type: 'doughnut',
      data: {
        labels: ['Consultoria', 'Cursos', 'Outros'],
        datasets: [{
          data: [45, 35, 20],
          backgroundColor: ['#1e4d8c', '#2ecc71', '#e67e22'],
          borderWidth: 2,
          borderColor: '#ffffff',
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1a3a6b',
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${ctx.parsed}%`
            }
          }
        },
        cutout: '60%'
      }
    });
  }
}

function initFullCharts() {
  // Bar Chart Full - Relatórios page
  const barCtxFull = document.getElementById('barChartFull')?.getContext('2d');
  if (barCtxFull && !barChartFullInstance) {
    barChartFullInstance = new Chart(barCtxFull, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [{
          label: 'Atendimentos',
          data: [42, 58, 51, 67, 73, 60, 82, 75, 88, 87, 91, 95],
          backgroundColor: '#2563b0',
          borderRadius: 5,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { backgroundColor: '#1a3a6b' }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { size: 11 }, color: '#94a3b8' }
          },
          y: {
            grid: { color: '#f1f5f9' },
            ticks: { font: { size: 11 }, color: '#94a3b8' },
            beginAtZero: true
          }
        }
      }
    });
  }

  // Pie Chart Full - Relatórios page
  const pieCtxFull = document.getElementById('pieChartFull')?.getContext('2d');
  if (pieCtxFull && !pieChartFullInstance) {
    pieChartFullInstance = new Chart(pieCtxFull, {
      type: 'doughnut',
      data: {
        labels: ['Consultoria', 'Cursos', 'Outros'],
        datasets: [{
          data: [45, 35, 20],
          backgroundColor: ['#1e4d8c', '#2ecc71', '#e67e22'],
          borderWidth: 2,
          borderColor: '#ffffff',
          hoverOffset: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1a3a6b',
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${ctx.parsed}%`
            }
          }
        },
        cutout: '55%'
      }
    });
  }
}

/* ===== CALENDAR ===== */
let currentDate = new Date(2024, 3, 1); // April 2024
let selectedDay = null;

const agendaEvents = {
  '2024-04-26': [
    { time: '14:00', name: 'João Mendes', service: 'Mentoria de Negócios' }
  ],
  '2024-04-27': [
    { time: '10:30', name: 'Lucia Ferliare', service: 'Treinamento de Vendas' },
    { time: '15:00', name: 'Paulo Rocha', service: 'Consultor Jurídico' }
  ],
  '2024-04-28': [
    { time: '09:00', name: 'Sandra Moura', service: 'Plano de Marketing' }
  ],
  '2024-04-22': [
    { time: '11:00', name: 'Patrícia Alves', service: 'Consultoria Financeira' }
  ],
  '2024-04-15': [
    { time: '14:00', name: 'Fernando Dias', service: 'Curso de Gestor' },
    { time: '16:00', name: 'Marcos Reis', service: 'Mentoria de Negócios' }
  ]
};

const monthNames = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

function renderCalendar() {
  const grid = document.getElementById('calendarGrid');
  const monthYearEl = document.getElementById('currentMonthYear');
  if (!grid) return;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  monthYearEl.textContent = `${monthNames[month]} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  grid.innerHTML = '';

  // Day headers
  dayNames.forEach(d => {
    const header = document.createElement('div');
    header.className = 'cal-day-header';
    header.textContent = d;
    grid.appendChild(header);
  });

  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement('div');
    empty.className = 'cal-day empty';
    grid.appendChild(empty);
  }

  // Day cells
  for (let d = 1; d <= daysInMonth; d++) {
    const cell = document.createElement('div');
    cell.className = 'cal-day';
    cell.textContent = d;

    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

    if (today.getFullYear() === year && today.getMonth() === month && today.getDate() === d) {
      cell.classList.add('today');
    }

    if (agendaEvents[dateKey]) {
      cell.classList.add('has-event');
    }

    if (selectedDay === dateKey) {
      cell.classList.add('selected');
    }

    cell.addEventListener('click', () => {
      selectedDay = dateKey;
      renderCalendar();
      showDayEvents(dateKey);
    });

    grid.appendChild(cell);
  }

  // Setup prev/next buttons
  document.getElementById('prevMonth').onclick = () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  };
  document.getElementById('nextMonth').onclick = () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  };
}

function showDayEvents(dateKey) {
  const container = document.getElementById('dayEvents');
  const events = agendaEvents[dateKey];

  if (!events || events.length === 0) {
    container.innerHTML = '<p class="no-events">Nenhum agendamento para este dia.</p>';
    return;
  }

  container.innerHTML = events.map(ev => `
    <div class="event-item">
      <span class="event-time">${ev.time}</span>
      <div>
        <div class="event-name">${ev.name}</div>
        <div class="event-service">${ev.service}</div>
      </div>
    </div>
  `).join('');
}

function initCalendar() {
  // Calendar will be rendered when navigating to agenda page
}

/* ===== MODALS ===== */
function initModals() {
  // Close on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('open');
      }
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
    }
  });
}

function openModal(id) {
  document.getElementById(id)?.classList.add('open');
}

function closeModal(id) {
  document.getElementById(id)?.classList.remove('open');
}

function saveAndClose(id) {
  closeModal(id);
  showToast('Salvo com sucesso!', 'success');
}

/* ===== TOAST ===== */
function showToast(message, type = '') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast show ${type}`;
  setTimeout(() => {
    toast.className = 'toast';
  }, 3000);
}

/* ===== SEARCH / FILTER ===== */
function filterTable() {
  const query = document.getElementById('searchEmp')?.value.toLowerCase() || '';
  const rows = document.querySelectorAll('#empTable tbody tr');
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(query) ? '' : 'none';
  });
}
