# Todo App with Zustand

A modern, responsive todo application built with React and Zustand for state management. Features a clean UI with Tailwind CSS and seamless todo management functionality.

## 🚀 Features

- ✅ **Add Todos**: Create new todo items by typing and pressing Enter
- ✅ **Mark Complete**: Toggle completion status with checkboxes
- ✅ **Delete Items**: Remove individual todos with a single click
- ✅ **Live Statistics**: Real-time counts of total, completed, and pending items
- ✅ **Clear All**: Bulk delete all todos at once
- ✅ **Responsive Design**: Beautiful UI that works on all devices
- ✅ **State Persistence**: Uses Zustand for efficient state management

## 🛠️ Tech Stack

- **React 19.1.1** - UI library
- **Zustand 5.0.8** - Lightweight state management
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS & Autoprefixer** - CSS processing

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/chandramathi-m/zustand
   cd zustand-demo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app

## 🎯 Usage

1. **Adding Todos**: Type your task in the input field and press Enter
2. **Completing Tasks**: Click the checkbox next to any todo to mark it as complete
3. **Deleting Tasks**: Click the "✕" button to remove individual todos
4. **Viewing Stats**: See live counts of total, completed, and pending items
5. **Clearing All**: Use the "Clear All" button to remove all todos at once

## 📁 Project Structure

```
src/
├── App.js              # Main application component
├── index.js            # React app entry point
├── index.css           # Global styles and Tailwind imports
└── store/
    └── store.js        # Zustand store for state management

public/
├── index.html          # HTML template
└── ...

config/
├── tailwind.config.js  # Tailwind CSS configuration
├── postcss.config.js   # PostCSS configuration
└── package.json        # Project dependencies and scripts
```

## 🔧 Available Scripts

- `npm start` - Run the app in development mode

## 🎨 State Management

The application uses **Zustand** for state management, providing:

- **Simple API**: No boilerplate code required
- **TypeScript Ready**: Full TypeScript support
- **Lightweight**: Small bundle size
- **Devtools**: React DevTools integration

### Store Structure

```javascript
{
  inputValue: [],           // Array of todo objects
  setInputValue: (value)    // Function to update todos
}
```

### Todo Object Structure

```javascript
{
  value: "Task description", // The todo text
  completed: false          // Completion status
}
```

## 🌟 Key Features Implementation

- **Input Validation**: Prevents empty todos with `.trim()` validation
- **Optimized Updates**: Uses array mapping for efficient state updates
- **Clean UI**: Responsive design with hover effects and transitions
- **Error Handling**: Defensive programming with fallback values

## 🚀 Future Enhancements

- [ ] Todo categories/tags
- [ ] Due dates and reminders
- [ ] Drag and drop reordering
- [ ] Local storage persistence
- [ ] Search and filter functionality
- [ ] Export/import todos

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using React and Zustand