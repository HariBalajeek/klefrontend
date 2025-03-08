import axios from "axios";
import "./ProductList.css";

const ProductList = () => {
  const products = [
    { id: "1", name: "Product A", price: 100 },
    { id: "2", name: "Product B", price: 150 },
    { id: "3", name: "Product C", price: 200 },
    { id: "4", name: "Product D", price: 250 },
    { id: "5", name: "Product E", price: 300 },
    { id: "6", name: "Product F", price: 350 },
    { id: "7", name: "Product G", price: 400 },
    { id: "8", name: "Product H", price: 450 },
    { id: "9", name: "Product I", price: 500 },
    { id: "10", name: "Product J", price: 550 },
  ];
  

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not authenticated!");
      return;
    }
  
    if (!product.id) {
      console.error("Error: Product ID is missing");
      alert("Product ID is missing!");
      return;
    }
  
    try {
      await axios.post(
        "http://localhost:5000/cart/add",
        {
          productId: product.id, // ✅ Ensure this is sent
          name: product.name,
          price: product.price,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Added to cart!");
    } catch (error) {
      console.error(error);
      alert("Failed to add to cart!");
    }
  };
  
  
  return (
    <div className="product-list">
      <h2>Products</h2>
      {products.map((p) => (
        <div key={p.id} className="product-item">
          <p>
            {p.name} - ${p.price}
          </p>
          <button className="add-to-cart-btn" onClick={() => handleAddToCart(p)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
