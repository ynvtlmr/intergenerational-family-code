"use client";

import React, { useState } from 'react';

export default function Component() {
  const [items, setItems] = useState([
    { id: 1, title: "Operating Businesses", description: "Details about operating businesses as an asset class." },
    { id: 2, title: "Financial Assets", description: "Insights on stocks, bonds, and other financial instruments." },
    // initial items
  ]);
  const [editItemId, setEditItemId] = useState(null);
  const [editFormData, setEditFormData] = useState({ title: '', description: '' });

  const addItem = () => {
    const newItem = {
      id: items.length + 1,
      title: `New Item ${items.length + 1}`,
      description: "Description for new item."
    };
    setItems([...items, newItem]);
  };

  const deleteItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const startEditItem = (item: { id: any; title: any; description: any; }) => {
    setEditItemId(item.id);
    setEditFormData({ title: item.title, description: item.description });
  };

  const handleEditFormChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const saveEditItem = () => {
    setItems(items.map(item => {
      if (item.id === editItemId) {
        return { ...item, ...editFormData };
      }
      return item;
    }));
    setEditItemId(null);
  };

  const cancelEdit = () => {
    setEditItemId(null);
  };

  return (
    <div className="bg-[#35424a] text-white p-8">
      <h1 className="text-4xl font-semibold mb-6">Building Your Wealth Forest</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(item => (
          <li key={item.id} className="p-4 bg-white text-gray-800 rounded shadow">
            {editItemId === item.id ? (
              <div>
                <input 
                  type="text" 
                  name="title" 
                  value={editFormData.title} 
                  onChange={handleEditFormChange}
                  className="p-2 rounded border"
                />
                <textarea 
                  name="description" 
                  value={editFormData.description} 
                  onChange={handleEditFormChange}
                  className="p-2 rounded border my-2"
                />
                <button onClick={saveEditItem} className="text-green-500 mx-2">Save</button>
                <button onClick={cancelEdit} className="text-yellow-500">Cancel</button>
              </div>
            ) : (
              <div>
                <div className="flex justify-between">
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <div>
                    <button onClick={() => startEditItem(item)} className="text-blue-500 mx-2">Edit</button>
                    <button onClick={() => deleteItem(item.id)} className="text-red-500">Delete</button>
                  </div>
                </div>
                <p className="mt-2">{item.description}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
      <button 
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={addItem}
      >
        Add Item
      </button>
    </div>
  );
}
