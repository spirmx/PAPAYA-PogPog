// script.js – PAPAYA Pog & Pog SHOP (Fixed for Unified Modal)

// ===== LocalStorage Keys =====
const KEY_USERS    = 'ps_users';
const KEY_SESSION  = 'ps_session';
const KEY_PRODUCTS = 'ps_products';
const KEY_CART     = 'ps_cart';
const KEY_ORDERS   = 'ps_orders';

// ===== Helpers =====
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function getLS(key, def) {
  try {
    const v = localStorage.getItem(key);
    if (!v) return def;
    return JSON.parse(v);
  } catch (e) {
    return def;
  }
}

function setLS(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

function toBaht(num) {
  return new Intl.NumberFormat('th-TH').format(num) + ' ฿';
}

function formatDate(iso) {
  return new Date(iso).toLocaleString('th-TH');
}

// ===== Global Modal Helper (ใช้ ID: globalModal, modalTitle, modalMessage, modalOK) =====
function showModal(title, message, callback) {
  const modal = $('#globalModal');
  const titleEl = $('#modalTitle');
  const msgEl = $('#modalMessage');
  const okBtn = $('#modalOK');

  // ตรวจสอบ Global Modal (ถ้าไม่มีจะใช้ alert ธรรมดา)
  if (!modal || !titleEl || !msgEl || !okBtn) {
    alert(message); 
    if (typeof callback === 'function') callback();
    return;
  }

  titleEl.textContent = title || 'แจ้งเตือน';
  msgEl.textContent = message || '';

  modal.classList.add('open');

  // รีเซ็ต onclick เพื่อให้ callback ทำงาน
  okBtn.onclick = () => {
    modal.classList.remove('open');
    if (typeof callback === 'function') callback();
  };
}

// ===== Seed Products (แก้ให้บังคับอัปเดตข้อมูลใหม่เสมอ) =====
(function seedProductsOnce() {
  // ลบเงื่อนไขเช็คของเก่าทิ้ง เพื่อให้โหลดข้อมูลล่าสุดจากไฟล์ product_data.js เสมอ
  if (typeof PAPAYA_PRODUCTS !== 'undefined') {
    setLS(KEY_PRODUCTS, PAPAYA_PRODUCTS);
  } else {
    setLS(KEY_PRODUCTS, []);
  }
})();

function getProducts() {
  return getLS(KEY_PRODUCTS, []);
}

// ===== Auth (Login/Register/Logout/Session functions remain the same) =====
function registerUser(username, email, password) {
  const users = getLS(KEY_USERS, []);
  if (users.some(u => u.username === username || u.email === email)) {
    showModal('สมัครไม่สำเร็จ', 'มีผู้ใช้งานหรืออีเมลนี้อยู่แล้ว');
    return false;
  }
  const user = {
    username,
    email,
    password,
    createdAt: new Date().toISOString()
  };
  users.push(user);
  setLS(KEY_USERS, users);
  setLS(KEY_SESSION, { username, email });
  return true;
}

function loginUser(identifier, password) {
  const users = getLS(KEY_USERS, []);
  const user = users.find(
    u => (u.username === identifier || u.email === identifier) && u.password === password
  );
  if (!user) {
    showModal('เข้าสู่ระบบไม่สำเร็จ', 'ชื่อผู้ใช้ / อีเมล หรือรหัสผ่านไม่ถูกต้อง');
    return false;
  }
  setLS(KEY_SESSION, { username: user.username, email: user.email });
  return true;
}

function logoutUser() {
  localStorage.removeItem(KEY_SESSION);
  location.href = 'index.html';
}

function getSession() {
  return getLS(KEY_SESSION, null);
}

// ===== Cart Functions (remain the same) =====
function getCart() {
  return getLS(KEY_CART, []);
}

function saveCart(cart) {
  setLS(KEY_CART, cart);
  updateCartCount();
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const el = $('#cartCount');
  if (el) el.textContent = String(count);
}

function addToCart(product, size, qty) {
  let cart = getCart();
  const existing = cart.find(i => i.id === product.id && i.size === size);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id: product.id,
      about: product.about,
      name: product.name,
      price: product.price,
      img: product.img,
      size,
      qty
    });
  }
  saveCart(cart);
}

// ===== Orders Functions (remain the same) =====
function getOrders() {
  return getLS(KEY_ORDERS, []);
}

function saveOrders(orders) {
  setLS(KEY_ORDERS, orders);
}

// ===== Navbar (remains the same) =====
function initNavbar() {
  const sess = getSession();
  const navLogin  = $('#navLogin');
  const navLogout = $('#navLogout');
  const navUser   = $('#navUserName');

  updateCartCount();

  if (sess) {
    if (navLogin)  navLogin.classList.add('hidden');
    if (navLogout) navLogout.classList.remove('hidden');
    if (navUser)   navUser.textContent = sess.username || (sess.email || 'บัญชี');
  } else {
    if (navLogin)  navLogin.classList.remove('hidden');
    if (navLogout) navLogout.classList.add('hidden');
    if (navUser)   navUser.textContent = 'ผู้เยี่ยมชม';
  }

  if (navLogout) {
    navLogout.addEventListener('click', function (e) {
      e.preventDefault();
      logoutUser();
    });
  }
}

// ===== HOME PAGE (แก้ไขใหม่ เพิ่ม Pagination) =====
let currentProduct = null;

function initHomePage() {
  const products = getProducts();
  const grid = $('#productGrid');
  const paginationEl = $('#pagination-controls'); // Element สำหรับปุ่มเปลี่ยนหน้า

  const catButtons = $$('.cat-chip');
  const filterSelect = $('#filterProducts');
  const priceSelect  = $('#priceFilter');

  // State: เพิ่ม currentPage และ itemsPerPage
  const state = {
    category: 'all',
    sort: 'popular',
    priceRange: 'all',
    currentPage: 1,
    itemsPerPage: 12
  };

  // ฟังก์ชันกรองและเรียงลำดับ (เหมือนเดิม)
  function applyFilters() {
    let list = [...products];

    if (state.category !== 'all') {
      list = list.filter(p => p.category === state.category);
    }

    if (state.priceRange !== 'all') {
      const [min, max] = state.priceRange.split('-').map(Number);
      list = list.filter(p => p.price >= min && p.price <= max);
    }

    switch (state.sort) {
      case 'price_low':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'new':
        list.sort((a, b) => b.id - a.id);
        break;
      default:
        list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return list;
  }

  // ฟังก์ชันสร้างปุ่ม Pagination
  function renderPagination(totalItems) {
    paginationEl.innerHTML = '';
    const totalPages = Math.ceil(totalItems / state.itemsPerPage);

    // ถ้าไม่มีหน้า หรือมีแค่หน้าเดียว ไม่ต้องแสดงปุ่ม
    if (totalPages <= 1) return;

    // ปุ่ม Previous
    const prevLi = document.createElement('li');
    prevLi.className = `page-item ${state.currentPage === 1 ? 'disabled' : ''}`;
    prevLi.innerHTML = `<a class="page-link" href="#">ก่อนหน้า</a>`;
    prevLi.addEventListener('click', (e) => {
      e.preventDefault();
      if (state.currentPage > 1) {
        state.currentPage--;
        renderProducts();
        // เลื่อนหน้าจอขึ้นไปด้านบนตารางสินค้า
        document.querySelector('.products-wrap').scrollIntoView({ behavior: 'smooth' });
      }
    });
    paginationEl.appendChild(prevLi);

    // ปุ่มตัวเลข 1, 2, 3...
    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement('li');
      li.className = `page-item ${i === state.currentPage ? 'active' : ''}`;
      li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
      li.addEventListener('click', (e) => {
        e.preventDefault();
        state.currentPage = i;
        renderProducts();
        document.querySelector('.products-wrap').scrollIntoView({ behavior: 'smooth' });
      });
      paginationEl.appendChild(li);
    }

    // ปุ่ม Next
    const nextLi = document.createElement('li');
    nextLi.className = `page-item ${state.currentPage === totalPages ? 'disabled' : ''}`;
    nextLi.innerHTML = `<a class="page-link" href="#">ถัดไป</a>`;
    nextLi.addEventListener('click', (e) => {
      e.preventDefault();
      if (state.currentPage < totalPages) {
        state.currentPage++;
        renderProducts();
        document.querySelector('.products-wrap').scrollIntoView({ behavior: 'smooth' });
      }
    });
    paginationEl.appendChild(nextLi);
  }

  // ฟังก์ชัน Render สินค้า (แก้ไขให้ตัดเฉพาะหน้าปัจจุบันมาแสดง)
  function renderProducts() {
    const allFiltered = applyFilters();
    
    // คำนวณ Index เริ่มต้นและสิ้นสุด
    const startIndex = (state.currentPage - 1) * state.itemsPerPage;
    const endIndex = startIndex + state.itemsPerPage;
    
    // ตัดอาเรย์เอาเฉพาะส่วนที่จะแสดงในหน้านี้
    const listToShow = allFiltered.slice(startIndex, endIndex);

    grid.innerHTML = '';
    
    // กรณีไม่พบสินค้า
    if (!allFiltered.length) {
      grid.innerHTML = '<p class="empty">ไม่พบสินค้าในหมวดนี้</p>';
      paginationEl.innerHTML = ''; // ลบปุ่มเปลี่ยนหน้าออก
      return;
    }

    // วนลูปสร้างการ์ดสินค้า
    listToShow.forEach(p => {
      const card = document.createElement('article');
      card.className = 'product-card';
      card.dataset.id = String(p.id);
      card.innerHTML = `
        <div class="product-thumb" style="background-image:url('${p.img}')"></div>
        <div class="product-body">
          <div class="product-meta">#${p.category}</div>
          <h3 class="product-name">${p.name}</h3>
          <div class="product-price">${toBaht(p.price)}</div>
          <div class="product-actions">
            <button class="btn btn-buy" data-id="${p.id}">ซื้อเลย</button>
            <button class="ghost btn-add" data-id="${p.id}">เพิ่มลงตะกร้า</button>
          </div>
        </div>
      `;

      const thumb = card.querySelector('.product-thumb');
      const name  = card.querySelector('.product-name');
      const buyBtn = card.querySelector('.btn-buy');
      const addBtn = card.querySelector('.btn-add');

      function openDetail(mode) {
        openProductModal(p.id, mode);
      }

      thumb.addEventListener('click', () => openDetail('detail'));
      name.addEventListener('click', () => openDetail('detail'));
      buyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openDetail('buy');
      });
      addBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openDetail('cart');
      });

      grid.appendChild(card);
    });

    // เรียกฟังก์ชันสร้างปุ่ม Pagination โดยส่งจำนวนสินค้าทั้งหมดหลังกรองไป
    renderPagination(allFiltered.length);
  }

  // Event Listeners สำหรับ Filter ต่างๆ (ต้อง Reset หน้าไปที่ 1 เสมอเมื่อเปลี่ยนเงื่อนไข)
  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      catButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.category = btn.dataset.cat;
      state.currentPage = 1; // Reset page
      renderProducts();
    });
  });

  if (filterSelect) {
    filterSelect.addEventListener('change', function () {
      state.sort = this.value;
      state.currentPage = 1; // Reset page
      renderProducts();
    });
  }

  if (priceSelect) {
    priceSelect.addEventListener('change', function () {
      state.priceRange = this.value;
      state.currentPage = 1; // Reset page
      renderProducts();
    });
  }

  renderProducts();
}

// ===== PRODUCT MODAL (remains the same, uses specific product modal) =====
function openProductModal(productId, mode) {
  const modal = $('#productModal');
  const overlay = $('#modalOverlay');
  const nameEl = $('#modalName');
  const priceEl = $('#modalPrice');
  const imgEl = $('#modalImg');
  const sizeSel = $('#modalSize');
  const qtyInput = $('#modalQty');
  const aboutEl = $('#modalAbout'); 

  const product = getProducts().find(p => p.id === productId);
  if (!product) return;

  currentProduct = product;

  if (nameEl) nameEl.textContent = product.name;
  if (aboutEl) aboutEl.textContent = product.about || "ไม่มีรายละเอียดสินค้า";
  if (priceEl) priceEl.textContent = toBaht(product.price);
  if (imgEl) imgEl.src = product.img;

  if (sizeSel) sizeSel.value = 'M';
  if (qtyInput) qtyInput.value = '1';

  if (modal) modal.classList.add('open');
  if (overlay) overlay.classList.add('open');
}

function closeProductModal() {
  const modal = $('#productModal');
  const overlay = $('#modalOverlay');
  if (modal) modal.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
}

function initModalEvents() {
  const overlay = $('#modalOverlay');
  const closeBtn = $('#modalClose');
  const addBtn   = $('#modalAddCart');
  const buyBtn   = $('#modalBuyNow');
  const sizeSel  = $('#modalSize');
  const qtyInput = $('#modalQty');

  if (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeProductModal();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeProductModal);
  }

  function getSizeQty() {
    const size = sizeSel ? sizeSel.value : 'M';
    const qty  = qtyInput ? Math.max(1, parseInt(qtyInput.value || '1', 10)) : 1;
    return { size, qty };
  }

  if (addBtn) {
    addBtn.addEventListener('click', function () {
      if (!currentProduct) return;
      const { size, qty } = getSizeQty();
      addToCart(currentProduct, size, qty);
      closeProductModal();
      showModal('เพิ่มลงตะกร้าแล้ว', `${currentProduct.name} ถูกเพิ่มลงตะกร้าเรียบร้อย`);
    });
  }

  if (buyBtn) {
    buyBtn.addEventListener('click', function () {
      if (!currentProduct) return;
      const { size, qty } = getSizeQty();
      addToCart(currentProduct, size, qty);
      closeProductModal();
      location.href = 'checkout.html';
    });
  }
}

// ===== CART PAGE (remains the same) =====
function initCartPage() {
  const listEl = $('#cartList');
  const subEl  = $('#subTotal');
  const totEl  = $('#grandTotal');

  function calcSummary() {
    const cart = getCart();
    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    if (subEl) subEl.textContent = toBaht(subtotal);
    if (totEl) totEl.textContent = toBaht(subtotal);
  }

  function renderCart() {
    const cart = getCart();
    listEl.innerHTML = '';
    if (!cart.length) {
      listEl.innerHTML = '<li class="empty">ยังไม่มีสินค้าในตะกร้า</li>';
      calcSummary();
      return;
    }
    cart.forEach(item => {
      const li = document.createElement('li');
      li.className = 'cart-item';
      li.innerHTML = `
        <div class="cart-thumb" style="background-image:url('${item.img}')"></div>
        <div class="cart-info">
          <div class="cart-name">${item.name}</div>
          <div class="cart-price">${toBaht(item.price)}</div>
          <div class="cart-qty-row">
            <span class="cart-size">ไซต์: ${item.size}</span>
            <button class="qty-btn" data-act="dec">-</button>
            <span class="qty">${item.qty}</span>
            <button class="qty-btn" data-act="inc">+</button>
          </div>
        </div>
        <button class="cart-remove">&times;</button>
      `;

      const [decBtn, incBtn] = li.querySelectorAll('.qty-btn');
      const rmBtn = li.querySelector('.cart-remove');

      decBtn.addEventListener('click', function () {
        let cart = getCart();
        const target = cart.find(i => i.id === item.id && i.size === item.size);
        if (!target) return;
        target.qty -= 1;
        if (target.qty <= 0) {
          cart = cart.filter(i => !(i.id === item.id && i.size === item.size));
        }
        saveCart(cart);
        renderCart();
      });

      incBtn.addEventListener('click', function () {
        let cart = getCart();
        const target = cart.find(i => i.id === item.id && i.size === item.size);
        if (!target) return;
        target.qty += 1;
        saveCart(cart);
        renderCart();
      });

      rmBtn.addEventListener('click', function () {
        let cart = getCart().filter(i => !(i.id === item.id && i.size === item.size));
        saveCart(cart);
        renderCart();
      });

      listEl.appendChild(li);
    });

    calcSummary();
  }

  renderCart();
}

// ===== LOGIN REQUIREMENT (remains the same, uses showModal) =====
function requireLoginOrRedirect() {
  const sess = getSession();
  if (!sess) {
    const params = new URLSearchParams();
    params.set('redirect', location.pathname.replace(/^\//, '') || 'index.html');
    const target = 'login.html?' + params.toString();

    showModal('จำเป็นต้องเข้าสู่ระบบ', 'กรุณาเข้าสู่ระบบก่อนทำรายการ', () => {
      location.href = target;
    });

    return false;
  }
  return true;
}

// ===== CHECKOUT PAGE (remains the same, uses showModal) =====
function initCheckoutPage() {
  if (!requireLoginOrRedirect()) return;

  const listEl = $('#checkoutList');
  const subEl  = $('#subTotal');
  const totEl  = $('#grandTotal');
  const form   = $('#checkoutForm');

  function renderCart() {
    const cart = getCart();
    listEl.innerHTML = '';
    if (!cart.length) {
      listEl.innerHTML = '<li class="empty">ไม่มีสินค้าในตะกร้า</li>';
    } else {
      cart.forEach(item => {
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `
          <div class="cart-thumb" style="background-image:url('${item.img}')"></div>
          <div class="cart-info">
            <div class="cart-name">${item.name}</div>
            <div class="cart-price">${toBaht(item.price)}</div>
            <div class="cart-qty-row">ไซต์: ${item.size} | จำนวน: <strong>${item.qty}</strong></div>
          </div>
        `;
        listEl.appendChild(li);
      });
    }
    const subtotal = getCart().reduce((s, i) => s + i.price * i.qty, 0);
    if (subEl) subEl.textContent = toBaht(subtotal);
    if (totEl) totEl.textContent = toBaht(subtotal);
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const cart = getCart();
      if (!cart.length) {
        showModal('ไม่มีสินค้าในตะกร้า', 'โปรดเพิ่มสินค้าลงตะกร้าก่อนทำรายการ');
        return;
      }

      const fd = new FormData(form);
      const fullName = fd.get('fullName');
      const email    = fd.get('email');
      const phone    = fd.get('phone');
      const address  = fd.get('address');
      const pay      = fd.get('payMethod');

      const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
      const sess  = getSession();

      const orders = getOrders();
      orders.push({
        id: 'ORD-' + Date.now(),
        items: cart,
        total,
        status: 'ชำระแล้ว (จำลอง)',
        createdAt: new Date().toISOString(),
        owner: (sess && (sess.email || sess.username)) || email,
        shipping: { fullName, email, phone, address },
        payMethod: pay
      });
      saveOrders(orders);

      setLS(KEY_CART, []);
      updateCartCount();

      showModal('ชำระเงินสำเร็จ', 'ขอบคุณที่อุดหนุน PAPAYA Pog & Pog!', () => {
        location.href = 'orders.html';
      });
    });
  }

  renderCart();
}

// ===== ORDERS PAGE (remains the same) =====
function initOrdersPage() {
  if (!requireLoginOrRedirect()) return;
  const sess = getSession();
  const tbody = $('#ordersBody');

  const orders = getOrders().filter(
    o => o.owner === sess.email || o.owner === sess.username
  );

  tbody.innerHTML = '';
  if (!orders.length) {
    const tr = document.createElement('tr');
    tr.innerHTML = '<td colspan="6" class="empty">ยังไม่มีประวัติการสั่งซื้อ</td>';
    tbody.appendChild(tr);
    return;
  }

  orders.forEach((o, idx) => {
    const tr = document.createElement('tr');
    const countItems = o.items.reduce((s, i) => s + i.qty, 0);
    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td>${o.id}</td>
      <td>${formatDate(o.createdAt)}</td>
      <td>${countItems} ชิ้น</td>
      <td>${toBaht(o.total)}</td>
      <td>${o.status}</td>
    `;
    tbody.appendChild(tr);
  });
}

// ===== LOGIN PAGE (Updated Social Login) =====
function initLoginPage() {
  const loginForm = $('#loginForm');
  const registerForm = $('#registerForm');

  const params = new URLSearchParams(location.search);
  const redirect = params.get('redirect') || 'index.html';

  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const id  = loginForm.identifier.value.trim();
      const pwd = loginForm.password.value.trim();
      if (!id || !pwd) {
        showModal('กรอกข้อมูลไม่ครบ', 'กรุณากรอกชื่อผู้ใช้ / อีเมล และรหัสผ่านให้ครบ');
        return;
      }
      if (loginUser(id, pwd)) {
        showModal('เข้าสู่ระบบสำเร็จ', 'ยินดีต้อนรับกลับ!', () => {
          location.href = redirect;
        });
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const username = registerForm.username.value.trim();
      const email    = registerForm.email.value.trim();
      const pwd      = registerForm.password.value.trim();
      if (!username || !email || !pwd) {
        showModal('กรอกข้อมูลไม่ครบ', 'กรุณากรอกชื่อผู้ใช้ อีเมล และรหัสผ่านให้ครบ');
        return;
      }
      if (registerUser(username, email, pwd)) {
        showModal('สมัครสมาชิกสำเร็จ', 'คุณได้เข้าสู่ระบบแล้ว', () => {
          location.href = redirect;
        });
      }
    });
  }

  // ======== Social Login (Updated to use Global Modal) ========
  $$('.social-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const mockUser = {
        username: "PAPAYA USER",
        email: "social@login.mock"
      };
      setLS(KEY_SESSION, mockUser);
      const params = new URLSearchParams(location.search);
      const redirect = params.get("redirect") || "index.html";

      showModal('เข้าสู่ระบบสำเร็จ', 'เข้าสู่ระบบรียบร้อย', () => {
        location.href = redirect;
      });
    });
  });

  // Tab login / register (remains the same)
  const tabLogin = $('#tabLogin');
  const tabRegister = $('#tabRegister');

  if (tabLogin && tabRegister && loginForm && registerForm) {
    tabLogin.addEventListener('click', () => {
      tabLogin.classList.add('active');
      tabRegister.classList.remove('active');
      loginForm.style.display = 'block';
      registerForm.style.display = 'none';
    });

    tabRegister.addEventListener('click', () => {
      tabRegister.classList.add('active');
      tabLogin.classList.remove('active');
      loginForm.style.display = 'none';
      registerForm.style.display = 'block';
    });
  }
}

// ===== BOOTSTRAP (remains the same) =====
document.addEventListener('DOMContentLoaded', function () {
  initNavbar();
  initModalEvents();

  const page = document.documentElement.dataset.page;
  if (page === 'home')     initHomePage();
  if (page === 'cart')     initCartPage();
  if (page === 'checkout') initCheckoutPage();
  if (page === 'orders')   initOrdersPage();
  if (page === 'login')    initLoginPage();

  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});