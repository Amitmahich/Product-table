import { useState } from "react";
import "../styles/ProductTable.css";

export default function ProductTable({ products, onTitleChange }) {
  const [editingId, setEditingId] = useState(null);
  const [tempTitle, setTempTitle] = useState("");

  const startEdit = (product) => {
    setEditingId(product.id);
    setTempTitle(product.title);
  };

  const saveEdit = (id) => {
    onTitleChange(id, tempTitle);
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="table-wrapper">
      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Title</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Price</th>
            <th>Rating</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="title-cell">
                {editingId === p.id ? (
                  <>
                    <input
                      value={tempTitle}
                      onChange={(e) => setTempTitle(e.target.value)}
                    />
                    <button onClick={() => saveEdit(p.id)}>✅</button>
                    <button onClick={cancelEdit}>❌</button>
                  </>
                ) : (
                  <span className="title-wrapper">
                    {p.title}
                    <button className="edit-btn" onClick={() => startEdit(p)}>
                      ✏️
                    </button>
                  </span>
                )}
              </td>

              <td style={{ color: p.brand ? "black" : "#c02222" }}>
                {p.brand ?? "N/A"}
              </td>
              <td>{p.category}</td>
              <td>${p.price}</td>
              <td>{p.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
