import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const fetchItems = async () => {
    const res = await fetch("http://127.0.0.1:5000/items");
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async () => {
    await fetch("http://127.0.0.1:5000/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description })
    });
    setName("");
    setDescription("");
    fetchItems();
  };

  const deleteItem = async (id) => {
    await fetch(`http://127.0.0.1:5000/items/${id}`, {
      method: "DELETE"
    });
    fetchItems();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>StayChat Task</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={addItem}>Add / Update</button>

      <ul>
        {items.map(item => (
          <li key={item._id}>
            {item.name} - {item.description}
            <button onClick={() => deleteItem(item._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
