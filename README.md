# Drone API Server (Assignment #1)

[cite_start]project API Server ที่สร้างขึ้นด้วย Node.js และ Express.js สำหรับ Assignment #1 [cite: 1, 2] [cite_start]โดย Server นี้ทำหน้าที่เป็น Proxy เพื่อเรียกใช้บริการจาก 2 Servers ภายนอก คือ Drone Config Server [cite: 11] [cite_start]และ Drone Log Server[cite: 16].

## Features (Endpoints)

API Server นี้มี Endpoints ทั้งหมด 3 ส่วนหลัก:

1.  **`GET /configs/:droneId`**
    * [cite_start]ดึงข้อมูล Config ของ Drone ตาม ID ที่ระบุ 
    * [cite_start]**Response Fields:** `drone_id`, `drone_name`, `light`, `country`, `weight` 

2.  **`GET /status/:droneId`**
    * [cite_start]ดึงข้อมูลสถานะ (Condition) ของ Drone ตาม ID ที่ระบุ 
    * [cite_start]**Response Fields:** `condition` 

3.  **`GET /logs/:droneId`**
    * [cite_start]ดึงข้อมูล Log การบินของ Drone ตาม ID ที่ระบุ 
    * **Features:**
        * [cite_start]เรียงลำดับจาก **"created"** (เวลาสร้าง) ล่าสุดก่อน 
        * [cite_start]จำกัด 12 รายการ หากไม่ระบุ pagination 
        * [cite_start]รองรับ Pagination (คะแนนพิเศษ)  ผ่าน Query-params: `?page=...` และ `?perPage=...`
    * [cite_start]**Response Fields:** `drone_id`, `drone_name`, `created`, `country`, `celsius` 

4.  **`POST /logs`**
    * [cite_start]สร้าง Log record ใหม่ใน Drone Log Server [cite: 74]
    * [cite_start]**Request Body (JSON):** ต้องมี `drone_id`, `drone_name`, `country`, `celsius` 

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

[cite_start]สร้างไฟล์ `.env` [cite: 6] [cite_start]ที่ root ของ project และคัดลอกเนื้อหาด้านล่างไปวาง จากนั้นใส่ค่า URL และ Token ที่ถูกต้อง [cite: 7, 8] (ตามที่ได้รับใน Assignment)

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