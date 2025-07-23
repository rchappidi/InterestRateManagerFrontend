# Interest Rate Manager Service

This project is a full-stack application for managing interest rates for banking products. It supports versioning and includes a maker-checker approval workflow.

## 🧩 Tech Stack

- **Backend**: Java Spring Boot 3, PostgreSQL, JWT Auth
- **Frontend**: React.js
- **Database**: PostgreSQL (Docker)
- **Others**: Maker-Checker Flow, Product Versioning

---

## ⚙️ Backend Setup

### Prerequisites

- Java 17+
- Maven
- PostgreSQL running (Docker recommended)
- Spring Boot 3

### Steps

1. Navigate to the backend directory.

2. Configure DB in `application.yml`:

```
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/irmdb
    username: irmuser
    password: irmpass
```

3. Run using:

```bash
./mvnw spring-boot:run
```

Or in your IDE.

---

## 🖥️ Frontend Setup

### Prerequisites

- Node.js 18+

### Steps

```bash
cd frontend
npm install
npm start
```

You can now access the UI at `http://localhost:3000`

---

## 🐳 Docker (for DB)

Use the following `docker-compose.yml`:

```yaml
version: '3'
services:
  postgres:
    image: postgres:14
    container_name: irm-postgres
    environment:
      POSTGRES_USER: irmuser
      POSTGRES_PASSWORD: irmpass
      POSTGRES_DB: irmdb
    ports:
      - "5432:5432"
```

```bash
docker-compose up -d
```

---

## 👥 Roles

- **Maker**: Creates products and new versions.
- **Checker**: Approves or rejects product versions.

---

## 📝 Key Features

- ✅ Role-based authentication (JWT)
- ✅ Product creation and listing
- ✅ Product versioning with effective start date
- ✅ Maker-checker approval flow
- ✅ Frontend support for all flows

---

## 🔐 Authentication

JWT tokens are stored in localStorage. The token contains role info.

---

## 📂 Directory Structure

```
backend/
  └── src/main/java/com/irm/...

frontend/
  └── src/components/
        ├── Product.js
        ├── ProductForm.js
        ├── Pending.js
        ├── Login.js
        ├── Register.js
```

---

## 🚀 How to Use

1. Register as maker/checker.
2. Login and access product dashboard.
3. Maker: Create product and add versions.
4. Checker: See pending list and approve/reject.

---

## 📧 Contact

For support, contact your admin or project team.


installl below for taildwind css to take effect:
=======================================================

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p