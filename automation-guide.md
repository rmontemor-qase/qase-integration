# GameDay Gear

A sports equipment e-commerce demo application built for showcasing test automation interactions. Built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui.

This is a **Qase demonstration application**. All content is simulated — no real transactions are processed.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (styling via semantic design tokens)
- **React Router v6** (routing)
- **shadcn/ui** (component library)

---

## Pages & Routes

| Route | Page | Component | Description |
|-------|------|-----------|-------------|
| `/` | Shop | `Index` | Product catalog with search, category filters, sorting |
| `/login` | Login | `Login` | Sign-in form with dummy credentials |
| `/product/:id` | Product Detail | `ProductDetail` | Full product page with size/color selectors, quantity, add-to-cart |
| `/cart` | Shopping Cart | `Cart` | Cart items with quantity controls, summary, checkout link |
| `/checkout` | Checkout | `Checkout` | Shipping + payment form with order confirmation |
| `/account` | Account | `Account` | User profile with wishlist (requires login) |
| `/wishlist` | Wishlist | `Wishlist` | Saved products with add-to-cart and remove |
| `*` | Not Found | `NotFound` | 404 page |

---

## Authentication (Client-Side)

The app uses an **optional** client-side login flow with hardcoded dummy credentials stored in `AuthContext`. No backend is required. Login state is persisted in `localStorage` (`auth`, `auth_user` keys).

### Dummy Accounts

| Username | Password |
|----------|----------|
| `admin` | `password123` |
| `engineer` | `test456` |
| `testuser` | `qwerty` |

---

## Product Data (8 items)

All products are fictional demo items. Prices use "credits" (a fictional currency) to avoid confusion with real transactions.

| ID | Name | Price | Category | In Stock |
|----|------|-------|----------|----------|
| prod-001 | Soccer Ball | 25 credits | Balls | ✓ |
| prod-002 | Basketball | 35 credits | Balls | ✓ |
| prod-003 | Volleyball | 30 credits | Balls | ✓ |
| prod-004 | Running Sneakers | 120 credits | Footwear | ✓ |
| prod-005 | Sports Jersey | 55 credits | Apparel | ✓ |
| prod-006 | Tennis Ball Set | 15 credits | Balls | ✗ |
| prod-007 | Gym Duffel Bag | 65 credits | Accessories | ✓ |
| prod-008 | Athletic Shorts | 40 credits | Apparel | ✓ |

Categories: All, Balls, Apparel, Footwear, Accessories

---

## Test Automation Guide

All interactive elements use `data-testid` attributes for reliable selector targeting. Below is an exhaustive reference of every testable scenario, organized by page.

---

### 0. Login Flow

**URL:** `/login`
**Page container:** `data-testid="login-page"`

#### Elements

| Selector | Element | Type | Description |
|----------|---------|------|-------------|
| `login-page` | Page wrapper | `div` | Confirms login page is loaded |
| `login-form` | Form | `form` | Contains username, password, and submit |
| `username-input` | Username field | `input[type="text"]` | Required. Placeholder: "Enter username" |
| `password-input` | Password field | `input[type="password"]` | Required. Placeholder: "Enter password" |
| `login-btn` | Submit button | `button[type="submit"]` | Text: "Sign In" |
| `login-error` | Error message | `div` | Appears on invalid credentials. Text: "Invalid credentials. Try admin / password123" |
| `skip-login-btn` | Skip button | `button` | Text: "Skip login →". Navigates to `/` |

#### Scenarios

| # | Scenario | Steps | Expected Result |
|---|----------|-------|-----------------|
| 0.1 | Successful login | Navigate to `/login`. Fill `username-input` with `admin`, `password-input` with `password123`. Click `login-btn`. | Redirects to `/`. `logged-in-user` displays "admin". |
| 0.2 | Failed login | Navigate to `/login`. Fill `username-input` with `wrong`, `password-input` with `wrong`. Click `login-btn`. | `login-error` appears with error text. |
| 0.3 | Skip login | Navigate to `/login`. Click `skip-login-btn` ("Skip login →"). | Redirects to `/`. |
| 0.4 | Logout | Login successfully, then click `logout-btn` in navbar. | `nav-login-btn` appears. `logged-in-user` and `logout-btn` disappear. |
| 0.5 | Nav bar auth state | Visit `/` without login. | `nav-login-btn` is visible. After login: `logged-in-user` and `logout-btn` are visible instead. |

---

### 1. Shop Page (Product Catalog)

**URL:** `/`
**Page container:** `data-testid="shop-page"`

#### Elements

| Selector | Element | Description |
|----------|---------|-------------|
| `shop-page` | Page wrapper | Main shop page |
| `hero-section` | Hero banner | Contains title "GameDay Gear" |
| `hero-subtitle` | Subtitle | Text: "Sports equipment, apparel, and accessories" |
| `nav-bar` | Navigation bar | Sticky nav with logo, wishlist, cart, auth controls |
| `nav-logo` | Logo link | Text: "GameDay Gear", links to `/` |
| `nav-login-btn` | Sign In link | Visible when logged out |
| `nav-cart-link` | Cart icon link | Links to `/cart` |
| `nav-wishlist-link` | Wishlist icon link | Links to `/wishlist` |
| `nav-account-link` | Account link | Visible when logged in, links to `/account` |
| `logged-in-user` | Username display | Shows current username |
| `logout-btn` | Sign Out button | Visible when logged in |
| `cart-count` | Cart badge | Shows number of items in cart |
| `wishlist-count` | Wishlist badge | Shows number of wishlisted items |
| `search-input` | Search field | Placeholder: "Search products..." |
| `sort-select` | Sort dropdown | Options (label / value): Name: A-Z (`name-asc`), Name: Z-A (`name-desc`), Price: Low to High (`price-asc`), Price: High to Low (`price-desc`), Top Rated (`rating-desc`) |
| `category-filters` | Category filter container | Contains category buttons |
| `category-all` | All category button | Filters to show all products |
| `category-balls` | Balls category button | Filters to Balls |
| `category-apparel` | Apparel category button | Filters to Apparel |
| `category-footwear` | Footwear category button | Filters to Footwear |
| `category-accessories` | Accessories category button | Filters to Accessories |
| `product-count` | Result count | Text: "{n} products" |
| `product-grid` | Product grid container | Contains product cards |
| `product-card-{n}` | Product card | Zero-indexed |
| `product-name-{n}` | Product name | Zero-indexed |
| `product-price-{n}` | Product price | Zero-indexed, e.g. "25.00 credits" |
| `product-category-{n}` | Product category | Zero-indexed |
| `product-rating-{n}` | Product rating | Zero-indexed |
| `product-image-{n}` | Product image | Zero-indexed |
| `product-link-{n}` | Product detail link | Zero-indexed, links to `/product/{id}` |
| `add-to-cart-btn-{n}` | Add to Cart button | Zero-indexed, only on in-stock products |
| `out-of-stock-{n}` | Out of Stock label | Zero-indexed, only on out-of-stock products |
| `wishlist-btn-{n}` | Wishlist toggle | Zero-indexed, heart icon |
| `no-results` | No results message | Shown when search/filter yields 0 products |
| `footer` | Footer | Contains Qase demo disclaimer |

#### Scenarios

| # | Scenario | Steps | Expected Result |
|---|----------|-------|-----------------|
| 1.1 | Page renders | Navigate to `/`. | `shop-page` is visible. `product-count` shows "8 products". |
| 1.2 | Search by name | Type "basketball" in `search-input`. | 1 result shown. `product-count` shows "1 product". `product-name-0` is "Basketball". |
| 1.3 | Search no results | Type "xyz123" in `search-input`. | `no-results` is visible. `product-count` shows "0 products". |
| 1.4 | Clear search | Clear `search-input`. | All 8 products restored. |
| 1.5 | Filter by category | Click `category-balls`. | Only Balls products shown. `product-count` shows "4 products". |
| 1.6 | Filter All | Click `category-all`. | All 8 products shown. |
| 1.7 | Sort by price low | Select "Price: Low to High" from `sort-select`. | `product-name-0` is "Tennis Ball Set" (15 credits). |
| 1.8 | Sort by price high | Select "Price: High to Low" from `sort-select`. | `product-name-0` is "Running Sneakers" (120 credits). |
| 1.9 | Add to cart from catalog | Click `add-to-cart-btn-0`. | `cart-count` appears/increments in navbar. |
| 1.10 | Out of stock item | Check Tennis Ball Set card. | `out-of-stock-{n}` is visible. No "Add" button for that card. |
| 1.11 | Toggle wishlist | Click `wishlist-btn-0`. | Heart fills red. `wishlist-count` appears in navbar. Click again → heart unfills. |
| 1.12 | Navigate to product | Click `product-link-0`. | Navigates to `/product/{id}`. |

---

### 2. Product Detail Page

**URL:** `/product/:id`
**Page container:** `data-testid="product-detail-page"`

#### Elements

| Selector | Element | Description |
|----------|---------|-------------|
| `product-detail-page` | Page wrapper | |
| `back-to-shop` | Back link | Text: "Back to Shop", links to `/` |
| `detail-product-image` | Product image | Full-size product image |
| `detail-product-name` | Product name | e.g. "Running Sneakers" |
| `detail-category` | Category label | e.g. "FOOTWEAR" |
| `detail-price` | Price | e.g. "120.00 credits" |
| `detail-description` | Description | Product description text |
| `detail-rating` | Rating | Star rating with review count |
| `size-selector` | Size options container | Only present if product has sizes |
| `size-option-{size}` | Size button | e.g. `size-option-M`, `size-option-L` |
| `color-selector` | Color options container | Only present if product has colors |
| `color-option-{color}` | Color button | e.g. `color-option-Black`, `color-option-Red` |
| `quantity-selector` | Quantity controls | |
| `decrease-quantity` | Decrease button | Min 1 |
| `quantity-value` | Quantity display | Default: "1" |
| `increase-quantity` | Increase button | |
| `detail-add-to-cart` | Add to Cart button | Only for in-stock products |
| `detail-out-of-stock` | Out of Stock label | Only for out-of-stock products |
| `detail-wishlist-btn` | Wishlist toggle | Heart icon |
| `added-to-cart-message` | Confirmation text | "Item added to your cart!" — shown briefly after adding |

#### Scenarios

| # | Scenario | Steps | Expected Result |
|---|----------|-------|-----------------|
| 2.1 | Page renders | Navigate to `/product/prod-004`. | `detail-product-name` is "Running Sneakers". `detail-price` is "120.00 credits". |
| 2.2 | Select size | Click `size-option-L`. | L button gets active styling. |
| 2.3 | Select color | Click `color-option-Black`. | Black button gets active styling. |
| 2.4 | Increase quantity | Click `increase-quantity` twice. | `quantity-value` is "3". |
| 2.5 | Decrease quantity | Click `decrease-quantity`. | `quantity-value` is "2". Min is 1. |
| 2.6 | Add to cart | Click `detail-add-to-cart`. | `added-to-cart-message` appears. `cart-count` increments. |
| 2.7 | Wishlist toggle | Click `detail-wishlist-btn`. | Heart fills. Click again → unfills. |
| 2.8 | Out of stock product | Navigate to `/product/prod-006`. | `detail-out-of-stock` is visible. No add-to-cart button. |
| 2.9 | Back navigation | Click `back-to-shop`. | Returns to `/`. |

---

### 3. Shopping Cart

**URL:** `/cart`
**Page container:** `data-testid="cart-page"`

#### Elements

| Selector | Element | Description |
|----------|---------|-------------|
| `cart-page` | Page wrapper | |
| `back-to-shop` | Back link | Text: "Continue Shopping" |
| `cart-total-items` | Item count | Text: "{n} items" |
| `empty-cart` | Empty state | Shown when cart is empty |
| `cart-item-{n}` | Cart item row | Zero-indexed |
| `cart-item-name-{n}` | Item name | Zero-indexed |
| `cart-item-price-{n}` | Item unit price in credits | Zero-indexed |
| `cart-item-quantity-{n}` | Item quantity | Zero-indexed |
| `cart-increase-{n}` | Increase quantity button | Zero-indexed |
| `cart-decrease-{n}` | Decrease quantity button | Zero-indexed |
| `remove-cart-item-{n}` | Remove item button | Zero-indexed |
| `cart-summary` | Summary container | |
| `cart-subtotal` | Subtotal | e.g. "150.00 credits" |
| `cart-shipping` | Shipping cost | "Free" if subtotal >= 100 credits, else "10 credits" |
| `cart-total` | Total | Subtotal + shipping in credits |
| `checkout-btn` | Checkout link | Links to `/checkout` |
| `clear-cart-btn` | Clear cart button | Removes all items |

#### Scenarios

| # | Scenario | Steps | Expected Result |
|---|----------|-------|-----------------|
| 3.1 | Empty cart | Navigate to `/cart` with no items. | `empty-cart` is visible. |
| 3.2 | Cart with items | Add items from shop, navigate to `/cart`. | `cart-item-0` is visible. Quantities and prices shown. |
| 3.3 | Increase quantity | Click `cart-increase-0`. | `cart-item-quantity-0` increments. Total updates. |
| 3.4 | Decrease quantity | Click `cart-decrease-0` to quantity 1, then again. | Item is removed. |
| 3.5 | Remove item | Click `remove-cart-item-0`. | Item disappears. `cart-total-items` decrements. |
| 3.6 | Free shipping | Add items totaling >= 100 credits. | `cart-shipping` shows "Free". |
| 3.7 | Paid shipping | Cart subtotal < 100 credits. | `cart-shipping` shows "10 credits". |
| 3.8 | Clear cart | Click `clear-cart-btn`. | `empty-cart` appears. |
| 3.9 | Go to checkout | Click `checkout-btn`. | Navigates to `/checkout`. |

---

### 4. Checkout

**URL:** `/checkout`
**Page container:** `data-testid="checkout-page"`

#### Elements

| Selector | Element | Type | Label | Placeholder |
|----------|---------|------|-------|-------------|
| `checkout-page` | Page wrapper | `div` | — | — |
| `back-to-cart` | Back link | `a` | — | Text: "Back to Cart" |
| `checkout-form` | Form | `form` | — | — |
| `checkout-first-name` | First Name | `input[type="text"]` | First Name | "John" |
| `checkout-last-name` | Last Name | `input[type="text"]` | Last Name | "Smith" |
| `checkout-email` | Email | `input[type="email"]` | Email | "john@email.com" |
| `checkout-phone` | Phone | `input[type="tel"]` | Phone | "555-0123" |
| `checkout-address` | Address | `input[type="text"]` | Address | "123 Main St" |
| `checkout-city` | City | `input[type="text"]` | City | "New York" |
| `checkout-country` | Country | `input[type="text"]` | Country | "USA" |
| `checkout-zip` | ZIP Code | `input[type="text"]` | ZIP Code | "10001" |
| `checkout-card-number` | Card Number | `input[type="text"]` | Card Number | "0000 0000 0000 0000" |
| `checkout-expiry` | Expiry Date | `input[type="text"]` | Expiry Date | "MM/YY" |
| `checkout-cvv` | CVV | `input[type="text"]` | CVV | "123" |
| `place-order-btn` | Submit | `button[type="submit"]` | — | Text: "Place Order — {total} credits" |
| `checkout-summary` | Order summary sidebar | `div` | — | — |
| `checkout-item-{n}` | Summary item | `div` | — | Zero-indexed |
| `checkout-subtotal` | Subtotal | `span` | — | — |
| `checkout-shipping` | Shipping | `span` | — | — |
| `checkout-total` | Total | `span` | — | — |

#### Order Confirmation Elements

| Selector | Element | Description |
|----------|---------|-------------|
| `order-confirmation` | Confirmation container | Shown after successful submission |
| `order-number` | Order number | Random order ID, e.g. "ORD-A1B2C3" |
| `confirmed-name` | Confirmed name | Shows submitted first + last name |
| `confirmed-email` | Confirmed email | Shows submitted email |
| `confirmed-address` | Confirmed address | Shows full address |
| `continue-shopping-btn` | Continue button | Navigates to `/` |
| `order-details` | Order details card | Contains confirmation info |

#### Scenarios

| # | Scenario | Steps | Expected Result |
|---|----------|-------|-----------------|
| 4.1 | Empty cart redirect | Navigate to `/checkout` with empty cart. | Copy: "Your cart is empty. Add items before checking out." Link to shop (e.g. "Go Shopping"). |
| 4.2 | Fill and submit | Add items to cart. Navigate to `/checkout`. Fill all fields. Click `place-order-btn`. | `order-confirmation` appears. `order-number` shows ID. `confirmed-name` shows entered name. |
| 4.3 | Required validation | Leave fields empty, click `place-order-btn`. | Browser native validation prevents submission. |
| 4.4 | Order summary | Check `checkout-summary`. | Lists cart items with quantities and prices. Shows subtotal, shipping, total. |
| 4.5 | Back to cart | Click `back-to-cart`. | Navigates to `/cart`. |
| 4.6 | Continue shopping | After order confirmation, click `continue-shopping-btn`. | Navigates to `/`. Cart is cleared. |

---

### 5. Wishlist

**URL:** `/wishlist`
**Page container:** `data-testid="wishlist-page"`

#### Elements

| Selector | Element | Description |
|----------|---------|-------------|
| `wishlist-page` | Page wrapper | |
| `back-to-shop` | Back link | Links to `/` |
| `wishlist-total` | Item count | Text: "{n} items" |
| `empty-wishlist` | Empty state | Shown when wishlist is empty |
| `wishlist-card-{n}` | Wishlist item card | Zero-indexed |
| `wishlist-name-{n}` | Item name | Zero-indexed |
| `wishlist-price-{n}` | Item price | Zero-indexed |
| `wishlist-to-cart-{n}` | Add to Cart button | Zero-indexed, only for in-stock |
| `wishlist-remove-btn-{n}` | Remove button | Zero-indexed |
| `clear-wishlist-btn` | Clear all button | Shown when the wishlist has items; not rendered on empty state — do not wait unbounded for it in automation. |

#### Scenarios

| # | Scenario | Steps | Expected Result |
|---|----------|-------|-----------------|
| 5.1 | Empty wishlist | Navigate to `/wishlist` with no items. | `empty-wishlist` is visible. |
| 5.2 | Wishlist with items | Add items via heart icon, navigate to `/wishlist`. | `wishlist-card-0` is visible. |
| 5.3 | Add to cart from wishlist | Click `wishlist-to-cart-0`. | `cart-count` increments in navbar. |
| 5.4 | Remove from wishlist | Click `wishlist-remove-btn-0`. | Item disappears. `wishlist-total` decrements. |
| 5.5 | Clear wishlist | Click `clear-wishlist-btn`. | `empty-wishlist` appears. |

---

### 6. Account Page

**URL:** `/account`
**Page container:** `data-testid="account-page"`

#### Elements

| Selector | Element | Description |
|----------|---------|-------------|
| `account-page` | Page wrapper | |
| `account-login-prompt` | Login prompt | Shown when not logged in |
| `account-username` | Username display | Shows "Signed in as {username}" |
| `wishlist-item-count` | Wishlist count | Text: "{n} items" |
| `empty-wishlist` | Empty state | Shown when no wishlisted items |
| `wishlist-item-{n}` | Wishlist item | Zero-indexed |
| `wishlist-item-name-{n}` | Item name | Zero-indexed |
| `wishlist-item-price-{n}` | Item price | Zero-indexed |
| `wishlist-add-to-cart-{n}` | Add to Cart button | Zero-indexed |
| `wishlist-remove-{n}` | Remove button | Zero-indexed |
| `clear-wishlist-btn` | Clear all button | |

#### Scenarios

| # | Scenario | Steps | Expected Result |
|---|----------|-------|-----------------|
| 6.1 | Not logged in | Navigate to `/account` without login. | `account-login-prompt` is visible. |
| 6.2 | Logged in | Login, navigate to `/account`. | `account-username` shows username. |
| 6.3 | Wishlist on account | Add items to wishlist, login, go to `/account`. | Wishlisted items shown. |
| 6.4 | Add to cart | Click `wishlist-add-to-cart-0`. | `cart-count` increments. |
| 6.5 | Remove from wishlist | Click `wishlist-remove-0`. | Item disappears. |

---

### 7. Footer

**URL:** `/` (bottom of page)
**Container:** `data-testid="footer"`

| # | Scenario | Steps | Expected Result |
|---|----------|-------|-----------------|
| 7.1 | Footer renders | Scroll to bottom of `/`. | `footer` is visible. Contains Qase demo disclaimer (e.g. "This is a Qase demonstration application..."). |

---

### 8. Routing & 404

| # | Scenario | Steps | Expected Result |
|---|----------|-------|-----------------|
| 8.1 | Home/Shop | Navigate to `/`. | `shop-page` is visible. |
| 8.2 | Login | Navigate to `/login`. | `login-page` is visible. |
| 8.3 | Product Detail | Navigate to `/product/prod-001`. | `product-detail-page` is visible. |
| 8.4 | Cart | Navigate to `/cart`. | `cart-page` is visible. |
| 8.5 | Checkout | Navigate to `/checkout`. | `checkout-page` is visible. |
| 8.6 | Account | Navigate to `/account`. | `account-page` is visible. |
| 8.7 | Wishlist | Navigate to `/wishlist`. | `wishlist-page` is visible. |
| 8.8 | 404 | Navigate to `/nonexistent`. | 404 content renders. |

---

## Quick Selector Reference

All `data-testid` values across the app, grouped by page:

### `/login`
`login-page`, `login-form`, `username-input`, `password-input`, `login-btn`, `login-error`, `skip-login-btn`

### `/` (Shop)
`shop-page`, `hero-section`, `hero-subtitle`, `nav-bar`, `nav-logo`, `nav-login-btn`, `nav-cart-link`, `nav-wishlist-link`, `nav-account-link`, `logged-in-user`, `logout-btn`, `cart-count`, `wishlist-count`, `search-input`, `sort-select`, `category-filters`, `category-all`, `category-balls`, `category-apparel`, `category-footwear`, `category-accessories`, `product-count`, `product-grid`, `product-card-{n}`, `product-name-{n}`, `product-price-{n}`, `product-category-{n}`, `product-rating-{n}`, `product-image-{n}`, `product-link-{n}`, `add-to-cart-btn-{n}`, `out-of-stock-{n}`, `wishlist-btn-{n}`, `no-results`, `footer`

### `/product/:id`
`product-detail-page`, `back-to-shop`, `detail-product-image`, `detail-product-name`, `detail-category`, `detail-price`, `detail-description`, `detail-rating`, `size-selector`, `size-option-{size}`, `color-selector`, `color-option-{color}`, `quantity-selector`, `decrease-quantity`, `quantity-value`, `increase-quantity`, `detail-add-to-cart`, `detail-out-of-stock`, `detail-wishlist-btn`, `added-to-cart-message`

### `/cart`
`cart-page`, `back-to-shop`, `cart-total-items`, `empty-cart`, `cart-item-{n}`, `cart-item-name-{n}`, `cart-item-price-{n}`, `cart-item-quantity-{n}`, `cart-increase-{n}`, `cart-decrease-{n}`, `remove-cart-item-{n}`, `cart-summary`, `cart-subtotal`, `cart-shipping`, `cart-total`, `checkout-btn`, `clear-cart-btn`

### `/checkout`
`checkout-page`, `back-to-cart`, `checkout-form`, `checkout-first-name`, `checkout-last-name`, `checkout-email`, `checkout-phone`, `checkout-address`, `checkout-city`, `checkout-country`, `checkout-zip`, `checkout-card-number`, `checkout-expiry`, `checkout-cvv`, `place-order-btn`, `checkout-summary`, `checkout-item-{n}`, `checkout-subtotal`, `checkout-shipping`, `checkout-total`, `order-confirmation`, `order-number`, `confirmed-name`, `confirmed-email`, `confirmed-address`, `order-details`, `continue-shopping-btn`

### `/wishlist`
`wishlist-page`, `back-to-shop`, `wishlist-total`, `empty-wishlist`, `wishlist-card-{n}`, `wishlist-name-{n}`, `wishlist-price-{n}`, `wishlist-to-cart-{n}`, `wishlist-remove-btn-{n}`, `clear-wishlist-btn`

### `/account`
`account-page`, `account-login-prompt`, `account-username`, `wishlist-item-count`, `empty-wishlist`, `wishlist-item-{n}`, `wishlist-item-name-{n}`, `wishlist-item-price-{n}`, `wishlist-add-to-cart-{n}`, `wishlist-remove-{n}`, `clear-wishlist-btn`

---

## Running the App

```sh
npm install
npm run dev
```

## Building for Production

```sh
npm run build
```
