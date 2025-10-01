import { useStoreValue } from "./store/store";

const Counter = () => {
  const { count, setCount } = useStoreValue();
  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Counter</h1>
      <p className="text-4xl font-bold text-gray-800 mb-4">{count}</p>
      <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm" onClick={() => setCount(count)}>Increment</button>
    </div>
  )
}

export default Counter;
