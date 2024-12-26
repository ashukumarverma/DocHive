# DOCHIVE : Real-Time Collaborative Tool  

A powerful real-time collaborative editing application, built using the **MERN stack**. This tool allows multiple users to edit documents concurrently while ensuring secure and efficient data management.  

---

## 🚀 Features  

- **Real-Time Collaboration**: Multiple users can edit the same document simultaneously.  
- **Rich Text Editor**: Format text.  
- **User Authentication**: Secure login.   

---

## 🛠️ Tech Stack  

### Frontend:  
- **React.js** with **Bootstrap** for UI.  
### Backend:  
- **Express.js**, **MongoDB**, **JWT**  

---

## 🖥️ Setup  

### Prerequisites  
Make sure the following are installed on your system:  
- [Node.js](https://nodejs.org/)  
- [Git](https://git-scm.com/)  

---

### Installation  

1. **Clone the repository**
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
   for frontend
   ```bash
   cd frontend
   npm install
   ```
   similarly for backend
   ```bash
   cd backend
   npm install
   ```
4. **Set Environment Variable**
   - In Backend
      - MONGO_URI = mongodb+srv://username:password@clusterName.-----.mongodb.net/?retryWrites=true&w=majority&appName=ClusterName (you can get it from MongoDB webpage or in app if locally installed)
      - JWT_SECRET = Your_Secret
      - PORT = 5000 (as per your choice)
5. **Run the Application**
   in frontend
   ```bash
   npm run dev
   ```
   in backend
   ```bash
   npm run start
   ```