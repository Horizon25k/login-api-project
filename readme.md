### How to use

### 1. เปิดเซิร์ฟเวอร์ API (เปิด Terminal ที่โฟลเดอร์หลัก)

```bash
npm start
```

### 2. รันเทสจากโฟลเดอร์หลัก (เปิด Terminal อีกหน้าหนึ่ง)

- **รัน Functional / API Tests (Karate):**

  ```bash
  npm run test:api
  ```

- **รัน Performance Tests (Gatling/Karate ในโฟลเดอร์ perf-test):**

  ```bash
  mvn gatling:test
  npm run test:perf
  ```

CREATE DATABASE IF NOT EXISTS login_project CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE login_project;

-- 1. ตารางเก็บข้อมูล User
CREATE TABLE IF NOT EXISTS users (
id INT AUTO_INCREMENT PRIMARY KEY,
email VARCHAR(255) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
password_hash VARCHAR(255) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
INDEX idx_email (email) -- ใส่ Index เพื่อให้ค้นหาได้เร็วระดับ O(1)
);

-- 2. ตารางเก็บ Token ที่ถูก Logout แล้ว (Blacklist)
CREATE TABLE IF NOT EXISTS revoked_tokens (
token VARCHAR(500) PRIMARY KEY,
revoked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
