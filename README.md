
# 🚲 Bi-Cycle Store API :-

An Express-based Bi-Cycle store API built with TypeScript, integrating MongoDB through Mongoose for seamless database management. This project includes robust data validation using **Zod** and offers features like product management, order handling, and revenue calculation.

---

# 🌟 Features of the project :-

- **Bi-Cycle Management:** Create, update, delete, and fetch Bi-Cycles.
- **Order Management:** Place orders with automatic inventory updates.
- **Revenue Calculation:** Calculate total revenue using MongoDB aggregation.
- **Input Validation:** Zod is used for strong input validation to ensure data integrity.
- **Error Handling:** Comprehensive error responses for validation failures, resource not found, and other errors.

---
# 🔮 Tech used for the project :-

- **TypeScript**: Ensures type safety and scalability.
- **Express.js**: Backend framework for routing and API development.
- **MongoDB**: NoSQL database for storing Bi-Cycle and order data.
- **Mongoose**: ODM for defining and managing MongoDB schemas.
- **Zod**: Input validation for robust and predictable API behavior.

---

# 🚀 API Endpoints to consume data from the database :-

## 🚲 **For Bi-Cycle Management** --

### 1. **Create a Bi-Cycle** -

- **Endpoint**: `POST /api/products`
- **Request Body**:
  ```json
  {
    "name": "Roadster 5000",
    "brand": "SpeedX",
    "price": 300,
    "type": "Road",
    "description": "A premium road bike designed for speed and performance.",
    "quantity": 20,
    "inStock": true
  }
  ```


- **Response**:
  ```json
  {
    "message": "Bi-Cycle created successfully",
    "success": true,
    "data": { ...Bi-CycleDetails }
  }
  ```

### 2. **Get All Bi-Cycles** -

- **Endpoint**: `GET /api/products`
- **Query**: Search Bi-Cycles by `name`, `brand`, or `type`.
- **Response**:
  ```json
  {
    "message": "Bi-Cycles retrieved successfully",
    "success": true,
    "data": [ ...Bi-CyclesList ]
  }
  ```

### 3. **Get a Specific Bi-Cycle** -

- **Endpoint**: `GET /api/products/:productId`
- **Response**:
  ```json
  {
    "message": "Bi-Cycle retrieved successfully",
    "success": true,
    "data": { ...Bi-CycleDetails }
  }
  ```

### 4. **Update a Bi-Cycle** -

- **Endpoint**: `PUT /api/products/:productId`
- **Request Body**:
  ```json
  {
    "price": 15,
    "quantity": 25
  }
  ```
- **Response**:
  ```json
  {
    "message": "Bi-Cycle updated successfully",
    "success": true,
    "data": { ...updatedBi-CycleDetails }
  }
  ```

### 5. **Delete a Bi-Cycle** -

- **Endpoint**: `DELETE /api/products/:productId`
- **Response**:
  ```json
  {
    "message": "Bi-Cycle deleted successfully",
    "success": true
  }
  ```

---

## 🛒 **For Order Management** --

### 6. **Order a Bi-Cycle** -

- **Endpoint**: `POST /api/orders`
- **Request Body**:
  ```json
  {
    "email": "customer@example.com",
    "product": "648a45e5f0123c45678d9012",
    "quantity": 2,
    "totalPrice": 30
  }
  ```
- **Response**:
  ```json
  {
    "message": "Order created successfully",
    "success": true,
    "data": { ...orderDetails }
  }
  ```

### 7. **Calculate Revenue** -

- **Endpoint**: `GET /api/orders/revenue`
- **Response**:
  ```json
  {
    "message": "Revenue calculated successfully",
    "success": true,
    "data": { "totalRevenue": 450 }
  }
  ```

---

# ⚠️ Error Responses :-

- **Validation Errors**:

  ```json
  {
    "message": "Validation failed",
    "success": false,
    "error": { ...errorDetails },
    "stack": "Error: ..."
  }
  ```

- **Resource Not Found**:
  ```json
  {
    "message": "Resource not found",
    "success": false
  }
  ```

---

# 🌐 Deployment :-

- **Live Link**: [https://bycycle.vercel.app/]

---

# 📜 Instructions to Run Locally :-

1. Clone the repository:
   ```bash
   git clone
   ```
2. Navigate to the project directory:
   ```bash
   cd Bi-CycleShopAPI
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables in a `.env` file:
   ```env
   MONGO_URI=<your_mongo_connection_string>
   PORT=8000
   ```
5. Start the server:
   ```bash
   npm run dev
   ```
6. Access the API at :
```bash
   http://localhost:8000 
   ```
---
