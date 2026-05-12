/**
  script.js — GCECC POS Admin System
  Ready for backend integration — all data operations are
    isolated in the store object and helper functions
    Replace store.* arrays with fetch() API calls when backend is ready
 */

//1. DATA STORE  (replace with API calls for backend)
const store = {
  categories: [
    { id: 1, name: 'PE Uniforms',    desc: 'Jogging pants and T-shirts' },
    { id: 2, name: 'NSTP Shirts',    desc: 'National Service Training Program shirts' },
    { id: 3, name: 'School Uniform', desc: 'Official school uniform sets' },
    { id: 4, name: 'Books',          desc: 'Textbooks and reference materials' },
    { id: 5, name: 'ID Laces CCS',   desc: 'Program-colored ID lanyards' },

  ],
  products: [
    // PE Uniforms
    { id:1,  name:'PE Jogging Pants',   catId:1, price:650,  stock:30, lowStock:5, barcode:'8934670001', unit:'pcs', size:'S' },
    { id:2,  name:'PE Jogging Pants',   catId:1, price:650,  stock:28, lowStock:5, barcode:'8934670002', unit:'pcs', size:'M' },
    { id:3,  name:'PE Jogging Pants',   catId:1, price:650,  stock:20, lowStock:5, barcode:'8934670003', unit:'pcs', size:'L' },
    { id:4,  name:'PE Jogging Pants',   catId:1, price:650,  stock:15, lowStock:5, barcode:'8934670004', unit:'pcs', size:'XL' },
    { id:5,  name:'PE T-Shirt',         catId:1, price:650,  stock:40, lowStock:5, barcode:'8934670005', unit:'pcs', size:'S' },
    { id:6,  name:'PE T-Shirt',         catId:1, price:650,  stock:35, lowStock:5, barcode:'8934670006', unit:'pcs', size:'M' },
    { id:7,  name:'PE T-Shirt',         catId:1, price:650,  stock:30, lowStock:5, barcode:'8934670007', unit:'pcs', size:'L' },
    { id:8,  name:'PE T-Shirt',         catId:1, price:650,  stock:18, lowStock:5, barcode:'8934670008', unit:'pcs', size:'XL' },
    // NSTP Shirts
    { id:9,  name:'NSTP Shirt',         catId:2, price:650,  stock:25, lowStock:5, barcode:'8934670009', unit:'pcs', size:'S' },
    { id:10, name:'NSTP Shirt',         catId:2, price:650,  stock:22, lowStock:5, barcode:'8934670010', unit:'pcs', size:'M' },
    { id:11, name:'NSTP Shirt',         catId:2, price:650,  stock:20, lowStock:5, barcode:'8934670011', unit:'pcs', size:'L' },
    { id:12, name:'NSTP Shirt',         catId:2, price:650,  stock:12, lowStock:5, barcode:'8934670012', unit:'pcs', size:'XL' },
    { id:13, name:'NSTP Shirt',         catId:2, price:650,  stock:8,  lowStock:3, barcode:'8934670013', unit:'pcs', size:'2XL' },
    // School Uniform
    { id:14, name:'Uniform Set (Girl)', catId:3, price:650,  stock:15, lowStock:3, barcode:'8934670014', unit:'set', size:'S' },
    { id:15, name:'Uniform Set (Girl)', catId:3, price:650,  stock:12, lowStock:3, barcode:'8934670015', unit:'set', size:'M' },
    { id:16, name:'Uniform Set (Girl)', catId:3, price:650,  stock:10, lowStock:3, barcode:'8934670016', unit:'set', size:'L' },
    { id:17, name:'Uniform Set (Boy)',  catId:3, price:650,  stock:14, lowStock:3, barcode:'8934670017', unit:'set', size:'S' },
    { id:18, name:'Uniform Set (Boy)',  catId:3, price:650,  stock:11, lowStock:3, barcode:'8934670018', unit:'set', size:'M' },
    { id:19, name:'Uniform Set (Boy)',  catId:3, price:650,  stock:9,  lowStock:3, barcode:'8934670019', unit:'set', size:'L' },
    // Books
    { id:20, name:'ALAMAT NI PRINCESS ABELLA',  catId:4, price:480,  stock:20, lowStock:3, barcode:'8934670020', unit:'pcs', size:'' },
    { id:21, name:'ANG SUMPA NI SHANE',         catId:4, price:450,  stock:18, lowStock:3, barcode:'8934670021', unit:'pcs', size:'' },
    { id:22, name:'THE BALAT SA PWET NI GLAI',  catId:4, price:420,  stock:15, lowStock:3, barcode:'8934670022', unit:'pcs', size:'' },
    { id:23, name:'TOP 10 NA CRUSH NI SHANE',   catId:4, price:590,  stock:10, lowStock:3, barcode:'8934670023', unit:'pcs', size:'' },
    { id:24, name:'THE POWERPUFF GIRLS',        catId:4, price:460,  stock:12, lowStock:3, barcode:'8934670024', unit:'pcs', size:'' },
    // ID Laces CCS
    { id:25, name:'ID Lace - BSIT',  catId:5, price:180,   stock:80, lowStock:10, barcode:'8934670025', unit:'pcs', size:'' },
    { id:26, name:'ID Lace - BSCS',  catId:5, price:180,   stock:80, lowStock:10, barcode:'8934670026', unit:'pcs', size:'' },
    { id:27, name:'ID Lace - BSEMC',  catId:5, price:180,   stock:80, lowStock:10, barcode:'8934670027', unit:'pcs', size:'' },

],
  transactions: [],
  itemsAdded: [],   
  nextId: { cat: 6, prod: 30, tx: 1 },
};

let cart = [];


//2. NAVIGATION
const PAGE_TITLES = {
  'dashboard-section':     'Dashboard',
  'pos-section':           'Point of Sale',
  'view-category-section': 'Categories',
  'add-category-section':  'Add Category',
  'view-product-section':  'Products',
  'add-product-section':   'Add Product',
  'label-section':         'Product Labels',
};

function navigateTo(sectionId) {
  document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(sectionId);
  if (target) target.classList.add('active');

  const titleEl = document.getElementById('page-title');
  if (titleEl) titleEl.innerHTML = `<span>${PAGE_TITLES[sectionId] || sectionId}</span>`;

  const mobileTitleEl = document.getElementById('mobile-page-title');
  if (mobileTitleEl) mobileTitleEl.textContent = PAGE_TITLES[sectionId] || '';

  document.querySelectorAll('.nav-link, .sub-menu a').forEach(l => l.classList.remove('active-link'));
  const activeBtn = document.querySelector(`[data-target="${sectionId}"]`);
  if (activeBtn) activeBtn.classList.add('active-link');

  // Close mobile sidebar
  document.getElementById('sidebar')?.classList.remove('open');
  document.getElementById('sidebar-overlay')?.classList.remove('show');

  // Refresh page content
  if (sectionId === 'dashboard-section')     refreshDashboard();
  if (sectionId === 'view-category-section') renderCategoryTable();
  if (sectionId === 'view-product-section')  renderProductTable();
  if (sectionId === 'pos-section')           initPOS();
  if (sectionId === 'label-section')         initLabelPage();
  if (sectionId === 'add-product-section')   populateCategoryDropdown('prod-cat');
}

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const t = this.getAttribute('data-target');
    if (t) navigateTo(t);
  });
});

// Mobile sidebar toggle
document.getElementById('hamburger-btn')?.addEventListener('click', () => {
  document.getElementById('sidebar')?.classList.add('open');
  document.getElementById('sidebar-overlay')?.classList.add('show');
});
document.getElementById('sidebar-overlay')?.addEventListener('click', () => {
  document.getElementById('sidebar')?.classList.remove('open');
  document.getElementById('sidebar-overlay')?.classList.remove('show');
});


//3. TOAST
function showToast(message, type = 'success') {
  const toast  = document.getElementById('toast');
  const msgEl  = document.getElementById('toast-message');
  const iconEl = document.getElementById('toast-icon');
  msgEl.textContent = message;
  toast.className   = `toast ${type} show`;
  const icons = { success: 'check_circle', error: 'cancel', warning: 'warning' };
  iconEl.textContent = icons[type] || 'info';
  setTimeout(() => toast.classList.remove('show'), 3000);
}


//4. MODAL
function openModal(id)  { document.getElementById(id)?.classList.add('open'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }

document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', function(e) {
    if (e.target === this) closeModal(this.id);
  });
});


//5. DASHBOARD
let pieChartInstance = null;
let currentPeriod = 'day'; // day | week | month | year
let pendingScanProduct = null; //input after scan

//  Period helpers 
function getPeriodDates() {
  const now = new Date();
  switch (currentPeriod) {
    case 'day': {
      const v = document.getElementById('period-day-input')?.value;
      const d = v ? new Date(v + 'T00:00:00') : new Date(now.toDateString());
      const start = new Date(d); start.setHours(0,0,0,0);
      const end   = new Date(d); end.setHours(23,59,59,999);
      return { start, end };
    }
    case 'week': {
      const v = document.getElementById('period-week-input')?.value; // "2025-W20"
      if (v) {
        const [yr, wk] = v.split('-W').map(Number);
        const jan4 = new Date(yr, 0, 4);
        const startOfWeek1 = new Date(jan4);
        startOfWeek1.setDate(jan4.getDate() - (jan4.getDay() || 7) + 1);
        const start = new Date(startOfWeek1);
        start.setDate(startOfWeek1.getDate() + (wk - 1) * 7);
        start.setHours(0,0,0,0);
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        end.setHours(23,59,59,999);
        return { start, end };
      }
      const start = new Date(now);
      start.setDate(now.getDate() - (now.getDay() || 7) + 1);
      start.setHours(0,0,0,0);
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      end.setHours(23,59,59,999);
      return { start, end };
    }
    case 'month': {
      const v = document.getElementById('period-month-input')?.value; // "2025-05"
      const yr = v ? parseInt(v.split('-')[0]) : now.getFullYear();
      const mo = v ? parseInt(v.split('-')[1]) - 1 : now.getMonth();
      const start = new Date(yr, mo, 1, 0, 0, 0, 0);
      const end   = new Date(yr, mo + 1, 0, 23, 59, 59, 999);
      return { start, end };
    }
    case 'year': {
      const v = document.getElementById('period-year-input')?.value;
      const yr = v ? parseInt(v) : now.getFullYear();
      return { start: new Date(yr, 0, 1, 0, 0, 0), end: new Date(yr, 11, 31, 23, 59, 59, 999) };
    }
  }
}

function dateInRange(dateStr, { start, end }) {
  const d = new Date(dateStr + 'T00:00:00');
  if (isNaN(d.getTime())) return false;
  return d >= start && d <= end;
}

function setPeriod(period, btn) {
  currentPeriod = period;
  document.querySelectorAll('.period-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  // Show/hide pickers
  ['day','week','month','year'].forEach(p => {
    const el = document.getElementById(`period-${p}-wrap`);
    if (el) el.style.display = p === period ? 'flex' : 'none';
  });
  refreshDashboard();
}

function setPeriodToday() {
  const el = document.getElementById('period-day-input');
  if (el) { el.value = new Date().toISOString().split('T')[0]; refreshDashboard(); }
}
function setPeriodThisWeek() {
  const now = new Date();
  const yr = now.getFullYear();
  const start = new Date(now); start.setDate(now.getDate() - (now.getDay() || 7) + 1);
  const jan4  = new Date(yr, 0, 4);
  const startW1 = new Date(jan4); startW1.setDate(jan4.getDate() - (jan4.getDay() || 7) + 1);
  const wk = Math.ceil(((start - startW1) / 86400000 + 1) / 7);
  const el = document.getElementById('period-week-input');
  if (el) { el.value = `${yr}-W${String(wk).padStart(2,'0')}`; refreshDashboard(); }
}
function setPeriodThisMonth() {
  const now = new Date();
  const el = document.getElementById('period-month-input');
  if (el) { el.value = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`; refreshDashboard(); }
}
function setPeriodThisYear() {
  const el = document.getElementById('period-year-input');
  if (el) { el.value = String(new Date().getFullYear()); refreshDashboard(); }
}

function populateYearSelects() {
  const now = new Date().getFullYear();
  const years = [];
  for (let y = now; y >= now - 5; y--) years.push(y);
  ['period-year-input','sold-year-input','added-year-input'].forEach(id => {
    const sel = document.getElementById(id);
    if (!sel || sel.options.length > 1) return;
    sel.innerHTML = years.map(y => `<option value="${y}" ${y===now?'selected':''}>${y}</option>`).join('');
  });
}

// Mini table period selectors 
function refreshSoldTable() {
  const type = document.getElementById('sold-period-type')?.value || 'day';
  ['day','week','month','year'].forEach(p => {
    const el = document.getElementById(`sold-${p}-input`);
    if (el) el.style.display = p === type ? '' : 'none';
  });
  renderItemsSoldTable(getTablePeriodRange('sold'));
}
function refreshAddedTable() {
  const type = document.getElementById('added-period-type')?.value || 'day';
  ['day','week','month','year'].forEach(p => {
    const el = document.getElementById(`added-${p}-input`);
    if (el) el.style.display = p === type ? '' : 'none';
  });
  renderItemsAddedTable(getTablePeriodRange('added'));
}

function getTablePeriodRange(prefix) {
  const type = document.getElementById(`${prefix}-period-type`)?.value || 'day';
  const now = new Date();
  switch(type) {
    case 'day': {
      const v = document.getElementById(`${prefix}-day-input`)?.value;
      const d = v ? new Date(v + 'T00:00:00') : new Date();
      const start = new Date(d); start.setHours(0,0,0,0);
      const end   = new Date(d); end.setHours(23,59,59,999);
      return { start, end };
    }
    case 'week': {
      const v = document.getElementById(`${prefix}-week-input`)?.value;
      if (v) {
        const [yr, wk] = v.split('-W').map(Number);
        const jan4 = new Date(yr, 0, 4);
        const sw1  = new Date(jan4); sw1.setDate(jan4.getDate() - (jan4.getDay()||7) + 1);
        const start = new Date(sw1); start.setDate(sw1.getDate() + (wk-1)*7); start.setHours(0,0,0,0);
        const end   = new Date(start); end.setDate(start.getDate()+6); end.setHours(23,59,59,999);
        return { start, end };
      }
      const start = new Date(now); start.setDate(now.getDate()-(now.getDay()||7)+1); start.setHours(0,0,0,0);
      const end   = new Date(start); end.setDate(start.getDate()+6); end.setHours(23,59,59,999);
      return { start, end };
    }
    case 'month': {
      const v = document.getElementById(`${prefix}-month-input`)?.value;
      const yr = v ? parseInt(v.split('-')[0]) : now.getFullYear();
      const mo = v ? parseInt(v.split('-')[1])-1 : now.getMonth();
      return { start: new Date(yr,mo,1,0,0,0), end: new Date(yr,mo+1,0,23,59,59,999) };
    }
    case 'year': {
      const v = document.getElementById(`${prefix}-year-input`)?.value;
      const yr = v ? parseInt(v) : now.getFullYear();
      return { start: new Date(yr,0,1,0,0,0), end: new Date(yr,11,31,23,59,59,999) };
    }
  }
}

function renderItemsSoldTable(range) {
  const filteredTx = store.transactions.filter(tx => dateInRange(tx.date, range));
  const itemRows = [];
  filteredTx.forEach(tx => {
    tx.items.forEach(item => {
      itemRows.push({
        orNum: String(tx.id).padStart(6,'0'),
        name:  item.name,
        size:  item.size || '',
        qty:   item.qty,
        price: item.price,
        total: item.price * item.qty,
        date:  new Date(tx.date + 'T00:00:00').toLocaleDateString('en-PH'),
        time:  tx.time || '—',
      });
    });
  });
  const tbody = document.getElementById('items-sold-tbody');
  if (!tbody) return;
  if (!itemRows.length) {
    tbody.innerHTML = `<tr><td colspan="8"><div class="empty-state">
      <span class="material-symbols-rounded">shopping_bag</span>No items sold in this period</div></td></tr>`;
    return;
  }
  tbody.innerHTML = itemRows.map(r => `
    <tr>
      <td class="mono">#${r.orNum}</td>
      <td><strong>${r.name}</strong></td>
      <td>${r.size ? `<span class="pill pill-info">${r.size}</span>` : '<span style="color:#ccc">—</span>'}</td>
      <td>${r.qty}</td>
      <td class="mono">₱${r.price.toFixed(2)}</td>
      <td class="mono" style="color:var(--green);font-weight:700;">₱${r.total.toFixed(2)}</td>
      <td>${r.date}</td>
      <td>${r.time}</td>
    </tr>`).join('');
}

function renderItemsAddedTable(range) {
  const rows = store.itemsAdded.filter(a => dateInRange(a.date, range));
  const tbody = document.getElementById('items-added-tbody');
  if (!tbody) return;
  if (!rows.length) {
    tbody.innerHTML = `<tr><td colspan="7"><div class="empty-state">
      <span class="material-symbols-rounded">add_box</span>No items added in this period</div></td></tr>`;
    return;
  }
  tbody.innerHTML = rows.map(r => `
    <tr>
      <td class="mono" style="font-size:.78rem">${r.barcode}</td>
      <td><strong>${r.name}</strong></td>
      <td>${r.size ? `<span class="pill pill-info">${r.size}</span>` : '<span style="color:#ccc">—</span>'}</td>
      <td>${r.qty}</td>
      <td class="mono">₱${r.price.toFixed(2)}</td>
      <td>${new Date(r.date + 'T00:00:00').toLocaleDateString('en-PH')}</td>
      <td>${r.time}</td>
    </tr>`).join('');
}

function refreshDashboard() {
  const outOfStockCount = store.products.filter(p => p.stock <= 0).length;
  const lowStockCount   = store.products.filter(p => p.stock > 0 && p.stock <= p.lowStock).length;

  document.getElementById('dash-products').textContent   = store.products.length;
  document.getElementById('dash-categories').textContent = store.categories.length;
  document.getElementById('dash-lowstock').textContent   = lowStockCount;

  if (document.getElementById('dash-prod-card'))  document.getElementById('dash-prod-card').textContent  = store.products.length;
  if (document.getElementById('dash-cat-card'))   document.getElementById('dash-cat-card').textContent   = store.categories.length;
  if (document.getElementById('dash-low-card')) {
    const total = lowStockCount + outOfStockCount;
    document.getElementById('dash-low-card').textContent = total;
    const lowCard = document.getElementById('low-stock-card');
    const smallEl = lowCard?.querySelector('small');
    if (smallEl) smallEl.textContent = `${lowStockCount} low · ${outOfStockCount} out of stock`;
    if (lowCard) lowCard.onclick = () => openLowStockModal();
  }
  if (document.getElementById('dash-tx-card')) document.getElementById('dash-tx-card').textContent = store.transactions.length;

  // Init period pickers if not set
  const now = new Date();
  const todayISO = now.toISOString().split('T')[0];
  const dayEl = document.getElementById('period-day-input');
  if (dayEl && !dayEl.value) dayEl.value = todayISO;
  const monthEl = document.getElementById('period-month-input');
  if (monthEl && !monthEl.value) monthEl.value = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
  // Init mini pickers for sold/added tables
  ['sold','added'].forEach(prefix => {
    const d = document.getElementById(`${prefix}-day-input`);
    if (d && !d.value) d.value = todayISO;
    const m = document.getElementById(`${prefix}-month-input`);
    if (m && !m.value) m.value = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
  });
  populateYearSelects();

  // Bar chart
  const range = getPeriodDates();
  const filteredTx = store.transactions.filter(tx => dateInRange(tx.date, range));
  const soldMap = {};
  filteredTx.forEach(tx => {
    tx.items.forEach(item => {
      soldMap[item.name] = (soldMap[item.name] || 0) + item.qty;
    });
  });

  const chartWrap = document.getElementById('productChart')?.parentElement;
  const hasSales  = Object.keys(soldMap).length > 0;
  const titleEl   = document.getElementById('chart-title');
  const subEl     = document.getElementById('chart-sub');

  if (chartWrap && !document.getElementById('productChart')) {
    chartWrap.innerHTML = '<canvas id="productChart"></canvas>';
  }

  let emptyOverlay = document.getElementById('chart-empty-overlay');
  if (!emptyOverlay && chartWrap) {
    emptyOverlay = document.createElement('div');
    emptyOverlay.id = 'chart-empty-overlay';
    emptyOverlay.style.cssText = 'position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;color:#d1d5db;background:#fff;border-radius:8px;';
    emptyOverlay.innerHTML = `<span class="material-symbols-rounded" style="font-size:3rem">bar_chart</span>
      <span style="font-size:0.82rem;color:#9ca3af;font-weight:600">No data yet — make a sale to see the chart</span>`;
    chartWrap.style.position = 'relative';
    chartWrap.appendChild(emptyOverlay);
  }
  if (emptyOverlay) emptyOverlay.style.display = hasSales ? 'none' : 'flex';

  if (titleEl) titleEl.textContent = 'Most Bought Products';
  if (subEl)   subEl.textContent   = hasSales
    ? 'Top products ranked by total units sold in selected period'
    : 'No sales in this period — chart will appear after transactions';

  const pieCtx = document.getElementById('productChart')?.getContext('2d');
  if (pieCtx) {
    if (pieChartInstance) pieChartInstance.destroy();
    const sorted = Object.entries(soldMap).sort((a,b)=>b[1]-a[1]).slice(0,10);
    const labels = sorted.map(([n])=>n);
    const data   = sorted.map(([,q])=>q);
    const colors = ['#097969','#10b981','#00acee','#f59e0b','#7c3aed','#064e3b','#ef4444','#3b82f6','#8b5cf6','#f97316'];
    pieChartInstance = new Chart(pieCtx, {
      type: 'bar',
      data: {
        labels: hasSales ? labels : [],
        datasets: [{ label: 'Units Sold', data: hasSales ? data : [], backgroundColor: labels.map((_,i)=>colors[i%colors.length]), borderRadius: 8, borderSkipped: false }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => ` ${ctx.parsed.y} units sold` } } },
        scales: {
          y: { beginAtZero: true, ticks: { stepSize: 1, font: { size: 10 }, color: '#6b7280' }, grid: { color: '#f3f4f6' } },
          x: { ticks: { font: { size: 9 }, color: '#6b7280', maxRotation: 40, callback: function(val,i){ const l=this.getLabelForValue(i); return l.length>15?l.slice(0,14)+'…':l; } }, grid: { display: false } }
        }
      }
    });
  }

  const soldRange  = getTablePeriodRange('sold');
  const addedRange = getTablePeriodRange('added');
  renderItemsSoldTable(soldRange);
  renderItemsAddedTable(addedRange);
}

// Export helpers 
function exportSoldExcel() {
  const range = getTablePeriodRange('sold');
  const filteredTx = store.transactions.filter(tx => dateInRange(tx.date, range));
  const rows = [];
  filteredTx.forEach(tx => {
    tx.items.forEach(item => {
      rows.push({
        'OR #': '#' + String(tx.id).padStart(6,'0'),
        'Product': item.name, 'Qty': item.qty,
        'Unit Price': item.price, 'Total': item.price * item.qty,
        'Date': tx.date, 'Time': tx.time || '—',
      });
    });
  });
  if (!rows.length) { showToast('No data to export for this period.', 'warning'); return; }
  if (typeof XLSX === 'undefined') { showToast('Export library not loaded.', 'error'); return; }
  const ws = XLSX.utils.json_to_sheet(rows);
  ws['!cols'] = [{wch:10},{wch:30},{wch:6},{wch:12},{wch:12},{wch:14},{wch:10}];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Items Sold');
  const summary = [['Period', `${range.start.toLocaleDateString('en-PH')} – ${range.end.toLocaleDateString('en-PH')}`],
    ['Total Items Sold', rows.reduce((s,r)=>s+r['Qty'],0)],
    ['Gross Total', '₱'+rows.reduce((s,r)=>s+r['Total'],0).toFixed(2)]];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(summary), 'Summary');
  XLSX.writeFile(wb, `GCECC_ItemsSold_${new Date().toISOString().slice(0,10)}.xlsx`);
  showToast('Items Sold Excel downloaded!', 'success');
}

function exportAddedExcel() {
  const range = getTablePeriodRange('added');
  const rows = store.itemsAdded.filter(a => dateInRange(a.date, range)).map(r => ({
    'Barcode': r.barcode, 'Product': r.name, 'Qty': r.qty,
    'Unit Price': r.price, 'Date': r.date, 'Time': r.time,
  }));
  if (!rows.length) { showToast('No data to export for this period.', 'warning'); return; }
  if (typeof XLSX === 'undefined') { showToast('Export library not loaded.', 'error'); return; }
  const ws = XLSX.utils.json_to_sheet(rows);
  ws['!cols'] = [{wch:16},{wch:30},{wch:6},{wch:12},{wch:14},{wch:10}];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Items Added');
  XLSX.writeFile(wb, `GCECC_ItemsAdded_${new Date().toISOString().slice(0,10)}.xlsx`);
  showToast('Items Added Excel downloaded!', 'success');
}

// Keep for backward compat
function exportToExcel() { exportSoldExcel(); }
function setTxDateToday() { setPeriodToday(); }


//6. CATEGORIES
function saveCategory() {
  const name = document.getElementById('cat-name-input').value.trim();
  const desc = document.getElementById('cat-desc-input').value.trim();
  if (!name) { showToast('Category name is required!', 'error'); return; }
  store.categories.push({ id: store.nextId.cat++, name, desc });
  clearCategoryForm();
  showToast(`Category "${name}" added!`, 'success');
  navigateTo('view-category-section');
}

function clearCategoryForm() {
  document.getElementById('cat-name-input').value = '';
  document.getElementById('cat-desc-input').value = '';
}

function renderCategoryTable(filter = '') {
  const tbody = document.getElementById('category-tbody');
  const list  = filter
    ? store.categories.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))
    : store.categories;

  if (!list.length) {
    tbody.innerHTML = `<tr><td colspan="5"><div class="empty-state">
      <span class="material-symbols-rounded">label</span>No categories yet</div></td></tr>`;
    return;
  }
  tbody.innerHTML = list.map((cat, i) => {
    const prodCount = store.products.filter(p => p.catId === cat.id).length;
    return `<tr>
      <td>${i + 1}</td>
      <td><strong>${cat.name}</strong></td>
      <td>${cat.desc || '—'}</td>
      <td>${prodCount}</td>
      <td>
        <button class="btn btn-outline btn-sm" onclick="openEditCategory(${cat.id})">
          <span class="material-symbols-rounded" style="font-size:.9rem">edit</span>
        </button>
        <button class="btn btn-danger btn-sm" style="margin-left:6px" onclick="deleteCategory(${cat.id})">
          <span class="material-symbols-rounded" style="font-size:.9rem">delete</span>
        </button>
      </td>
    </tr>`;
  }).join('');
}

function filterCategories(v) { renderCategoryTable(v); }

function openEditCategory(id) {
  const cat = store.categories.find(c => c.id === id);
  if (!cat) return;
  document.getElementById('ec-id').value   = id;
  document.getElementById('ec-name').value = cat.name;
  document.getElementById('ec-desc').value = cat.desc || '';
  openModal('edit-category-modal');
}

function updateCategory() {
  const id  = parseInt(document.getElementById('ec-id').value);
  const name = document.getElementById('ec-name').value.trim();
  if (!name) { showToast('Category name required!', 'error'); return; }
  const cat = store.categories.find(c => c.id === id);
  if (cat) { cat.name = name; cat.desc = document.getElementById('ec-desc').value; }
  closeModal('edit-category-modal');
  renderCategoryTable();
  showToast('Category updated!', 'success');
}

function deleteCategory(id) {
  if (store.products.some(p => p.catId === id)) {
    showToast('Cannot delete — category has products.', 'error'); return;
  }
  store.categories = store.categories.filter(c => c.id !== id);
  renderCategoryTable();
  showToast('Category deleted.', 'success');
}

function populateCategoryDropdown(selectId) {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  sel.innerHTML = '<option value="">Select category</option>' +
    store.categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
}


//7. PRODUCTS
function saveProduct() {
  const name     = document.getElementById('prod-name').value.trim();
  const catId    = parseInt(document.getElementById('prod-cat').value);
  const price    = parseFloat(document.getElementById('prod-price').value);
  const stock    = parseInt(document.getElementById('prod-stock').value);
  const lowStock = parseInt(document.getElementById('prod-lowstock').value) || 5;
  const barcode  = document.getElementById('prod-barcode').value.trim() || ('BC' + Date.now());
  const unit     = document.getElementById('prod-unit').value;
  const sizeVal  = document.getElementById('prod-size').value;
  const size     = sizeVal === 'custom'
    ? (document.getElementById('prod-size-custom').value.trim() || '')
    : sizeVal;

  if (!name || !catId || isNaN(price) || isNaN(stock)) {
    showToast('Please fill in all required fields (*)', 'error'); return;
  }

  const duplicate = store.products.find(p =>
    p.name.toLowerCase() === name.toLowerCase() &&
    p.catId === catId &&
    (p.size || '') === size
  );
  if (duplicate) {
    showToast(`"${name}" already exists in this category with the same size!`, 'error'); return;
  }
  store.products.push({ id: store.nextId.prod++, name, catId, price, stock, lowStock, barcode, unit, size });
  const now2 = new Date();
  const isoDate = now2.toISOString().split('T')[0]; // "2025-05-06"
  const timeStr = now2.toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' });
  store.itemsAdded.push({ barcode, name, qty: stock, price, size, date: isoDate, time: timeStr });
  clearProductForm();
  showToast(`Product "${name}" saved!`, 'success');
  navigateTo('view-product-section');
}

function clearProductForm() {
  ['prod-name','prod-cat','prod-price','prod-stock','prod-lowstock','prod-barcode']
    .forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  const sizeEl = document.getElementById('prod-size');
  if (sizeEl) sizeEl.value = '';
  const customWrap = document.getElementById('prod-size-custom-wrap');
  if (customWrap) customWrap.style.display = 'none';
  const customEl = document.getElementById('prod-size-custom');
  if (customEl) customEl.value = '';
}

function renderProductTable(filter = '') {
  const catFilterEl = document.getElementById('prod-cat-filter');
  const catId = catFilterEl ? parseInt(catFilterEl.value) || null : null;
  const tbody = document.getElementById('product-tbody');

  let list = store.products;
  if (catId)  list = list.filter(p => p.catId === catId);
  if (filter) list = list.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase()) ||
    p.barcode.toString().includes(filter.trim())
  );

  // Refresh category dropdown in filter
  if (catFilterEl) {
    catFilterEl.innerHTML = '<option value="">All Categories</option>' +
      store.categories.map(c =>
        `<option value="${c.id}" ${c.id === catId ? 'selected' : ''}>${c.name}</option>`
      ).join('');
  }

  if (!list.length) {
    tbody.innerHTML = `<tr><td colspan="7"><div class="empty-state">
      <span class="material-symbols-rounded">inventory_2</span>No products found</div></td></tr>`;
    return;
  }
  tbody.innerHTML = list.map((p, i) => {
    const cat   = store.categories.find(c => c.id === p.catId);
  const isOut = p.stock <= 0;
const isLow = !isOut && p.stock <= p.lowStock;
return `<tr>
      <td>${i + 1}</td>
      <td><strong>${p.name}</strong></td>
      <td>${p.size ? `<span class="pill pill-info">${p.size}</span>` : '<span style="color:#ccc">—</span>'}</td>
      <td>${cat ? cat.name : '—'}</td>
      <td class="mono" style="color:var(--green);font-weight:700;">₱${p.price.toFixed(2)}</td>
      <td>${p.stock} ${p.unit}</td>
      <td class="mono" style="font-size:.78rem">${p.barcode}</td>
<td><span class="pill ${isOut ? 'pill-danger' : isLow ? 'pill-warning' : 'pill-success'}">
    ${isOut ? 'Out of Stock' : isLow ? 'Low Stock' : 'In Stock'}
  </span></td>      <td>
        <button class="btn btn-outline btn-sm" onclick="openEditProduct(${p.id})">
          <span class="material-symbols-rounded" style="font-size:.9rem">edit</span>
        </button>
        <button class="btn btn-danger btn-sm" style="margin-left:6px" onclick="deleteProduct(${p.id})">
          <span class="material-symbols-rounded" style="font-size:.9rem">delete</span>
        </button>
      </td>
    </tr>`;
  }).join('');
}

function filterProducts(v = '') { renderProductTable(v); }

function openEditProduct(id) {
  const p = store.products.find(x => x.id === id);
  if (!p) return;
  document.getElementById('ep-id').value    = id;
  document.getElementById('ep-name').value  = p.name;
  document.getElementById('ep-price').value = p.price;
  document.getElementById('ep-stock').value = p.stock;
  const sel = document.getElementById('ep-cat');
  sel.innerHTML = store.categories.map(c =>
    `<option value="${c.id}" ${c.id === p.catId ? 'selected' : ''}>${c.name}</option>`
  ).join('');

  // Sizes
  const stdSizes = ['','XS','S','M','L','XL','2XL','3XL','4XL','5XL'];
  const epSize = document.getElementById('ep-size');
  const epSizeCustomWrap = document.getElementById('ep-size-custom-wrap');
  const epSizeCustom = document.getElementById('ep-size-custom');
  if (epSize) {
    if (stdSizes.includes(p.size || '')) {
      epSize.value = p.size || '';
      if (epSizeCustomWrap) epSizeCustomWrap.style.display = 'none';
    } else {
      epSize.value = 'custom';
      if (epSizeCustomWrap) epSizeCustomWrap.style.display = '';
      if (epSizeCustom) epSizeCustom.value = p.size || '';
    }
  }
  openModal('edit-product-modal');
}

function updateProduct() {
  const id = parseInt(document.getElementById('ep-id').value);
  const p  = store.products.find(x => x.id === id);
  if (!p) return;
  p.name  = document.getElementById('ep-name').value;
  p.price = parseFloat(document.getElementById('ep-price').value);
  p.stock = parseInt(document.getElementById('ep-stock').value);
  p.catId = parseInt(document.getElementById('ep-cat').value);
  const epSizeVal = document.getElementById('ep-size')?.value || '';
  p.size = epSizeVal === 'custom'
    ? (document.getElementById('ep-size-custom')?.value.trim() || '')
    : epSizeVal;
  closeModal('edit-product-modal');
  renderProductTable();
  showToast('Product updated!', 'success');
}

function deleteProduct(id) {
  store.products = store.products.filter(p => p.id !== id);
  renderProductTable();
  showToast('Product deleted.', 'success');
}


/*8. inventory management*/
function initPOS() {
  const tabsEl = document.getElementById('pos-cat-tabs');
  tabsEl.innerHTML = '<div class="cat-tab active" onclick="posFilterCategory(\'\', this)">All</div>' +
    store.categories.map(c =>
      `<div class="cat-tab" onclick="posFilterCategory(${c.id}, this)">${c.name}</div>`
    ).join('');
  renderPOSGrid();

  // Auto-focus search box so scanner input goes straight here
  setTimeout(() => {
    document.getElementById('pos-search')?.focus();
  }, 150);
}

function posFilterCategory(catId, tabEl) {
  document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
  if (tabEl) tabEl.classList.add('active');
  renderPOSGrid(catId, '');
}

function posSearch(query) {
  renderPOSGrid('', query);

  // Auto-detect QR scan (8+ chars) — instantly add to cart
  if (query.length >= 8) {
    const match = store.products.find(p => p.barcode === query.trim());
    if (match) {
      document.getElementById('pos-search').value = '';
      renderPOSGrid('', '');
      addToCart(match.id);
      showToast(`Added: ${match.name} ${match.size ? '(' + match.size + ')' : ''}`, 'success');
    }
  }
}

function confirmScanQty() {
  if (!pendingScanProduct) return;
  const qtyEl = document.getElementById('scan-qty-input');
  const qty   = parseInt(qtyEl?.value) || 1;
  const product = store.products.find(p => p.id === pendingScanProduct.id);
  if (!product) return;
  if (qty < 1 || qty > product.stock) {
    showToast(`Invalid quantity. Max available: ${product.stock}`, 'error'); return;
  }
  // Add to cart with specified qty
  const existing = cart.find(item => item.productId === product.id);
  if (existing) {
    const newQty = existing.qty + qty;
    if (newQty > product.stock) { showToast('Not enough stock!', 'error'); return; }
    existing.qty = newQty;
  } else {
    cart.push({ productId: product.id, name: product.name, price: product.price, qty, unit: product.unit, size: product.size || '' });
  }
  renderCart();
  showToast(`Added ${qty}× ${product.name}`, 'success');
  cancelScanQty();
}

function cancelScanQty() {
  pendingScanProduct = null;
  const bar = document.getElementById('scan-qty-bar');
  if (bar) bar.style.display = 'none';
  document.getElementById('pos-search')?.focus();
}

function renderPOSGrid(catId = '', search = '') {
  let list = store.products;
  if (catId)  list = list.filter(p => p.catId === parseInt(catId));
  if (search) list = list.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) || p.barcode.includes(search)
  );

  const grid = document.getElementById('pos-product-grid');
  if (!list.length) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1;">
      <span class="material-symbols-rounded">search_off</span>No products found</div>`;
    return;
  }
  grid.innerHTML = list.map(p => `
    <div class="product-tile ${p.stock <= 0 ? 'out-of-stock' : ''}"
      onclick="${p.stock > 0 ? `addToCart(${p.id})` : `showToast('Out of stock!','error')`}">
      <div class="tile-name">${p.name}</div>
      ${p.size ? `<div style="font-size:.7rem;font-weight:700;color:var(--green);background:var(--green-light);border-radius:999px;padding:1px 8px;display:inline-block;margin-bottom:2px;">Size: ${p.size}</div>` : ''}
      <div class="tile-price">₱${p.price.toFixed(2)}</div>
      <div class="tile-stock">
        ${p.stock <= 0
          ? '<span style=\"color:var(--red);font-weight:700;\"> Out of Stock</span>'
          : p.stock <= p.lowStock
            ? `<span style=\"color:var(--gold);font-weight:700;\"> Low: ${p.stock} left</span>`
            : `${p.stock} ${p.unit} left`}
      </div>
    </div>`).join('');
}

function showStockLimitPopup(product) {
  const msg = document.getElementById('stock-limit-msg');
  if (msg) msg.innerHTML = `<strong>${product.name}${product.size ? ' (' + product.size + ')' : ''}</strong><br>Only <strong>${product.stock} ${product.unit}(s)</strong> available and all have been added to the order.`;
  const overlay = document.getElementById('stock-limit-overlay');
  if (overlay) { overlay.style.display = 'flex'; }

  // Play alert sound using Web Audio API
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [0, 150, 300].forEach(delay => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'square';
      osc.frequency.setValueAtTime(520, ctx.currentTime + delay / 1000);
      gain.gain.setValueAtTime(0.3, ctx.currentTime + delay / 1000);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay / 1000 + 0.18);
      osc.start(ctx.currentTime + delay / 1000);
      osc.stop(ctx.currentTime + delay / 1000 + 0.18);
    });
  } catch(e) {}
}

function closeStockLimitPopup() {
  const overlay = document.getElementById('stock-limit-overlay');
  if (overlay) overlay.style.display = 'none';
}

function addToCart(productId) {
  const product = store.products.find(p => p.id === productId);
  if (!product)           { showToast('Product not found!', 'error'); return; }
  if (product.stock <= 0) { showStockLimitPopup(product); return; }
  const existing = cart.find(item => item.productId === productId);
  if (existing) {
    if (existing.qty >= product.stock) {
      showStockLimitPopup(product); return;
    }
    existing.qty++;
  } else {
    cart.push({ productId, name: product.name, price: product.price, qty: 1, unit: product.unit, size: product.size || '' });
  }
  renderCart();
}

function renderCart() {
  const listEl   = document.getElementById('cart-items-list');
  const countEl  = document.getElementById('cart-count');

  countEl.textContent = cart.length + ' item(s)';

  if (!cart.length) {
    listEl.innerHTML = `<div class="empty-state" id="cart-empty-msg">
      <span class="material-symbols-rounded">shopping_cart</span>
      Tap a product to add it
    </div>`;
    return;
  }

  listEl.innerHTML = cart.map((item, index) => `
    <div class="cart-item-row">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}${item.size ? ` <span style="font-size:.72rem;color:var(--green);font-weight:700;">[${item.size}]</span>` : ''}</div>
        <div class="cart-item-price">₱${(item.price * item.qty).toFixed(2)}</div>
      </div>
      <div class="qty-controls">
        <button class="qty-btn" onclick="changeQty(${index}, -1)">−</button>
        <input type="number" class="qty-value" min="1" value="${item.qty}"
          onchange="setQty(${index}, this.value)"
          onclick="this.select()"
          style="width:48px;text-align:center;border:1.5px solid var(--border);border-radius:6px;font-family:var(--font);font-size:.9rem;font-weight:700;padding:2px 4px;">
        <button class="qty-btn" onclick="changeQty(${index}, +1)">+</button>
      </div>
      <span class="remove-item-btn material-symbols-rounded" onclick="removeFromCart(${index})">close</span>
    </div>`).join('');
}

function changeQty(index, delta) {
  const product = store.products.find(p => p.id === cart[index].productId);
  cart[index].qty = Math.max(1, Math.min(cart[index].qty + delta, product.stock));
  renderCart();
}

function setQty(index, value) {
  const product = store.products.find(p => p.id === cart[index].productId);
  const qty = parseInt(value);
  if (isNaN(qty) || qty < 1) { cart[index].qty = 1; }
  else if (qty > product.stock) { showToast(`Only ${product.stock} in stock!`, 'warning'); cart[index].qty = product.stock; }
  else { cart[index].qty = qty; }
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

function clearCart() {
  cart = [];
  renderCart();
  renderPOSGrid();
  closeModal('receipt-modal');
}


function proceedOrder() {
  if (!cart.length) { showToast('Cart is empty!', 'error'); return; }

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Deduct stock
  cart.forEach(item => {
    const product = store.products.find(p => p.id === item.productId);
    if (product) product.stock -= item.qty;
  });

  const now = new Date();
  const transaction = {
    id:        store.nextId.tx++,
    itemCount: cart.length,
    total,
    date:      now.toISOString().split('T')[0],
    time:      now.toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' }),
    items:     [...cart],
  };
  store.transactions.push(transaction);
  renderPOSGrid(); // refresh stock display
  showReceipt(transaction);
  showToast('Transaction completed!', 'success');
}

function showReceipt(tx) {
  const receiptEl = document.getElementById('receipt-content');
  receiptEl.innerHTML = `
    <div class="receipt-store">GCECC Store</div>
    <div class="receipt-sub">Gordon College Employees Consumers Cooperative<br>${new Date(tx.date + 'T00:00:00').toLocaleDateString('en-PH')}</div>
    <div style="font-size:.72rem;color:#888;">OR #${String(tx.id).padStart(6,'0')}</div>
    <hr class="receipt-divider">
    ${tx.items.map(item => `
      <div class="receipt-item">
        <span>${item.name} ×${item.qty}</span>
        <span>₱${(item.price * item.qty).toFixed(2)}</span>
      </div>`).join('')}
    <hr class="receipt-divider">
    <div class="receipt-total"><span>TOTAL</span><span>₱${tx.total.toFixed(2)}</span></div>
    <hr class="receipt-divider">
    <div style="font-size:.7rem;color:#888;">Thank you!</div>`;
  openModal('receipt-modal');
}


//TRANSACTION HELPERS — date filter + Excel export

function setTxDateToday() {
  const picker = document.getElementById('tx-date-picker');
  if (picker) {
    picker.value = new Date().toISOString().split('T')[0];
    refreshDashboard();
  }
}

// exportToExcel
function exportToExcel() {
  // Gather the rows currently shown in the items-sold table
  const picker  = document.getElementById('tx-date-picker');
  const selRaw  = picker ? picker.value : new Date().toISOString().split('T')[0];
  const selDate = selRaw
    ? new Date(selRaw + 'T00:00:00').toLocaleDateString('en-PH')
    : new Date().toLocaleDateString('en-PH');

  const filteredTx = store.transactions.filter(tx => tx.date === selDate);
  const rows = [];
  filteredTx.forEach(tx => {
    tx.items.forEach(item => {
      rows.push({
        'OR #':       '#' + String(tx.id).padStart(6, '0'),
        'Product':    item.name,
        'Qty':        item.qty,
        'Unit Price': item.price,
        'Total':      item.price * item.qty,
        'Date':       tx.date,
        'Time':       tx.time || '—',
      });
    });
  });

  if (!rows.length) { showToast('No data to export for this date.', 'warning'); return; }

  if (typeof XLSX === 'undefined') {
    showToast('Export library not loaded yet. Try again.', 'error'); return;
  }

  const ws = XLSX.utils.json_to_sheet(rows);

  // Column widths
  ws['!cols'] = [
    { wch: 10 }, { wch: 30 }, { wch: 6 }, { wch: 12 }, { wch: 12 }, { wch: 14 }, { wch: 10 }
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Items Sold');

  // Summary sheet
  const summary = [['Date', selDate], ['Total Items Sold', rows.reduce((s, r) => s + r['Qty'], 0)],
    ['Gross Total', '₱' + rows.reduce((s, r) => s + r['Total'], 0).toFixed(2)]];
  const ws2 = XLSX.utils.aoa_to_sheet(summary);
  XLSX.utils.book_append_sheet(wb, ws2, 'Summary');

  XLSX.writeFile(wb, `GCECC_Sales_${selRaw}.xlsx`);
  showToast('Excel file downloaded!', 'success');
}


//9. PRODUCT LABEL
// QR code generation handled by QRCode.js (loaded in index.html)
// Each product's barcode value is encoded as a QR code on the label page.

// QR CAMERA SCANNER
let html5QrScanner = null;

function openQRScanner() {
  openModal('qr-scanner-modal');
  document.getElementById('qr-scan-result').textContent = '';

  setTimeout(() => {
    if (typeof Html5Qrcode === 'undefined') {
      document.getElementById('qr-scan-result').textContent = 'Scanner library not loaded. Try refreshing.';
      return;
    }

    html5QrScanner = new Html5Qrcode('qr-reader');
    html5QrScanner.start(
      { facingMode: 'environment' },
      { fps: 10, qrbox: { width: 220, height: 220 } },
      (decodedText) => {
        const match = store.products.find(p => p.barcode === decodedText.trim());
        if (match) {
          closeQRScanner();
          addToCart(match.id);
          showToast(`Added: ${match.name} ${match.size ? '(' + match.size + ')' : ''}`, 'success');
        } else {
          document.getElementById('qr-scan-result').textContent = `No product found for: "${decodedText}"`;
        }
      },
      () => {} // ignore per-frame errors
    ).catch(err => {
      document.getElementById('qr-scan-result').textContent = `Camera error: ${err}`;
    });
  }, 300);
}

function closeQRScanner() {
  if (html5QrScanner) {
    html5QrScanner.stop().catch(() => {}).finally(() => {
      html5QrScanner.clear();
      html5QrScanner = null;
    });
  }
  closeModal('qr-scanner-modal');
}

function initLabelPage() {
  populateLabelCatFilter();
  populateLabelProductFilter();
  renderLabels();
}

function populateLabelCatFilter() {
  const sel = document.getElementById('label-cat-filter');
  if (!sel) return;
  sel.innerHTML = '<option value="">All Categories</option>' +
    store.categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
}

function populateLabelProductFilter(catId = '') {
  const sel = document.getElementById('label-product-filter');
  if (!sel) return;
  let list = catId ? store.products.filter(p => p.catId === parseInt(catId)) : store.products;
  const search = document.getElementById('label-search')?.value.toLowerCase() || '';
  if (search) list = list.filter(p => p.name.toLowerCase().includes(search));
  sel.innerHTML = '<option value="">All Products</option>' +
    list.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
}

function onLabelCatChange() {
  const catId = document.getElementById('label-cat-filter')?.value;
  populateLabelProductFilter(catId);
  renderLabels();
}

function onLabelSearch() {
  const catId = document.getElementById('label-cat-filter')?.value;
  populateLabelProductFilter(catId);
  renderLabels();
}

function renderLabels() {
  const catId     = document.getElementById('label-cat-filter')?.value;
  const productId = document.getElementById('label-product-filter')?.value;
  const search    = document.getElementById('label-search')?.value.toLowerCase() || '';
  const grid      = document.getElementById('label-grid');

  let list = store.products;
  if (catId)     list = list.filter(p => p.catId === parseInt(catId));
  if (productId) list = list.filter(p => p.id === parseInt(productId));
  if (search)    list = list.filter(p => p.name.toLowerCase().includes(search));

  if (!list.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:#aaa;">
      <span class="material-symbols-rounded" style="font-size:3rem;display:block;margin-bottom:10px;color:#ddd;">qr_code_2</span>
      No products found for the selected filter.</div>`;
    return;
  }

grid.innerHTML = list.map(p => {
    const cat = store.categories.find(c => c.id === p.catId);
    const qrData = p.barcode.toString();
    const qrId = `qr-${p.id}`;

    return `
      <div class="label-card">
        <div class="label-store-name">GCECC — Gordon College Coop</div>
        <div class="label-product-name">${p.name}</div>
        <div style="font-size:.68rem;color:var(--text-muted);margin-bottom:3px;">
            ${cat ? cat.name : ''} · per ${p.unit}
        </div>
        <div class="label-product-price">₱${p.price.toFixed(2)}</div>
        <div class="barcode-svg-wrap" id="${qrId}" style="display:flex;align-items:center;justify-content:center;margin:8px auto 4px;width:90px;height:90px;"></div>
        <div class="label-barcode-number">${qrData}</div>
      </div>`;
}).join('');

// Generate QR codes after rendering
list.forEach(p => {
  const el = document.getElementById(`qr-${p.id}`);
  if (el && typeof QRCode !== 'undefined') {
    new QRCode(el, {
      text: p.barcode.toString(),
      width: 90,
      height: 90,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.M,
    });
  }
});
}

function printLabels() { window.print(); }


//12. LOW STOCK MODAL
function openLowStockModal() {
const lowItems = store.products.filter(p => p.stock <= 0 || p.stock <= p.lowStock);
  const body = document.getElementById('low-stock-modal-body');
  if (!body) return;

  body.innerHTML = !lowItems.length
    ? '<p style="text-align:center;padding:20px;color:var(--text-muted)">All items are sufficiently stocked!</p>'
    : lowItems.map(p => {
        const isOut = p.stock <= 0;
        return `
          <div style="display:flex;justify-content:space-between;align-items:center;
            padding:10px 14px;border-radius:8px;margin-bottom:8px;
            background:${isOut ? 'var(--red-light)' : 'var(--gold-light)'}">
            <div>
              <div style="font-weight:700;font-size:0.88rem">${p.name}</div>
              <div style="font-size:0.72rem;color:var(--text-muted)">QR Code: ${p.barcode} · Stock: ${p.stock} ${p.unit}</div>
            </div>
            <span class="pill ${isOut ? 'pill-danger' : 'pill-warning'}">
              ${isOut ? ' Out of Stock' : ` ${p.stock} left`}
            </span>
          </div>`;
      }).join('');

  openModal('low-stock-modal');
}


//10. BACK TO TOP
const backBtn = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (backBtn) backBtn.classList.toggle('visible', window.scrollY > 200);
});
backBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));


//11. INIT
document.addEventListener('DOMContentLoaded', () => {
  navigateTo('dashboard-section');
  console.log(' GCECC Admin Inventory System loaded.');
});