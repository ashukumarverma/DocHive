# DOCHIVE : Real-Time Collaborative Tool  

A powerful real-time collaborative editing application, built using the **MERN stack**. This tool allows multiple users to edit documents concurrently while ensuring secure and efficient data management.  

---

## 🚀 Features  

- **Real-Time Collaboration**: Multiple users can edit the same document simultaneously. 
- **User Authentication**: Secure login.
-  **Rich Text Editor**: Format text.    

---

## 🛠️ Tech Stack - MERN 
- **MongoDB**, **Express.js**, **React.js**, **Node.js**, **Socket.io**, **Bootstrap**, **JWT**  

---

## 🖥️ Setup  

### Prerequisites  
Make sure the following are installed on your system:  
- [Node.js](https://nodejs.org/)  
- [Git](https://git-scm.com/)  

---

### Installation  

1. **Clone the repository using any of the following method**
   - web clone
     ```bash
     git clone https://github.com/ashukumarverma/DocHive.git
     ```
   - SSH clone
     ```bash  
     git clone git@github.com:ashukumarverma/DocHive.git
     ```
   - Github CLI
     ```bash
     git clone gh repo clone ashukumarverma/DocHive
     ```
2. **Navigate to Project Directory**
   ```bash
   cd DocHive
   ```
3. **Install dependencies in both frontend and backend directory**
   - for frontend
   ```bash
   cd frontend
   npm install
   ```
   - similarly for backend
   ```bash
   cd backend
   npm install
   ```
4. **Set Environment Variable**
   - In Backend
      - in frontend folder create a .env.development file and write these variables
      - MONGO_URI = mongodb+srv://username:password@clusterName.-----.mongodb.net/?retryWrites=true&w=majority&appName=ClusterName (you can get it from MongoDB webpage or in app if locally installed)
      - JWT_SECRET = Your_Secret
      - PORT = 5000 (as per your choice)
      - FRONTEND_URL=http://localhost:5173 (this is frontend url)

   - In Frontend 
      - in frontend folder create a .env.development file and write these variables
      - VITE_BASE_URL=http://localhost:5000  (this is backend server url)
      - VITE_TINYMCE_API_KEY=your_api_KEY

5. **Run the Application**
   - for backend
   ```bash
   npm run server
   ```
    - for frontend
   ```bash
   npm run dev
   ```