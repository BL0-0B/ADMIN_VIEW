/**
 * script.js — GCECC POS Admin System
 * Gordon College Employees Consumers Cooperative
 *
 * ✅ Ready for backend integration — all data operations are
 *    isolated in the store object and helper functions.
 *    Replace store.* arrays with fetch() API calls when backend is ready.
 */

/* ============================================================
   1. DATA STORE  (replace with API calls for backend)
   ============================================================ */
const store = {
  categories: [
    { id: 1, name: 'PE Uniforms',    desc: 'Jogging pants and T-shirts' },
    { id: 2, name: 'NSTP Shirts',    desc: 'National Service Training Program shirts' },
    { id: 3, name: 'School Uniform', desc: 'Official school uniform sets' },
    { id: 4, name: 'Books',          desc: 'Textbooks and reference materials' },
    { id: 5, name: 'ID Laces',       desc: 'Program-colored ID lanyards' },
  ],
  products: [
    // PE Uniforms
    { id:1,  name:'PE Jogging Pants (S)',   catId:1, price:650,  stock:30, lowStock:5, barcode:'8934670001', unit:'pcs' },
    { id:2,  name:'PE Jogging Pants (M)',   catId:1, price:650,  stock:28, lowStock:5, barcode:'8934670002', unit:'pcs' },
    { id:3,  name:'PE Jogging Pants (L)',   catId:1, price:650,  stock:20, lowStock:5, barcode:'8934670003', unit:'pcs' },
    { id:4,  name:'PE Jogging Pants (XL)',  catId:1, price:650,  stock:15, lowStock:5, barcode:'8934670004', unit:'pcs' },
    { id:5,  name:'PE T-Shirt (S)',         catId:1, price:650,  stock:40, lowStock:5, barcode:'8934670005', unit:'pcs' },
    { id:6,  name:'PE T-Shirt (M)',         catId:1, price:650,  stock:35, lowStock:5, barcode:'8934670006', unit:'pcs' },
    { id:7,  name:'PE T-Shirt (L)',         catId:1, price:650,  stock:30, lowStock:5, barcode:'8934670007', unit:'pcs' },
    { id:8,  name:'PE T-Shirt (XL)',        catId:1, price:650,  stock:18, lowStock:5, barcode:'8934670008', unit:'pcs' },
    // NSTP Shirts
    { id:9,  name:'NSTP Shirt (S)',         catId:2, price:650,  stock:25, lowStock:5, barcode:'8934670009', unit:'pcs' },
    { id:10, name:'NSTP Shirt (M)',         catId:2, price:650,  stock:22, lowStock:5, barcode:'8934670010', unit:'pcs' },
    { id:11, name:'NSTP Shirt (L)',         catId:2, price:650,  stock:20, lowStock:5, barcode:'8934670011', unit:'pcs' },
    { id:12, name:'NSTP Shirt (XL)',        catId:2, price:650,  stock:12, lowStock:5, barcode:'8934670012', unit:'pcs' },
    { id:13, name:'NSTP Shirt (XXL)',       catId:2, price:650,  stock:8,  lowStock:3, barcode:'8934670013', unit:'pcs' },
    // School Uniform
    { id:14, name:'Uniform Set (S) Girl',   catId:3, price:650,  stock:15, lowStock:3, barcode:'8934670014', unit:'set' },
    { id:15, name:'Uniform Set (M) Girl',   catId:3, price:650,  stock:12, lowStock:3, barcode:'8934670015', unit:'set' },
    { id:16, name:'Uniform Set (L) Girl',   catId:3, price:650,  stock:10, lowStock:3, barcode:'8934670016', unit:'set' },
    { id:17, name:'Uniform Set (S) Boy',    catId:3, price:650,  stock:14, lowStock:3, barcode:'8934670017', unit:'set' },
    { id:18, name:'Uniform Set (M) Boy',    catId:3, price:650,  stock:11, lowStock:3, barcode:'8934670018', unit:'set' },
    { id:19, name:'Uniform Set (L) Boy',    catId:3, price:650,  stock:9,  lowStock:3, barcode:'8934670019', unit:'set' },
    // Books
    { id:20, name:'BSIT Prog Fund Book',    catId:4, price:480,  stock:20, lowStock:3, barcode:'8934670020', unit:'pcs' },
    { id:21, name:'BSBA Mgmt Book',         catId:4, price:450,  stock:18, lowStock:3, barcode:'8934670021', unit:'pcs' },
    { id:22, name:'BSED Math Methods',      catId:4, price:420,  stock:15, lowStock:3, barcode:'8934670022', unit:'pcs' },
    { id:23, name:'BSN Anatomy Book',       catId:4, price:590,  stock:10, lowStock:3, barcode:'8934670023', unit:'pcs' },
    { id:24, name:'BSCRIM Law Book',        catId:4, price:460,  stock:12, lowStock:3, barcode:'8934670024', unit:'pcs' },
    // ID Laces
    { id:25, name:'ID Lace - BSIT (Blue)',  catId:5, price:35,   stock:80, lowStock:10, barcode:'8934670025', unit:'pcs' },
    { id:26, name:'ID Lace - BSBA (Gold)',  catId:5, price:35,   stock:75, lowStock:10, barcode:'8934670026', unit:'pcs' },
    { id:27, name:'ID Lace - BSED (Green)', catId:5, price:35,   stock:60, lowStock:10, barcode:'8934670027', unit:'pcs' },
    { id:28, name:'ID Lace - BSN (White)',  catId:5, price:35,   stock:55, lowStock:10, barcode:'8934670028', unit:'pcs' },
    { id:29, name:'ID Lace - BSCRIM (Red)', catId:5, price:35,   stock:50, lowStock:10, barcode:'8934670029', unit:'pcs' },
  ],
  transactions: [],
  nextId: { cat: 6, prod: 30, tx: 1 },
};

let cart = [];


/* ============================================================
   2. NAVIGATION
   ============================================================ */
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


/* ============================================================
   3. TOAST
   ============================================================ */
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


/* ============================================================
   4. MODAL
   ============================================================ */
function openModal(id)  { document.getElementById(id)?.classList.add('open'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }

document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', function(e) {
    if (e.target === this) closeModal(this.id);
  });
});


/* ============================================================
   5. DASHBOARD
   ============================================================ */
let pieChartInstance = null;

function refreshDashboard() {
const outOfStockCount = store.products.filter(p => p.stock <= 0).length;
const lowStockCount = store.products.filter(p => p.stock > 0 && p.stock <= p.lowStock).length;

  document.getElementById('dash-products').textContent   = store.products.length;
  document.getElementById('dash-categories').textContent = store.categories.length;
  document.getElementById('dash-lowstock').textContent   = lowStockCount;
  // Stat cards
  if (document.getElementById('dash-prod-card'))  document.getElementById('dash-prod-card').textContent  = store.products.length;
  if (document.getElementById('dash-cat-card'))   document.getElementById('dash-cat-card').textContent   = store.categories.length;
// REPLACE WITH:
if (document.getElementById('dash-low-card')) {
  // Show both counts — e.g. "2 low · 1 out"
  const total = lowStockCount + outOfStockCount;
  document.getElementById('dash-low-card').textContent = total;
  const lowCard = document.getElementById('low-stock-card');
  const smallEl = lowCard?.querySelector('small');
  if (smallEl) smallEl.textContent = 
    `${lowStockCount} low · ${outOfStockCount} out of stock`;
  if (lowCard) lowCard.onclick = () => openLowStockModal();
}

  if (document.getElementById('dash-tx-card'))    document.getElementById('dash-tx-card').textContent    = store.transactions.length;

  // Set date picker to today if blank
  const picker = document.getElementById('tx-date-picker');
  if (picker && !picker.value) {
    picker.value = new Date().toISOString().split('T')[0];
  }

  // Get selected date in PH locale format for matching
  const selectedRaw = picker ? picker.value : new Date().toISOString().split('T')[0];
  const selectedDate = selectedRaw
    ? new Date(selectedRaw + 'T00:00:00').toLocaleDateString('en-PH')
    : new Date().toLocaleDateString('en-PH');

  // Filter transactions for selected date
  const filteredTx = store.transactions.filter(tx => tx.date === selectedDate);

  // Expand each transaction into individual item rows
  const itemRows = [];
  filteredTx.forEach(tx => {
    tx.items.forEach(item => {
      itemRows.push({
        orNum:  String(tx.id).padStart(6, '0'),
        name:   item.name,
        qty:    item.qty,
        price:  item.price,
        total:  item.price * item.qty,
        date:   tx.date,
        time:   tx.time || '—',
      });
    });
  });

  const itemsTbody = document.getElementById('items-sold-tbody');
  if (itemsTbody) {
    if (!itemRows.length) {
      itemsTbody.innerHTML = `<tr><td colspan="7"><div class="empty-state">
        <span class="material-symbols-rounded">shopping_bag</span>
        No items sold on this date</div></td></tr>`;
    } else {
      itemsTbody.innerHTML = itemRows.map(r => `
        <tr>
          <td class="mono">#${r.orNum}</td>
          <td><strong>${r.name}</strong></td>
          <td>${r.qty}</td>
          <td class="mono">₱${r.price.toFixed(2)}</td>
          <td class="mono" style="color:var(--green);font-weight:700;">₱${r.total.toFixed(2)}</td>
          <td>${r.date}</td>
          <td>${r.time}</td>
        </tr>`).join('');
    }
  }

  // Pie chart — product distribution by category
  const pieCtx = document.getElementById('productChart')?.getContext('2d');
  if (pieCtx) {
    if (pieChartInstance) pieChartInstance.destroy();

    // Tally total units sold per product from all transactions
    const soldMap = {};
    store.transactions.forEach(tx => {
      tx.items.forEach(item => {
        soldMap[item.name] = (soldMap[item.name] || 0) + item.qty;
      });
    });

const hasSales = Object.keys(soldMap).length > 0;

// If no sales yet — show empty chart with a message, don't fabricate data
if (!hasSales) {
  if (pieChartInstance) pieChartInstance.destroy();
  pieChartInstance = null;
  const titleEl = document.getElementById('chart-title');
  const subEl   = document.getElementById('chart-sub');
  if (titleEl) titleEl.textContent = 'Most Bought Products';
  if (subEl)   subEl.textContent   = 'No sales recorded yet — chart will appear after the first transaction';

  // Show a placeholder message inside the canvas area
  const wrap = document.getElementById('productChart')?.parentElement;
  if (wrap) wrap.innerHTML = `
    <div style="height:100%;display:flex;flex-direction:column;align-items:center;
      justify-content:center;gap:10px;color:#d1d5db;">
      <span class="material-symbols-rounded" style="font-size:3rem">bar_chart</span>
      <span style="font-size:0.82rem;color:#9ca3af;font-weight:600">
        No data yet — make a sale to see the chart
      </span>
    </div>`;
  return;
}

const sorted = Object.entries(soldMap)
  .sort((a, b) => b[1] - a[1]).slice(0, 10);
const labels = sorted.map(([name]) => name);
const data   = sorted.map(([, qty]) => qty);

    // Update title & subtitle dynamically
    const titleEl = document.getElementById('chart-title');
    const subEl   = document.getElementById('chart-sub');
    if (titleEl) titleEl.textContent = hasSales
      ? 'Most Bought Products'
      : 'Product Distribution by Category';
    if (subEl) subEl.textContent = hasSales
      ? 'Top products ranked by total units sold — updates after every sale'
      : 'Number of products per category (make a sale to see most bought)';

    const colors = [
      '#097969','#10b981','#00acee','#f59e0b',
      '#7c3aed','#064e3b','#ef4444','#3b82f6','#8b5cf6','#f97316'
    ];

    pieChartInstance = new Chart(pieCtx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: hasSales ? 'Units Sold' : 'Products',
          data,
          backgroundColor: labels.map((_, i) => colors[i % colors.length]),
          borderRadius: 8,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => hasSales
                ? ` ${ctx.parsed.y} units sold`
                : ` ${ctx.parsed.y} products`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1, font: { size: 10 }, color: '#6b7280' },
            grid: { color: '#f3f4f6' }
          },
          x: {
            ticks: {
              font: { size: 9 },
              color: '#6b7280',
              maxRotation: 40,
              callback: function(val, i) {
                const lbl = this.getLabelForValue(i);
                return lbl.length > 15 ? lbl.slice(0, 14) + '…' : lbl;
              }
            },
            grid: { display: false }
          }
        }
      }
    });
  }
}


/* ============================================================
   6. CATEGORIES
   ============================================================ */
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


/* ============================================================
   7. PRODUCTS
   ============================================================ */
function saveProduct() {
  const name     = document.getElementById('prod-name').value.trim();
  const catId    = parseInt(document.getElementById('prod-cat').value);
  const price    = parseFloat(document.getElementById('prod-price').value);
  const stock    = parseInt(document.getElementById('prod-stock').value);
  const lowStock = parseInt(document.getElementById('prod-lowstock').value) || 5;
  const barcode  = document.getElementById('prod-barcode').value.trim() || ('BC' + Date.now());
  const unit     = document.getElementById('prod-unit').value;

  if (!name || !catId || isNaN(price) || isNaN(stock)) {
    showToast('Please fill in all required fields (*)', 'error'); return;
  }
  store.products.push({ id: store.nextId.prod++, name, catId, price, stock, lowStock, barcode, unit });
  clearProductForm();
  showToast(`Product "${name}" saved!`, 'success');
  navigateTo('view-product-section');
}

function clearProductForm() {
  ['prod-name','prod-cat','prod-price','prod-stock','prod-lowstock','prod-barcode','prod-desc']
    .forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
}

function renderProductTable(filter = '') {
  const catFilterEl = document.getElementById('prod-cat-filter');
  const catId = catFilterEl ? parseInt(catFilterEl.value) || null : null;
  const tbody = document.getElementById('product-tbody');

  let list = store.products;
  if (catId)  list = list.filter(p => p.catId === catId);
  if (filter) list = list.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));

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

  // Auto-add to cart if barcode matches exactly
  if (query.length >= 8) {
    const match = store.products.find(p => p.barcode === query.trim());
    if (match) {
      addToCart(match.id);
      document.getElementById('pos-search').value = '';
      renderPOSGrid('', '');
      showToast(`Added: ${match.name}`, 'success');
    }
  }
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
  // No emoji — text only, bigger
  grid.innerHTML = list.map(p => `
    <div class="product-tile ${p.stock <= 0 ? 'out-of-stock' : ''}"
      onclick="${p.stock > 0 ? `addToCart(${p.id})` : `showToast('Out of stock!','error')`}">
      <div class="tile-name">${p.name}</div>
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

function addToCart(productId) {
  const product = store.products.find(p => p.id === productId);
  if (!product)           { showToast('Product not found!', 'error'); return; }
  if (product.stock <= 0) { showToast('Out of stock!', 'error'); return; }
  const existing = cart.find(item => item.productId === productId);
  if (existing) {
    if (existing.qty >= product.stock) { showToast('Not enough stock!', 'error'); return; }
    existing.qty++;
  } else {
    cart.push({ productId, name: product.name, price: product.price, qty: 1, unit: product.unit });
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
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">₱${(item.price * item.qty).toFixed(2)}</div>
      </div>
      <div class="qty-controls">
        <button class="qty-btn" onclick="changeQty(${index}, -1)">−</button>
        <span class="qty-value">${item.qty}</span>
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

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

function clearCart() {
  cart = [];
  renderCart();
  closeModal('receipt-modal');
}

/**
 * proceedOrder() — called when "Proceed" is clicked.
 * Directly completes the transaction (no popup). Shows receipt.
 */
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
    date:      now.toLocaleDateString('en-PH'),
    time:      now.toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' }),
    items:     [...cart],
  };
  store.transactions.push(transaction);
  showReceipt(transaction);
  showToast('Transaction completed!', 'success');
}

function showReceipt(tx) {
  const receiptEl = document.getElementById('receipt-content');
  receiptEl.innerHTML = `
    <div class="receipt-store">GCECC Store</div>
    <div class="receipt-sub">Gordon College Employees Consumers Cooperative<br>${tx.date}</div>
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


/* ============================================================
   TRANSACTION HELPERS — date filter + Excel export
   ============================================================ */

function setTxDateToday() {
  const picker = document.getElementById('tx-date-picker');
  if (picker) {
    picker.value = new Date().toISOString().split('T')[0];
    refreshDashboard();
  }
}

/**
 * exportToExcel() — builds a .xlsx file in the browser using SheetJS (CDN)
 * and triggers a download. No server needed.
 */
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


/* ============================================================
   9. PRODUCT LABELS  (scannable Code128 barcode)
   ============================================================ */

// Minimal Code128 B encoder for numeric+alpha barcodes
const CODE128 = {
  START_B: 104, STOP: 106,
  map: ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~',
  // Code128B bar patterns (11 bits each)
  patterns: [
    '11011001100','11001101100','11001100110','10010011000','10010001100',
    '10001001100','10011001000','10011000100','10001100100','11001001000',
    '11001000100','11000100100','10110011100','10011011100','10011001110',
    '10111001100','10011101100','10011100110','11001110010','11001011100',
    '11001001110','11011100100','11001110100','11101101110','11101001100',
    '11100101100','11100100110','11101100100','11100110100','11100110010',
    '11011011000','11011000110','11000110110','10100011000','10001011000',
    '10001000110','10110001000','10001101000','10001100010','11010001000',
    '11000101000','11000100010','10110111000','10110001110','10001101110',
    '10111011000','10111000110','10001110110','11101110110','11010001110',
    '11000101110','11011101000','11011100010','11011101110','11101011000',
    '11101000110','11100010110','11101101000','11101100010','11100011010',
    '11101111010','11001000010','11110001010','10100110000','10100001100',
    '10010110000','10010000110','10000101100','10000100110','10110010000',
    '10110000100','10011010000','10011000010','10000110100','10000110010',
    '11000010010','11001010000','11110111010','11000010100','10001111010',
    '10100111100','10010111100','10010011110','10111100100','10011110100',
    '10011110010','11110100100','11110010100','11110010010','11011011110',
    '11011110110','11110110110','10101111000','10100011110','10001011110',
    '10111101000','10111100010','11110101000','11110100010','10111011110',
    '10111101110','11101011110','11110101110','11010000100','11010010000',
    '11010011100','11000111010','11010111000',
  ],
  // barcode
encode(text) {
  // 1. Ensure we ONLY have digits. 
  // If the product barcode is "A123", this makes it "123".
  const cleanText = text.toString().replace(/\D/g, '');

  let codes = [this.START_B];
  let check = this.START_B;

  for (let i = 0; i < cleanText.length; i++) {
    const char = cleanText[i];
    const idx = this.map.indexOf(char);
    
    if (idx === -1) continue; 

    codes.push(idx);
    // Checksum formula: StartValue + (Index * Position)
    check += (i + 1) * idx;
  }

  codes.push(check % 103);
  codes.push(this.STOP);
  
  return codes.map(c => this.patterns[c] || '').join('') + '11';
},
  toSVG(text, width = 180, height = 50) {
    const bits = this.encode(text);
    const barW = width / bits.length;
    let rects = '';
    let x = 0;
    for (const bit of bits) {
      if (bit === '1') rects += `<rect x="${x.toFixed(2)}" y="0" width="${barW.toFixed(2)}" height="${height}" fill="#000"/>`;
      x += barW;
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">${rects}</svg>`;
  }
};

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
      <span class="material-symbols-rounded" style="font-size:3rem;display:block;margin-bottom:10px;color:#ddd;">barcode</span>
      No products found for the selected filter.</div>`;
    return;
  }

grid.innerHTML = list.map(p => {
    const cat = store.categories.find(c => c.id === p.catId);
    
    // 1. Clean the barcode for the bars (removes letters like 'BC')
    const cleanBarcode = p.barcode.toString().replace(/\D/g, '');
    
    // 2. Generate the SVG using only the numbers
    const barcodeSVG = CODE128.toSVG(cleanBarcode, 160, 46);

    return `
      <div class="label-card">
        <div class="label-store-name">GCECC — Gordon College Coop</div>
        <div class="label-product-name">${p.name}</div>
        <div style="font-size:.68rem;color:var(--text-muted);margin-bottom:3px;">
            ${cat ? cat.name : ''} · per ${p.unit}
        </div>
        <div class="label-product-price">₱${p.price.toFixed(2)}</div>
        <div class="barcode-svg-wrap">${barcodeSVG}</div>
        
        <div class="label-barcode-number">${cleanBarcode}</div>
      </div>`;
}).join('');
}

function printLabels() { window.print(); }


/* ============================================================
   LOW STOCK MODAL
   ============================================================ */
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
              <div style="font-size:0.72rem;color:var(--text-muted)">Barcode: ${p.barcode} · Stock: ${p.stock} ${p.unit}</div>
            </div>
            <span class="pill ${isOut ? 'pill-danger' : 'pill-warning'}">
              ${isOut ? ' Out of Stock' : ` ${p.stock} left`}
            </span>
          </div>`;
      }).join('');

  openModal('low-stock-modal');
}


/* ============================================================
   10. BACK TO TOP
   ============================================================ */
const backBtn = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (backBtn) backBtn.classList.toggle('visible', window.scrollY > 200);
});
backBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));


/* ============================================================
   11. INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  navigateTo('dashboard-section');
  console.log(' GCECC Admin Inventory System loaded.');
});