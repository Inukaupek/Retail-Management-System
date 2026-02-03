import { fetchAuthSession } from "aws-amplify/auth";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// --------------------------------------------------
// 🔐 Get Authorization Header (Cognito JWT)
// --------------------------------------------------
const authHeaders = async () => {
  const session = await fetchAuthSession();
  const token = session.tokens?.idToken?.toString();

  if (!token) {
    throw new Error("No auth token found");
  }

  return {
    Authorization: token,
    "Content-Type": "application/json"
  };
};

// --------------------------------------------------
// 🛍️ PRODUCTS (PUBLIC)
// --------------------------------------------------
export const getProducts = async () => {
  const res = await fetch(`https://sxw967m5i6.execute-api.eu-north-1.amazonaws.com/dev/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};



export const addToCart = async (productId, qty = 1) => {
  const headers = await authHeaders();

  const res = await fetch(`https://sxw967m5i6.execute-api.eu-north-1.amazonaws.com/dev/cart/add`, {
    method: "POST",
    headers,
    body: JSON.stringify({ productId, qty })
  });

  if (!res.ok) throw new Error("Failed to add to cart");
  return res.json();
};

export const updateCartItem = async (productId, qty) => {
  const headers = await authHeaders();

  const res = await fetch(`https://sxw967m5i6.execute-api.eu-north-1.amazonaws.com/dev/cart/update`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ productId, qty })
  });

  if (!res.ok) throw new Error("Failed to update cart");
  return res.json();
};

export const removeCartItem = async (productId) => {
  const headers = await authHeaders();

  const res = await fetch(`https://sxw967m5i6.execute-api.eu-north-1.amazonaws.com/dev/cart/remove`, {
    method: "DELETE",
    headers,
    body: JSON.stringify({ productId })
  });

  if (!res.ok) throw new Error("Failed to remove item");
  return res.json();
};

// --------------------------------------------------
// 📦 ORDERS
// --------------------------------------------------
export async function getCart() {
  const res = await fetch(`https://sxw967m5i6.execute-api.eu-north-1.amazonaws.com/dev/cart/view`, {
    headers: await authHeaders()
  });
  return res.json();
}

export async function getAddresses() {
  const res = await fetch(`https://sxw967m5i6.execute-api.eu-north-1.amazonaws.com/dev/addresses`, {
    headers: await authHeaders()
  });
  return res.json();
}

export async function addAddress(data) {
  const res = await fetch(`https://sxw967m5i6.execute-api.eu-north-1.amazonaws.com/dev/addresses`, {
    method: "POST",
    headers: await authHeaders(),
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function placeOrder(addressId) {
  const res = await fetch(`https://sxw967m5i6.execute-api.eu-north-1.amazonaws.com/dev/orders/place`, {
    method: "POST",
    headers: await authHeaders(),
    body: JSON.stringify({ addressId })
  });
  return res.json();
}


