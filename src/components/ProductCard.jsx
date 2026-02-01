function ProductCard({ product }) {
  const outOfStock = product.availableStock === 0;

  return (
    <div
      style={{
        backgroundColor: "#fff",
        color: "#000",
        borderRadius: "12px",
        padding: "15px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          borderRadius: "8px",
          marginBottom: "10px",
        }}
      />

      <h3 style={{ margin: "5px 0" }}>{product.name}</h3>

      <p style={{ fontSize: "14px", color: "#666", margin: "0 0 6px" }}>
        Category: {product.category}
      </p>

      <strong style={{ fontSize: "18px" }}>
        Rs. {product.price}
      </strong>

      <p
        style={{
          marginTop: "6px",
          fontSize: "14px",
          color: outOfStock ? "red" : "green",
        }}
      >
        {outOfStock
          ? "Out of stock"
          : `Available: ${product.availableStock}`}
      </p>

      <div style={{ marginTop: "auto", display: "flex", gap: "10px" }}>
        <button style={{ flex: 1 }}>
          View
        </button>

        <button
          style={{
            flex: 1,
            backgroundColor: outOfStock ? "#ccc" : "#096B68",
            color: "#fff",
            cursor: outOfStock ? "not-allowed" : "pointer",
          }}
          disabled={outOfStock}
        >
          Buy
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
