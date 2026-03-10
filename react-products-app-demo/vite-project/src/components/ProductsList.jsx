import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const gotoProduct = (product) => {
    navigate("/product", { state: { product } });
  };

  const handleSearch = () => {
    setQuery(search);
  };

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Unable to fetch products data");
        const productsData = await res.json();
        setProducts(productsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  if (loading) return <p className="text-center text-2xl text-blue-500">Loading...</p>;
  if (error) return <p className="text-center text-2xl text-red-500">{error}</p>;

  return (
    <div className="px-6">

      <div className="flex gap-2 mt-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="border border-gray-300 rounded-xl px-4 py-2 w-full outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No products found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10 text-center">
  {filteredProducts.map((productObj) => (
    <div
      key={productObj.id}
      onClick={() => gotoProduct(productObj)}
      className="shadow shadow-neutral-600 rounded-2xl p-2 cursor-pointer hover:scale-105 transition-transform"
    >
      <img
        src={productObj.image}
        alt=""
        className="object-contain h-44 block mx-auto"
      />
      <p>{productObj.title}</p>
    </div>
  ))}
</div>

      
    </div>
  );
}

export default ProductsList;