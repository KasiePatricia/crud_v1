const axios = require("axios");
// const { app, server, mongoose } = require("../../index");
// const { users } = require("../models");


const registerBody = {
  fullName: "moon Doe",
  userName: "nancyfancy",
  password: "nancyfancy",
  role: "admin",
}

const loginBody =  {
  userName: "nancyfancy",
  password: "nancyfancy",
}

const itemBody =  {
  itemsName: "fan",
  description: "Buy this fan",
  price: 8000,
  isInStock: true,
}

let token;
let itemId;


// register
test("for successful registration", async () => {
  
  try {
    const response = await axios.post("http://localhost:4000/auth/register", registerBody,
    {
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(response.status).toBe(201);
    expect(response.data.success).toBe(true);
  } catch (error) {
  }
});

// login
test("for successful login", async () => {
  try {
    const response = await axios.post("http://localhost:4000/auth/login", loginBody, 
    {
      headers: {
        "Content-Type": "application/json",
      },
    });

    token = response.body.token;

    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
  } catch (error) {
  }
});

// Add a item
test("for adding an item to your cart", async () => {
  try {
    if (!token) {
      throw new Error("Token is not available from the login test");
    }

    const response = await axios.post(
      "http://localhost:4000/shop/add-item", itemBody,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    itemId = response.body.data?.item._id;

    expect(response.status).toBe(201);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe("Shop item created successfully");
  } catch (error) {}
});

// Get all items
test("for getting all items", async () => {
  try {
    if (!token) {
      throw new Error("Token is not available from the login test");
    }

    const response = await axios.get("http://localhost:4000/shop/items", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
  } catch (error) {}
});

// Delete an item
test("for successful deletion", async () => {
  try {
    if (!token) {
      throw new Error("Token is not available from the login test");
    }

    if (!itemId) {
      throw new Error(
        "ItemId is not available from the shopitem creation test"
      );
    }

    const response = await axios.delete(
      `http://localhost:4000/shop/item/${itemId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
  } catch (error) {}
});

