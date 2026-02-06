# TitanTechParts - User Stories

## User Personas

### 1. Alex - Tech Enthusiast
- **Age**: 28
- **Background**: Software developer building a gaming PC
- **Goals**: Find high-quality PC components at competitive prices
- **Tech Savviness**: High

### 2. Sarah - Small Business Owner
- **Age**: 35
- **Background**: Running a computer repair shop
- **Goals**: Purchase bulk components for repairs
- **Tech Savviness**: Medium

### 3. Mike - First-Time Builder
- **Age**: 22
- **Background**: College student building first PC
- **Goals**: Learn about components and make informed purchases
- **Tech Savviness**: Low to Medium

---

## User Journey: Complete Purchase Flow

### Story 1: New User Registration
**As a** new customer  
**I want to** create an account  
**So that** I can save my orders and track purchases

**Acceptance Criteria:**
- User can access the signup page from the homepage
- User must provide: username, email, and password
- Password must meet security requirements
- Email must be valid format
- Username must be unique
- Upon successful registration, user is automatically logged in
- User receives confirmation of successful registration

**Test Scenario:**
```
1. Navigate to homepage
2. Click "Sign Up" link
3. Fill in registration form:
   - Username: alex_builder
   - Email: alex@example.com
   - Password: SecurePass123!
4. Submit form
5. Verify redirect to homepage
6. Verify user is logged in (username visible in header)
```

---

### Story 2: User Login
**As a** registered user  
**I want to** log into my account  
**So that** I can access my cart and order history

**Acceptance Criteria:**
- User can access login page from homepage
- User can log in with username and password
- Invalid credentials show appropriate error message
- Successful login redirects to homepage
- User session persists across page refreshes
- User can see their username in the navigation header

**Test Scenario:**
```
1. Navigate to login page
2. Enter credentials:
   - Username: demouser
   - Password: demo123
3. Submit form
4. Verify redirect to homepage
5. Verify username appears in header
6. Refresh page
7. Verify user remains logged in
```

---

### Story 3: Browse Product Categories
**As a** customer  
**I want to** browse products by category  
**So that** I can find the components I need

**Acceptance Criteria:**
- Homepage displays product categories (CPU, GPU, RAM, Storage, etc.)
- Clicking a category shows products in that category
- Each product displays: name, image, price, stock status
- Categories show product count
- Out of stock items are clearly marked

**Test Scenario:**
```
1. Navigate to homepage
2. View available categories
3. Click "GPU" category
4. Verify GPU products are displayed
5. Verify each product shows:
   - Product image
   - Product name
   - Price
   - "Add to Cart" button (if in stock)
```

---

### Story 4: Search for Products
**As a** customer  
**I want to** search for specific products  
**So that** I can quickly find what I'm looking for

**Acceptance Criteria:**
- Search bar is visible on all pages
- Search works with partial product names
- Search results show relevant products
- No results message appears when search finds nothing
- Search results can be filtered by category

**Test Scenario:**
```
1. Navigate to search page
2. Enter "RTX" in search bar
3. Verify NVIDIA RTX products appear
4. Clear search
5. Enter "invalid_product_12345"
6. Verify "No products found" message
```

---

### Story 5: View Product Details
**As a** customer  
**I want to** view detailed product information  
**So that** I can make informed purchase decisions

**Acceptance Criteria:**
- Clicking a product shows detailed view
- Details include: full description, specifications, price, stock
- Product image is displayed prominently
- Related products are suggested
- User can add to cart from detail page

**Test Scenario:**
```
1. Navigate to search page
2. Click on a product
3. Verify product detail page shows:
   - Large product image
   - Full description
   - Technical specifications
   - Current price
   - Stock availability
   - "Add to Cart" button
```

---

### Story 6: Add Items to Cart
**As a** customer  
**I want to** add products to my shopping cart  
**So that** I can purchase multiple items at once

**Acceptance Criteria:**
- "Add to Cart" button is visible on product listings
- Clicking "Add to Cart" adds item to cart
- Cart icon shows item count
- User receives confirmation when item is added
- Out of stock items cannot be added to cart
- Default quantity is 1

**Test Scenario:**
```
1. Login as demouser
2. Navigate to search page
3. Click "Add to Cart" on first product
4. Verify success notification
5. Verify cart icon shows (1)
6. Add another product
7. Verify cart icon shows (2)
```

---

### Story 7: Manage Shopping Cart
**As a** customer  
**I want to** view and modify my cart contents  
**So that** I can review my order before checkout

**Acceptance Criteria:**
- Cart page shows all added items
- Each item displays: image, name, price, quantity
- User can increase/decrease quantity
- User can remove items from cart
- Cart shows subtotal for each item
- Cart shows total price, shipping, and tax
- Empty cart shows appropriate message

**Test Scenario:**
```
1. Click cart icon in header
2. Verify cart page displays all items
3. Increase quantity of first item to 2
4. Verify price updates
5. Click remove button on second item
6. Verify item is removed
7. Verify totals are recalculated
```

---

### Story 8: Proceed to Checkout
**As a** customer  
**I want to** complete my purchase  
**So that** I can receive my products

**Acceptance Criteria:**
- "Proceed to Checkout" button is available in cart
- Checkout requires user to be logged in
- Checkout form includes:
  - Contact information (email)
  - Shipping address (name, address, city, state, ZIP)
  - Payment information (card details)
- All fields are validated
- User can review order summary
- Order total is clearly displayed

**Test Scenario:**
```
1. From cart page, click "Proceed to Checkout"
2. Verify checkout form is displayed
3. Fill in shipping information:
   - First Name: John
   - Last Name: Doe
   - Address: 123 Main St
   - City: San Francisco
   - State: CA
   - ZIP: 94105
4. Fill in payment information:
   - Card Number: 4532 1234 5678 9012
   - Name: John Doe
   - Expiry: 12/25
   - CVV: 123
5. Verify order summary shows correct items and total
```

---

### Story 9: Place Order
**As a** customer  
**I want to** finalize my purchase  
**So that** my order is submitted and processed

**Acceptance Criteria:**
- "Place Order" button is available after filling form
- Clicking button submits the order
- User receives order confirmation
- User is redirected to order history page
- Order appears in order history immediately
- Cart is cleared after successful order
- Inventory is decremented

**Test Scenario:**
```
1. Complete checkout form
2. Click "Place Order" button
3. Verify success message appears
4. Verify redirect to order history page
5. Verify new order appears in list
6. Navigate to cart
7. Verify cart is empty
```

---

### Story 10: View Order History
**As a** customer  
**I want to** view my past orders  
**So that** I can track purchases and reorder items

**Acceptance Criteria:**
- Order history page is accessible from navigation
- All user orders are displayed
- Each order shows: order ID, date, total, status
- Clicking an order shows full details
- Orders are sorted by date (newest first)
- Empty state shows appropriate message for new users

**Test Scenario:**
```
1. Navigate to order history page
2. Verify all placed orders are listed
3. Verify order details include:
   - Order ID
   - Order date
   - Items ordered
   - Total amount
   - Order status
4. Verify orders are sorted by date
```

---

### Story 11: User Logout
**As a** logged-in user  
**I want to** log out of my account  
**So that** my session is secure on shared devices

**Acceptance Criteria:**
- Logout button is visible when logged in
- Clicking logout clears user session
- User is redirected to homepage
- Protected pages redirect to login after logout
- Cart is cleared on logout (or saved to account)

**Test Scenario:**
```
1. Click logout button in header
2. Verify redirect to homepage
3. Verify username no longer appears in header
4. Try to access order history
5. Verify redirect to login page
```

---

## Error Handling Scenarios

### Scenario 1: Network Failure
**Given** user is placing an order  
**When** network connection fails  
**Then** user sees appropriate error message  
**And** order is not submitted  
**And** user can retry

### Scenario 2: Out of Stock
**Given** user has item in cart  
**When** item goes out of stock before checkout  
**Then** user is notified at checkout  
**And** cannot complete purchase  
**And** can remove item from cart

### Scenario 3: Session Timeout
**Given** user is logged in  
**When** session expires during shopping  
**Then** user is redirected to login  
**And** cart is preserved  
**And** can resume after re-login

---

## Performance Requirements

- Homepage loads in < 2 seconds
- Product search returns results in < 1 second
- Cart updates are instant
- Order placement completes in < 3 seconds
- Images load progressively with placeholders

---

## Accessibility Requirements

- All forms have proper labels
- Keyboard navigation works throughout
- Screen reader compatible
- Color contrast meets WCAG AA standards
- Error messages are announced to screen readers

---

## Security Requirements

- Passwords are hashed (never stored plain text)
- HTTPS for all production traffic
- CSRF protection on forms
- SQL injection prevention
- XSS prevention on user inputs
- Sessions expire after 24 hours of inactivity
