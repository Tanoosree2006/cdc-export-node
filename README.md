# 🚀 Production-Ready Incremental Export System (CDC)

## 📌 Overview

This project implements a **Change Data Capture (CDC) based export system** that supports:

* Full data export
* Incremental (delta-based) export
* Change tracking using watermarks
* Asynchronous export jobs
* CSV file generation

The system is designed to handle **large datasets efficiently (100K+ records)** and avoid redundant exports using **timestamp-based watermarking**.

---

## 🧱 Tech Stack

* **Backend:** Node.js (Express)
* **Database:** PostgreSQL
* **ORM:** Sequelize
* **Containerization:** Docker & Docker Compose
* **Testing:** Jest
* **Logging:** JSON structured logs

---

## 🏗️ Architecture

```
Client → REST API → Export Service → Database (PostgreSQL)
                                   ↓
                              CSV Files (output/)
```

### Key Concepts

* **Watermarking:** Tracks last exported timestamp per consumer
* **CDC Pattern:** Uses `updated_at` column to detect changes
* **Soft Deletes:** `is_deleted` flag instead of hard delete
* **Async Processing:** Export runs in background

---

## 📁 Project Structure

```
cdc-export-node/
│
├── src/
│   ├── app.js
│   ├── config/db.js
│   ├── models/
│   ├── routes/
│   ├── services/
│
├── seeds/
│   └── init.sql
│
├── tests/
├── output/
├── docker-compose.yml
├── Dockerfile
├── package.json
├── .env.example
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```
git clone <your-repo-url>
cd cdc-export-node
```

---

### 2️⃣ Run with Docker (Single Command)

```
docker-compose up --build
```

✅ This will:

* Start PostgreSQL
* Seed 100,000+ users
* Start backend server

---

### 3️⃣ Access API

```
http://localhost:8080
```

---

## 🧠 Database Schema

### Users Table

| Column     | Type      |
| ---------- | --------- |
| id         | BIGSERIAL |
| name       | VARCHAR   |
| email      | UNIQUE    |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |
| is_deleted | BOOLEAN   |

✅ Indexed column:

```
updated_at
```

---

### Watermarks Table

| Column           | Type      |
| ---------------- | --------- |
| consumer_id      | UNIQUE    |
| last_exported_at | TIMESTAMP |
| updated_at       | TIMESTAMP |

---

## 🌱 Data Seeding

* 100,000+ records generated
* Distributed timestamps (last 30 days)
* 1% soft-deleted records
* Idempotent script

---

## 🔌 API Endpoints

---

### ✅ Health Check

```
GET /health
```

Response:

```json
{
  "status": "ok",
  "timestamp": "ISO_DATE"
}
```

---

### 📦 Full Export

```
POST /exports/full
Headers:
X-Consumer-ID: consumer-1
```

* Exports all non-deleted users
* Updates watermark

---

### 🔄 Incremental Export

```
POST /exports/incremental
```

* Exports only updated records
* Uses watermark

---

### 🔁 Delta Export

```
POST /exports/delta
```

Adds `operation` column:

| Operation | Meaning      |
| --------- | ------------ |
| INSERT    | New record   |
| UPDATE    | Modified     |
| DELETE    | Soft deleted |

---

### 📍 Get Watermark

```
GET /exports/watermark
```

Response:

```json
{
  "consumerId": "consumer-1",
  "lastExportedAt": "ISO_DATE"
}
```

---

## 📂 Output Files

All exports are saved in:

```
/output/
```

Example:

```
full_consumer-1_1712345678.csv
incremental_consumer-1_1712345678.csv
delta_consumer-1_1712345678.csv
```

---

## ⚡ Export Logic

### Full Export

* Fetch all non-deleted users
* Write CSV
* Update watermark

### Incremental Export

* Fetch records where:

```
updated_at > last_exported_at
```

### Delta Export

Adds operation:

```
DELETE → is_deleted = true
INSERT → created_at == updated_at
UPDATE → otherwise
```

---

## 🔐 Transaction Safety

* Export + watermark update wrapped in DB transaction
* If export fails → watermark NOT updated

---

## 📊 Logging

Structured logs:

```json
{
  "event": "start",
  "jobId": "...",
  "consumer": "...",
  "type": "full"
}
```

```json
{
  "event": "completed",
  "rows": 100000,
  "duration": 1500
}
```

---

## 🧪 Testing

Run tests:

```
npm test
```

Generate coverage:

```
npm test -- --coverage
```

✅ Minimum 70% coverage achieved

---

## 🧪 Manual Testing Flow

1. Full export
2. Update DB rows
3. Run incremental
4. Run delta
5. Verify CSV
6. Check watermark

---

## 📈 Performance Considerations

* Indexed `updated_at`
* Async processing
* Efficient filtering
* Scalable design

---

## 🚀 Future Improvements

* Queue system (RabbitMQ)
* File storage (S3)
* Pagination for large exports
* Worker-based architecture

---

## ✅ Submission Checklist

✔ Dockerized setup
✔ One-command startup
✔ 100K dataset
✔ Full / Incremental / Delta exports
✔ Watermark tracking
✔ CSV output
✔ Logging
✔ Tests (70%+)
✔ README

---

## 👨‍💻 Author

**Tanoo Sree**
Backend & Data Engineering Enthusiast 🚀

---
