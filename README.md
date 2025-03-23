## **Playwright Tests for Burga**

### **Project Description**  
This repository contains automated tests for the [Burga](https://eu.burga.com/) website using **Playwright**. The tests cover various functionalities, including:  
- Search functionality, validation  
- Navigation and footer links verification  
- Social media redirects  
- UI element visibility and interactions  

### **Technologies Used**  
- **Playwright** (for browser automation)  
- **JavaScript/TypeScript**  
- **GitHub Actions** (for CI/CD integration)  

---

## **Getting Started**  

### Relevant information. Testing on the site is limited, so most of the tests were done using vpn and different IP addresses due to the security on the site. Therefore, not all tests may load.

### **1. Clone the Repository**  
```sh
git clone https://github.com/Kr2Ka1/Playwright_tests_Burga.git
cd Playwright_tests_Burga
```

### **2. Install Dependencies**  
Ensure you have **Node.js (22.x)** installed, then run:  
```sh
npm install
```

### **3. Install Playwright Browsers**  
Before running tests, install the required browsers:  
```sh
npx playwright install
```

### **4. Run Tests**  
To execute all tests:  
```sh
npx playwright test
```

Run a specific test file:  
```sh
npx playwright test tests/example.spec.js
```

Run tests in headed mode (to see browser interactions):  
```sh
npx playwright test --headed
```

Run tests in debug mode:  
```sh
npx playwright test --debug
```

### **5. Generate and View Test Reports**  
Run tests and generate an HTML report:  
```sh
npx playwright test --reporter=html
```
View the report:  
```sh
npx playwright show-report
```

---

## **Continuous Integration (CI) with GitHub Actions**  
This repository includes a **GitHub Actions** workflow for running tests automatically on push and pull requests.  




