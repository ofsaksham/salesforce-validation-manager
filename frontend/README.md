# Salesforce Validation Manager

A Salesforce administration tool built using React.js, Node.js, Express.js, JSForce, Salesforce Tooling API, and Salesforce Metadata API.

This application allows Salesforce administrators to manage Validation Rules directly from a custom web interface.

---

## Features

✅ Salesforce OAuth 2.0 Authentication

✅ Fetch Validation Rules using Salesforce Tooling API

✅ View Active/Inactive Validation Rule Status

✅ Enable or Disable Individual Validation Rules

✅ Enable or Disable All Validation Rules

✅ Deploy Changes to Salesforce using Metadata API

✅ Verify Updates Directly in Salesforce Setup

✅ Responsive and Modern User Interface

---

## Tech Stack

### Frontend

* React.js
* Axios
* CSS3

### Backend

* Node.js
* Express.js
* JSForce

### Salesforce APIs

* OAuth 2.0
* Tooling API
* Metadata API

---

## Project Structure

```text
salesforce-validation-manager
│
├── backend
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── screenshots
│
├── task-video.mp4
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/ofsaksham/salesforce-validation-manager.git
```

```bash
cd salesforce-validation-manager
```

---

## Backend Setup

Navigate to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
CLIENT_ID=YOUR_CLIENT_ID
CLIENT_SECRET=YOUR_CLIENT_SECRET
REDIRECT_URI=http://localhost:5000/callback
LOGIN_URL=https://login.salesforce.com
PORT=5000
```

Start backend server:

```bash
node server.js
```

---

## Frontend Setup

Navigate to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start React application:

```bash
npm start
```

Frontend will run at:

```text
http://localhost:3000
```

Backend will run at:

```text
http://localhost:5000
```

---

## Application Screenshots

### Login Success Page

![Login Page](./screenshots/login_page.png)

---

### Home Page

![Home Page](./screenshots/Home_page.png)

---

### Validation Rules Loaded

![Rules Loaded](./screenshots/rules-loaded.png)

---

### Validation Rules Enabled

![Enabled Rules](./screenshots/Enabled-page.png)

---

### Validation Rules Disabled

![Disabled Rules](./screenshots/Disabled-page.png)

---

### Salesforce Validation Rules (Enabled)

![Salesforce Enabled](./screenshots/salesforce-enabled-rule.png)

---

### Salesforce Validation Rules (Disabled)

![Salesforce Disabled](./screenshots/Salesforce-disabled-rule.png)

---

## Demo Video

Project demonstration video:

[▶ Watch Task Video](./task-video.mp4)

---

## Workflow

1. Login using Salesforce OAuth.
2. Fetch Validation Rules from Salesforce.
3. Enable/Disable Rules.
4. Deploy Changes.
5. Salesforce Metadata API updates Validation Rules.
6. Verify updates in Salesforce Setup.

---

## Author

**Saksham Kaushik**

GitHub: https://github.com/ofsaksham

---

## License

This project is developed for educational and internship assessment purposes.
