const KEY_USERS = 'ps_users';
const KEY_SESSION = 'ps_session';
const KEY_PRODUCTS = 'ps_products';
const KEY_CART = 'ps_cart';
const KEY_ORDERS = 'ps_orders';
const KEY_PROFILE = 'ps_profile';
const KEY_RECENTS = 'ps_recent_searches';

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function getLS(key, def) {
  try {
    const value = localStorage.getItem(key);
    if (!value) return def;
    return JSON.parse(value);
  } catch (error) {
    return def;
  }
}

function setLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function toBaht(num) {
  return `${new Intl.NumberFormat('th-TH').format(Number(num) || 0)} บาท`;
}

function formatDate(iso) {
  const value = new Date(iso);
  return value.toLocaleString('th-TH', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
}

function normalizeText(value) {
  return String(value || '').trim().toLowerCase();
}

function getCategoryLabel(category) {
  const labels = {
    shirt: 'Shirts',
    pants: 'Pants',
    hat: 'Hats',
    shoes: 'Shoes',
    accessory: 'Accessories'
  };
  return labels[category] || 'Products';
}

function getProducts() {
  return getLS(KEY_PRODUCTS, []);
}

function getCart() {
  return getLS(KEY_CART, []);
}

function getOrders() {
  return getLS(KEY_ORDERS, []);
}

function getSession() {
  return getLS(KEY_SESSION, null);
}

function getProfile() {
  return getLS(KEY_PROFILE, {});
}

function getRecentSearches() {
  return getLS(KEY_RECENTS, []);
}

function saveProfile(profile) {
  setLS(KEY_PROFILE, profile);
}

function saveCart(cart) {
  setLS(KEY_CART, cart);
  updateCartCount();
}

function saveOrders(orders) {
  setLS(KEY_ORDERS, orders);
}

function rememberSearch(query) {
  const clean = String(query || '').trim();
  if (!clean) return;
  const next = [clean, ...getRecentSearches().filter((item) => item !== clean)].slice(0, 5);
  setLS(KEY_RECENTS, next);
}

function getCartMetrics() {
  const cart = getCart();
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  const savings = Math.round(subtotal * 0.08);
  return { itemCount, subtotal, savings };
}

function getInventoryStats(products) {
  const prices = products.map((item) => item.price);
  return {
    total: products.length,
    featured: products.filter((item) => item.featured).length,
    min: prices.length ? Math.min(...prices) : 0,
    max: prices.length ? Math.max(...prices) : 0
  };
}

function getOrderStatusMeta(status) {
  const value = normalizeText(status);
  if (value.includes('ready') || value.includes('fulfilled')) {
    return { label: 'Ready to ship', tone: 'success' };
  }
  if (value.includes('processing') || value.includes('confirmed')) {
    return { label: 'Processing', tone: 'gold' };
  }
  return { label: status || 'Paid', tone: 'gold' };
}

function generateDeliveryEstimate() {
  const date = new Date();
  date.setDate(date.getDate() + 3);
  return date.toLocaleDateString('th-TH', {
    dateStyle: 'medium'
  });
}

function showModal(title, message, callback) {
  const modal = $('#globalModal');
  const titleEl = $('#modalTitle');
  const msgEl = $('#modalMessage');
  const okBtn = $('#modalOK');

  if (!modal || !titleEl || !msgEl || !okBtn) {
    alert(message);
    if (typeof callback === 'function') callback();
    return;
  }

  titleEl.textContent = title || 'Notification';
  msgEl.textContent = message || '';
  modal.classList.add('open');

  okBtn.onclick = () => {
    modal.classList.remove('open');
    if (typeof callback === 'function') callback();
  };
}

(function seedProductsOnce() {
  if (typeof PAPAYA_PRODUCTS !== 'undefined') {
    setLS(KEY_PRODUCTS, PAPAYA_PRODUCTS);
  } else {
    setLS(KEY_PRODUCTS, []);
  }
})();

function registerUser(username, email, password) {
  const users = getLS(KEY_USERS, []);
  const normalizedUsername = normalizeText(username);
  const normalizedEmail = normalizeText(email);

  if (users.some((user) => normalizeText(user.username) === normalizedUsername || normalizeText(user.email) === normalizedEmail)) {
    showModal('Register failed', 'Username or email is already in use');
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
  saveProfile({
    ...getProfile(),
    username,
    email
  });
  return true;
}

function loginUser(identifier, password) {
  const users = getLS(KEY_USERS, []);
  const match = users.find((user) => {
    const sameIdentifier =
      normalizeText(user.username) === normalizeText(identifier) ||
      normalizeText(user.email) === normalizeText(identifier);
    return sameIdentifier && user.password === password;
  });

  if (!match) {
    showModal('Login failed', 'Email, username, or password is incorrect');
    return false;
  }

  setLS(KEY_SESSION, {
    username: match.username,
    email: match.email
  });

  saveProfile({
    ...getProfile(),
    username: match.username,
    email: match.email
  });

  return true;
}

function logoutUser() {
  localStorage.removeItem(KEY_SESSION);
  location.href = 'index.html';
}

function updateCartCount() {
  const metrics = getCartMetrics();
  const el = $('#cartCount');
  if (el) el.textContent = String(metrics.itemCount);
}

function addToCart(product, size, qty) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id && item.size === size);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id: product.id,
      about: product.about,
      name: product.name,
      price: product.price,
      img: product.img,
      category: product.category,
      featured: product.featured,
      size,
      qty
    });
  }

  saveCart(cart);
}

function initNavbar() {
  const session = getSession();
  const navLogin = $('#navLogin');
  const navLogout = $('#navLogout');
  const navUser = $('#navUserName');

  updateCartCount();

  if (session) {
    if (navLogin) navLogin.classList.add('hidden');
    if (navLogout) navLogout.classList.remove('hidden');
    if (navUser) navUser.textContent = session.username || session.email || 'Member';
  } else {
    if (navLogin) navLogin.classList.remove('hidden');
    if (navLogout) navLogout.classList.add('hidden');
    if (navUser) navUser.textContent = 'Guest';
  }

  if (navLogout) {
    navLogout.addEventListener('click', (event) => {
      event.preventDefault();
      logoutUser();
    });
  }
}

let currentProduct = null;

function buildProductCard(product, options = {}) {
  const article = document.createElement('article');
  article.className = 'product-card';
  article.dataset.id = String(product.id);

  const badge = product.featured ? '<span class="product-badge">Featured</span>' : `<span class="product-badge subtle-badge">${getCategoryLabel(product.category)}</span>`;
  const metaLine = options.metaLine || `#${product.category}`;
  const actionPrimary = options.primaryLabel || 'Buy Now';
  const actionSecondary = options.secondaryLabel || 'Add to Cart';

  article.innerHTML = `
    <div class="product-thumb" style="background-image:url('${product.img}')">
      ${badge}
    </div>
    <div class="product-body">
      <div class="product-meta">${metaLine}</div>
      <h3 class="product-name">${product.name}</h3>
      <div class="product-price">${toBaht(product.price)}</div>
      <div class="product-actions">
        <button class="btn btn-buy" data-id="${product.id}">${actionPrimary}</button>
        <button class="ghost btn-add" data-id="${product.id}">${actionSecondary}</button>
      </div>
    </div>
  `;

  const thumb = $('.product-thumb', article);
  const name = $('.product-name', article);
  const buyBtn = $('.btn-buy', article);
  const addBtn = $('.btn-add', article);

  const openDetail = (mode) => openProductModal(product.id, mode);

  thumb.addEventListener('click', () => openDetail('detail'));
  name.addEventListener('click', () => openDetail('detail'));
  buyBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    openDetail('buy');
  });
  addBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    openDetail('cart');
  });

  return article;
}

function renderRecentSearches(container, onSelect) {
  if (!container) return;
  const items = getRecentSearches();
  container.innerHTML = '';

  if (!items.length) {
    container.innerHTML = '<span class="results-hint">Recent searches will appear here</span>';
    return;
  }

  items.forEach((item) => {
    const button = document.createElement('button');
    button.className = 'search-chip';
    button.type = 'button';
    button.textContent = item;
    button.addEventListener('click', () => onSelect(item));
    container.appendChild(button);
  });
}

function initHomePage() {
  const products = getProducts();
  const grid = $('#productGrid');
  const curatedGrid = $('#curatedGrid');
  const paginationEl = $('#pagination-controls');
  const resultsMeta = $('#resultsMeta');
  const resultsSummary = $('#resultsSummary');
  const recentSearchesEl = $('#recentSearches');
  const inventoryCount = $('#inventoryCount');
  const featuredCount = $('#featuredCount');
  const priceBand = $('#priceBand');
  const catButtons = $$('.cat-chip');
  const filterSelect = $('#filterProducts');
  const priceSelect = $('#priceFilter');
  const searchInput = $('#searchInput');

  const state = {
    category: 'all',
    sort: 'popular',
    priceRange: 'all',
    currentPage: 1,
    itemsPerPage: 12,
    searchQuery: ''
  };

  function renderInventoryDashboard() {
    const stats = getInventoryStats(products);
    if (inventoryCount) inventoryCount.textContent = String(stats.total);
    if (featuredCount) featuredCount.textContent = String(stats.featured);
    if (priceBand) priceBand.textContent = `${toBaht(stats.min)} - ${toBaht(stats.max)}`;
  }

  function applyFilters() {
    let list = [...products];

    if (state.searchQuery) {
      const query = normalizeText(state.searchQuery);
      list = list.filter((product) =>
        normalizeText(product.name).includes(query) ||
        normalizeText(product.about).includes(query) ||
        normalizeText(product.category).includes(query)
      );
    }

    if (state.category !== 'all') {
      list = list.filter((product) => product.category === state.category);
    }

    if (state.priceRange !== 'all') {
      const [min, max] = state.priceRange.split('-').map(Number);
      list = list.filter((product) => product.price >= min && product.price <= max);
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
        list.sort((a, b) => Number(b.featured) - Number(a.featured) || b.id - a.id);
    }

    return list;
  }

  function renderPagination(totalItems) {
    if (!paginationEl) return;

    paginationEl.innerHTML = '';
    const totalPages = Math.ceil(totalItems / state.itemsPerPage);
    if (totalPages <= 1) return;

    const makePageItem = (label, targetPage, disabled = false, active = false) => {
      const li = document.createElement('li');
      li.className = `page-item ${disabled ? 'disabled' : ''} ${active ? 'active' : ''}`.trim();
      li.innerHTML = `<a class="page-link" href="#">${label}</a>`;
      li.addEventListener('click', (event) => {
        event.preventDefault();
        if (disabled || targetPage === state.currentPage) return;
        state.currentPage = targetPage;
        renderProducts();
        $('.products-wrap')?.scrollIntoView({ behavior: 'smooth' });
      });
      return li;
    };

    paginationEl.appendChild(makePageItem('Prev', Math.max(1, state.currentPage - 1), state.currentPage === 1));
    for (let page = 1; page <= totalPages; page += 1) {
      paginationEl.appendChild(makePageItem(String(page), page, false, page === state.currentPage));
    }
    paginationEl.appendChild(makePageItem('Next', Math.min(totalPages, state.currentPage + 1), state.currentPage === totalPages));
  }

  function updateResultsText(totalItems, visibleItems) {
    if (resultsMeta) {
      resultsMeta.textContent = `${visibleItems} of ${totalItems} products visible`;
    }

    if (resultsSummary) {
      const summary = [];
      summary.push(state.category === 'all' ? 'All categories' : getCategoryLabel(state.category));
      summary.push(state.priceRange === 'all' ? 'All prices' : `Range ${state.priceRange}`);
      if (state.searchQuery) summary.push(`Keyword "${state.searchQuery}"`);
      resultsSummary.textContent = summary.join(' • ');
    }
  }

  function renderCuratedProducts() {
    if (!curatedGrid) return;
    curatedGrid.innerHTML = '';
    const curated = [...products]
      .sort((a, b) => Number(b.featured) - Number(a.featured) || a.price - b.price)
      .slice(0, 4);

    curated.forEach((product) => {
      curatedGrid.appendChild(buildProductCard(product, {
        metaLine: `${product.featured ? 'Editor pick' : 'Curated'} • ${getCategoryLabel(product.category)}`
      }));
    });
  }

  function renderProducts() {
    if (!grid) return;
    const filtered = applyFilters();
    const startIndex = (state.currentPage - 1) * state.itemsPerPage;
    const endIndex = startIndex + state.itemsPerPage;
    const visible = filtered.slice(startIndex, endIndex);

    grid.innerHTML = '';

    if (!filtered.length) {
      grid.innerHTML = '<p class="empty" style="grid-column:1 / -1;">No products matched this setup. Try another keyword or price range.</p>';
      if (paginationEl) paginationEl.innerHTML = '';
      updateResultsText(0, 0);
      return;
    }

    visible.forEach((product, index) => {
      const label = index < 3 && state.sort === 'popular' ? 'Top pick' : `${getCategoryLabel(product.category)} • ${product.featured ? 'Featured' : 'In stock'}`;
      grid.appendChild(buildProductCard(product, { metaLine: label }));
    });

    updateResultsText(filtered.length, visible.length);
    renderPagination(filtered.length);
  }

  function syncSearch(value) {
    state.searchQuery = String(value || '').trim();
    state.currentPage = 1;
    renderProducts();
    renderRecentSearches(recentSearchesEl, (query) => {
      if (searchInput) searchInput.value = query;
      syncSearch(query);
    });
  }

  catButtons.forEach((button) => {
    button.addEventListener('click', () => {
      catButtons.forEach((chip) => chip.classList.remove('active'));
      button.classList.add('active');
      state.category = button.dataset.cat;
      state.currentPage = 1;
      renderProducts();
    });
  });

  if (filterSelect) {
    filterSelect.addEventListener('change', function onChange() {
      state.sort = this.value;
      state.currentPage = 1;
      renderProducts();
    });
  }

  if (priceSelect) {
    priceSelect.addEventListener('change', function onChange() {
      state.priceRange = this.value;
      state.currentPage = 1;
      renderProducts();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (event) => {
      syncSearch(event.target.value);
    });

    searchInput.addEventListener('change', (event) => {
      rememberSearch(event.target.value);
      renderRecentSearches(recentSearchesEl, (query) => {
        searchInput.value = query;
        syncSearch(query);
      });
    });
  }

  renderInventoryDashboard();
  renderCuratedProducts();
  renderRecentSearches(recentSearchesEl, (query) => {
    if (searchInput) searchInput.value = query;
    syncSearch(query);
  });
  renderProducts();
}

function openProductModal(productId) {
  const overlay = $('#modalOverlay');
  const modal = $('#productModal');
  const product = getProducts().find((item) => item.id === productId);
  if (!product) return;

  currentProduct = product;

  const nameEl = $('#modalName');
  const priceEl = $('#modalPrice');
  const imgEl = $('#modalImg');
  const sizeEl = $('#modalSize');
  const qtyEl = $('#modalQty');
  const aboutEl = $('#modalAbout');

  if (nameEl) nameEl.textContent = product.name;
  if (priceEl) priceEl.textContent = toBaht(product.price);
  if (imgEl) {
    imgEl.src = product.img;
    imgEl.alt = product.name;
  }
  if (aboutEl) aboutEl.textContent = product.about || 'No product description available';
  if (sizeEl) sizeEl.value = 'M';
  if (qtyEl) qtyEl.value = '1';

  if (overlay) overlay.classList.add('open');
  if (modal) modal.classList.add('open');
}

function closeProductModal() {
  $('#modalOverlay')?.classList.remove('open');
  $('#productModal')?.classList.remove('open');
}

function initModalEvents() {
  const overlay = $('#modalOverlay');
  const closeBtn = $('#modalClose');
  const addBtn = $('#modalAddCart');
  const buyBtn = $('#modalBuyNow');
  const sizeSel = $('#modalSize');
  const qtyInput = $('#modalQty');

  const getSelection = () => {
    const size = sizeSel ? sizeSel.value : 'M';
    const qty = qtyInput ? Math.max(1, parseInt(qtyInput.value || '1', 10)) : 1;
    return { size, qty };
  };

  if (overlay) {
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) closeProductModal();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeProductModal);
  }

  if (addBtn) {
    addBtn.addEventListener('click', () => {
      if (!currentProduct) return;
      const { size, qty } = getSelection();
      addToCart(currentProduct, size, qty);
      closeProductModal();
      showModal('Added to cart', `${currentProduct.name} was added to your cart`);
    });
  }

  if (buyBtn) {
    buyBtn.addEventListener('click', () => {
      if (!currentProduct) return;
      const { size, qty } = getSelection();
      addToCart(currentProduct, size, qty);
      closeProductModal();
      location.href = 'checkout.html';
    });
  }
}

function initCartPage() {
  const listEl = $('#cartList');
  const subEl = $('#subTotal');
  const totEl = $('#grandTotal');
  const itemCountEl = $('#cartItemCount');
  const savingsEl = $('#cartSavings');

  function updateSummary() {
    const metrics = getCartMetrics();
    if (subEl) subEl.textContent = toBaht(metrics.subtotal);
    if (totEl) totEl.textContent = toBaht(metrics.subtotal);
    if (itemCountEl) itemCountEl.textContent = String(metrics.itemCount);
    if (savingsEl) savingsEl.textContent = toBaht(metrics.savings);
  }

  function renderCart() {
    const cart = getCart();
    if (!listEl) return;
    listEl.innerHTML = '';

    if (!cart.length) {
      listEl.innerHTML = '<li class="empty">Your cart is empty. Add a few standout pieces and come back here.</li>';
      updateSummary();
      return;
    }

    cart.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'cart-item';
      li.innerHTML = `
        <div class="cart-thumb" style="background-image:url('${item.img}')"></div>
        <div class="cart-info">
          <div class="cart-name">${item.name}</div>
          <div class="cart-price">${toBaht(item.price)}</div>
          <div class="cart-qty-row">
            <span class="cart-size">Size: ${item.size}</span>
            <button class="qty-btn" data-act="dec" type="button">-</button>
            <span class="qty">${item.qty}</span>
            <button class="qty-btn" data-act="inc" type="button">+</button>
          </div>
        </div>
        <button class="cart-remove" type="button" aria-label="Remove item">&times;</button>
      `;

      const [decBtn, incBtn] = $$('.qty-btn', li);
      const rmBtn = $('.cart-remove', li);

      decBtn?.addEventListener('click', () => {
        let cartState = getCart();
        const target = cartState.find((entry) => entry.id === item.id && entry.size === item.size);
        if (!target) return;
        target.qty -= 1;
        if (target.qty <= 0) {
          cartState = cartState.filter((entry) => !(entry.id === item.id && entry.size === item.size));
        }
        saveCart(cartState);
        renderCart();
      });

      incBtn?.addEventListener('click', () => {
        const cartState = getCart();
        const target = cartState.find((entry) => entry.id === item.id && entry.size === item.size);
        if (!target) return;
        target.qty += 1;
        saveCart(cartState);
        renderCart();
      });

      rmBtn?.addEventListener('click', () => {
        const cartState = getCart().filter((entry) => !(entry.id === item.id && entry.size === item.size));
        saveCart(cartState);
        renderCart();
      });

      listEl.appendChild(li);
    });

    updateSummary();
  }

  renderCart();
}

function requireLoginOrRedirect() {
  const session = getSession();
  if (session) return true;

  const params = new URLSearchParams();
  params.set('redirect', location.pathname.replace(/^\//, '') || 'index.html');
  const target = `login.html?${params.toString()}`;

  showModal('Login required', 'Please sign in first to continue with this step', () => {
    location.href = target;
  });

  return false;
}

function initCheckoutPage() {
  if (!requireLoginOrRedirect()) return;

  const listEl = $('#checkoutList');
  const subEl = $('#subTotal');
  const totEl = $('#grandTotal');
  const form = $('#checkoutForm');
  const profileStatus = $('#profileStatus');
  const deliveryEstimate = $('#deliveryEstimate');
  const profile = getProfile();
  const session = getSession() || {};

  function renderCart() {
    const cart = getCart();
    if (!listEl) return;
    listEl.innerHTML = '';

    if (!cart.length) {
      listEl.innerHTML = '<li class="empty">No items in cart. Head back to the collection and add something first.</li>';
    } else {
      cart.forEach((item) => {
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `
          <div class="cart-thumb" style="background-image:url('${item.img}')"></div>
          <div class="cart-info">
            <div class="cart-name">${item.name}</div>
            <div class="cart-price">${toBaht(item.price)}</div>
            <div class="cart-qty-row">Size: ${item.size} <strong>Qty ${item.qty}</strong></div>
          </div>
        `;
        listEl.appendChild(li);
      });
    }

    const metrics = getCartMetrics();
    if (subEl) subEl.textContent = toBaht(metrics.subtotal);
    if (totEl) totEl.textContent = toBaht(metrics.subtotal);
  }

  if (profileStatus) {
    profileStatus.textContent = profile.fullName ? 'Saved profile ready' : 'New customer';
  }

  if (deliveryEstimate) {
    deliveryEstimate.textContent = generateDeliveryEstimate();
  }

  if (form) {
    if (form.fullName) form.fullName.value = profile.fullName || session.username || '';
    if (form.email) form.email.value = profile.email || session.email || '';
    if (form.phone) form.phone.value = profile.phone || '';
    if (form.address) form.address.value = profile.address || '';

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const cart = getCart();
      if (!cart.length) {
        showModal('Cart is empty', 'Please add products before confirming payment');
        return;
      }

      const fd = new FormData(form);
      const shipping = {
        fullName: String(fd.get('fullName') || '').trim(),
        email: String(fd.get('email') || '').trim(),
        phone: String(fd.get('phone') || '').trim(),
        address: String(fd.get('address') || '').trim()
      };
      const payMethod = String(fd.get('payMethod') || '');

      if (!shipping.fullName || !shipping.email || !shipping.phone || !shipping.address) {
        showModal('Missing details', 'Please complete all shipping fields before confirming payment');
        return;
      }

      saveProfile({
        ...getProfile(),
        ...shipping,
        username: session.username || getProfile().username || ''
      });

      const metrics = getCartMetrics();
      const orders = getOrders();
      const order = {
        id: `ORD-${Date.now()}`,
        items: cart,
        total: metrics.subtotal,
        status: 'Processing',
        createdAt: new Date().toISOString(),
        owner: session.email || session.username || shipping.email,
        shipping,
        payMethod,
        itemCount: metrics.itemCount,
        eta: generateDeliveryEstimate()
      };

      orders.push(order);
      saveOrders(orders);
      setLS(KEY_CART, []);
      updateCartCount();

      showModal('Payment confirmed', 'Your order was recorded successfully and is now being prepared', () => {
        location.href = 'orders.html';
      });
    });
  }

  renderCart();
}

function initOrdersPage() {
  if (!requireLoginOrRedirect()) return;

  const session = getSession();
  const tbody = $('#ordersBody');
  const countEl = $('#ordersCount');
  const totalEl = $('#ordersTotalSpend');

  if (!tbody) return;

  const orders = getOrders()
    .filter((order) => order.owner === session.email || order.owner === session.username)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const totalSpend = orders.reduce((sum, order) => sum + order.total, 0);
  if (countEl) countEl.textContent = String(orders.length);
  if (totalEl) totalEl.textContent = toBaht(totalSpend);

  tbody.innerHTML = '';

  if (!orders.length) {
    const tr = document.createElement('tr');
    tr.innerHTML = '<td colspan="6" class="empty">No orders yet. Your future purchases will show up here.</td>';
    tbody.appendChild(tr);
    return;
  }

  orders.forEach((order, index) => {
    const tr = document.createElement('tr');
    const itemCount = order.itemCount || order.items.reduce((sum, item) => sum + item.qty, 0);
    const status = getOrderStatusMeta(order.status);
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>
        <strong>${order.id}</strong>
        <div class="table-subline">${order.payMethod || 'Standard payment'}</div>
      </td>
      <td>
        <div>${formatDate(order.createdAt)}</div>
        <div class="table-subline">ETA ${order.eta || generateDeliveryEstimate()}</div>
      </td>
      <td>${itemCount} items</td>
      <td>${toBaht(order.total)}</td>
      <td><span class="status-pill ${status.tone}">${status.label}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

function initLoginPage() {
  const loginForm = $('#loginForm');
  const registerForm = $('#registerForm');
  const tabLogin = $('#tabLogin');
  const tabRegister = $('#tabRegister');
  const demoLogin = $('#demoLogin');
  const redirect = new URLSearchParams(location.search).get('redirect') || 'index.html';

  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const identifier = loginForm.identifier.value.trim();
      const password = loginForm.password.value.trim();

      if (!identifier || !password) {
        showModal('Missing fields', 'Please enter both identifier and password');
        return;
      }

      if (loginUser(identifier, password)) {
        showModal('Welcome back', 'Login successful', () => {
          location.href = redirect;
        });
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const username = registerForm.username.value.trim();
      const email = registerForm.email.value.trim();
      const password = registerForm.password.value.trim();

      if (!username || !email || !password) {
        showModal('Missing fields', 'Please complete username, email, and password');
        return;
      }

      if (registerUser(username, email, password)) {
        showModal('Account created', 'Your account is ready and you are now signed in', () => {
          location.href = redirect;
        });
      }
    });
  }

  if (demoLogin) {
    demoLogin.addEventListener('click', () => {
      const mockUser = {
        username: 'PAPAYA DEMO',
        email: 'demo@papaya.shop'
      };
      setLS(KEY_SESSION, mockUser);
      saveProfile({
        ...getProfile(),
        username: mockUser.username,
        email: mockUser.email
      });
      showModal('Demo login ready', 'You are now inside the demo account', () => {
        location.href = redirect;
      });
    });
  }

  $$('.social-btn').forEach((button) => {
    if (button.id === 'demoLogin') return;
    button.addEventListener('click', () => {
      const mockUser = {
        username: 'PAPAYA USER',
        email: 'social@login.mock'
      };
      setLS(KEY_SESSION, mockUser);
      saveProfile({
        ...getProfile(),
        username: mockUser.username,
        email: mockUser.email
      });
      showModal('Social login ready', 'You are signed in with a mock social account', () => {
        location.href = redirect;
      });
    });
  });

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

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initModalEvents();

  const page = document.documentElement.dataset.page;
  if (page === 'home') initHomePage();
  if (page === 'cart') initCartPage();
  if (page === 'checkout') initCheckoutPage();
  if (page === 'orders') initOrdersPage();
  if (page === 'login') initLoginPage();

  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
