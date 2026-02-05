import { useEffect, useRef, useState } from "react";
import ProductTable from "./components/ProductTable";
import { fetchProducts } from "./services/productApi";

const LIMIT = 10;

export default function App() {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef(null);
  const loaderRef = useRef(null);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (!loaderRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          if (products.length < total) {
            loadProducts();
          }
        }
      },
      { threshold: 1 },
    );

    observerRef.current.observe(loaderRef.current);

    return () => observerRef.current.disconnect();
  }, [products, loading, total]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts(LIMIT, skip);

      setProducts((prev) => [...prev, ...data.products]);
      setSkip((prev) => prev + LIMIT);
      setTotal(data.total);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = (id, newTitle) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, title: newTitle } : p)),
    );
  };

  return (
    <div className="app-container">
      <h2>Products</h2>

      <ProductTable products={products} onTitleChange={handleTitleChange} />

      <div ref={loaderRef} className="loader" />

      {loading && <p className="status">Loading more...</p>}
      {products.length >= total && (
        <p className="status">No more products available </p>
      )}
    </div>
  );
}
