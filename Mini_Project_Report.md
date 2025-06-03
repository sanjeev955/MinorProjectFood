# Mini Project Report

## Required Diagrams

### 1. DFD Level 0
- **Description**: This diagram will provide a high-level overview of the system, showing the main processes and data flows between them.
- **Processes**:
  - User Management
  - Cart Management
  - Order Management
- **Data Stores**:
  - User Data
  - Cart Data
  - Order Data

### 2. DFD Level 1
- **Description**: This diagram will break down the main processes from DFD Level 0 into more detailed subprocesses.
- **Processes**:
  - User Management
    - Register User
    - Login User
  - Cart Management
    - Add to Cart
    - Remove from Cart
    - Fetch Cart
  - Order Management
    - Place Order
    - Verify Order
    - List Orders
    - Update Order Status

### 3. ER Diagram
- **Entities**:
  - User
    - Attributes: userId, name, email, role, cartData
  - Order
    - Attributes: orderId, userId, items, amount, address, paymentStatus
  - Item
    - Attributes: itemId, name, price, quantity

### 4. Use Case Diagram
- **Actors**:
  - User
  - Admin
- **Use Cases**:
  - User: Register, Login, Add to Cart, Remove from Cart, Place Order, View Orders
  - Admin: List Orders, Update Order Status

### 5. Sequence Diagram
- **Description**: This diagram will illustrate the sequence of interactions between the user, cart, and order processes during a typical order placement scenario.

### 6. System Architecture Diagram
- **Description**: This diagram will depict the overall architecture of the system, including the frontend, backend, and database components.

## Follow-up Steps
- Create the diagrams based on the above descriptions.
- Review the diagrams for accuracy and completeness.