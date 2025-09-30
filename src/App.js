import { useState } from "react";
import { useStoreValue } from "./store/store";

const App = () => {
  const { setInputValue } = useStoreValue();
  const inputValue = useStoreValue((state) => state.inputValue) || [];
  const [userInput, setUserInput] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      setInputValue([...inputValue, { value: e.target.value.trim(), completed: false }]);
      setUserInput('');
    }
  }

  const toggleCompleted = (index) => {
    setInputValue(inputValue.map((item, i) => 
      i === index ? { ...item, completed: !item.completed } : item
    ));
  }

  const removeItem = (index) => setInputValue(inputValue.filter((_, i) => i !== index));

  const stats = [
    ['Total', inputValue.length],
    ['Completed', inputValue.filter(item => item.completed).length],
    ['Pending', inputValue.filter(item => !item.completed).length]
  ];

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Todo List</h1>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a new item and press Enter..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <div className="mt-4 space-y-2">
        {inputValue.map((item, index) => (
          <div key={index} className="flex items-center gap-5 justify-between">
            <input type="checkbox" checked={item.completed} onChange={() => toggleCompleted(index)} />
            <span className={`flex-1 ${item.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {item.value}
            </span>
            <button onClick={() => removeItem(index)} className="text-red-500 hover:text-red-700 p-1">✕</button>
          </div>
        ))}
        
        {inputValue.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No items yet. Add one above!</p>
        ) : (
          <div className="flex gap-5 mt-4 items-center text-sm text-gray-500">
            {stats.map(([label, count]) => (
              <span key={label}>{label}: {count}</span>
            ))}
            <button onClick={() => setInputValue([])} className="ml-auto bg-blue-500 text-white px-3 py-1 rounded text-sm">
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
