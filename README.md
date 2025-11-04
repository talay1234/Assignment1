# Drone API Server (Assignment #1)

project API Server ที่สร้างขึ้นด้วย Node.js และ Express.js สำหรับ Assignment #1 โดย Server นี้ทำหน้าที่เป็น Proxy เพื่อเรียกใช้บริการจาก 2 Servers ภายนอก คือ Drone Config Server และ Drone Log Server.

## Features (Endpoints)

API Server นี้มี Endpoints ทั้งหมด 4 ส่วน:

### 1. `GET /configs/:droneId`

ดึงข้อมูล Config ของ Drone ตาม ID ที่ระบุ
* **Response Fields:** `drone_id`, `drone_name`, `light`, `country`, `weight`
* **ตัวอย่าง `curl`:**
    ```bash
    curl https://assignment1-ui1l.onrender.com/configs/66011456
    ```

### 2. `GET /status/:droneId`

ดึงข้อมูลสถานะ (Condition) ของ Drone ตาม ID ที่ระบุ
* **Response Fields:** `condition`
* **ตัวอย่าง `curl`:**
    ```bash
    curl https://assignment1-ui1l.onrender.com/status/66011456
    ```

### 3. `GET /logs/:droneId`

ดึงข้อมูล Log การบินของ Drone ตาม ID ที่ระบุ (เรียงใหม่สุดก่อน)
* **Response Fields:** `drone_id`, `drone_name`, `created`, `country`, `celsius`
* **ตัวอย่าง `curl` (Default 12 รายการ):**
    ```bash
    curl https://assignment1-ui1l.onrender.com/logs/66011456
* **ตัวอย่าง `curl` (Pagination):**
    ```bash
    curl https://assignment1-ui1l.onrender.com/logs/66011456?page=1&perPage=5
    ```

### 4. `POST /logs`

สร้าง Log record ใหม่
* **Request Body (JSON):** `drone_id`, `drone_name`, `country`, `celsius`
* **ตัวอย่าง `curl`:**
    ```bash
    curl -X POST [https://assignment1-ui1l.onrender.com/logs](https://assignment1-ui1l.onrender.com/logs) \
         -H "Content-Type: application/json" \
         -d '{"drone_id": 66011456, "drone_name": "MyDrone", "country": "TH", "celsius": 32.5}'
    ```

## Install and Run project

### 1. Clone Repository

```bash
git clone <your-github-repository-url>
cd drone1
```

### 2. Install Dependencies

```bash
npm install
```

### 3. สร้างไฟล์ .env

สร้างไฟล์ `.env` ที่ root ของ project และคัดลอกเนื้อหาด้านล่างไปวาง จากนั้นใส่ค่า URL และ Token ที่ถูกต้อง (ตามที่ได้รับใน Assignment)

```env
# พอร์ตสำหรับรัน Server (Default คือ 4000)
PORT=4000

# URL ของ Server ภายนอก
DRONE_CONFIG_URL=[https://script.google.com/macros/s/AKfycbzwclqJRodyVjzYyY-NTQDb9cWG6Hoc5vGAABVtr5-jPA_ET_2IasrAJK4aeo5XoONiaA/exec](https://script.google.com/macros/s/AKfycbzwclqJRodyVjzYyY-NTQDb9cWG6Hoc5vGAABVtr5-jPA_ET_2IasrAJK4aeo5XoONiaA/exec)
LOG_URL=[https://app-tracking.pockethost.io/api/collections/drone_logs/records](https://app-tracking.pockethost.io/api/collections/drone_logs/records)

# Token สำหรับ Drone Log Server
LOG_API_TOKEN=20250901efx
```

### 4. Run Server (Development)

```bash
npm start
```

Server จะเริ่มทำงานที่ `http://localhost:4000` (หรือพอร์ตที่คุณตั้งใน `.env`)