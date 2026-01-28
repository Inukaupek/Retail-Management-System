function ProductCard({ product }) {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        color: "#000",
        borderRadius: "10px",
        padding: "15px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
      }}
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          borderRadius: "8px"
        }}
      />

      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <strong>Rs. {product.price}</strong>

      <div style={{ marginTop: "12px" }}>
        <button style={{ marginRight: "10px" }}>
          View
        </button>
        <button>
          Buy
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
