const axios = require("axios");

// in package.json
/*   "scripts": {
    "test": "npx jest"
  }, 

  npm run text
*/

const registerBody = {
  fullName: "moon Doe",
  userName: "fantaice",
  password: "fantaice",
  role: "admin",
}

const loginBody =  {
  userName: "fantaice",
  password: "fantaice",
}

const itemBody =  {
  itemsName: "fan",
  description: "Buy this fan",
  price: 8000,
  isInStock: true,
}

let token;
let itemId;

const Authorization =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2NTQwMzIwZjE1NWZiOTM2Yzg0Mjk5YTMiLCJ1c2VyTmFtZSI6ImhlbnJ5MTIzIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjk4NzUyNjM0fQ.ayHUpZDEKJkmBVLf1ZmNMqpuYDVbDUyPZ3CuhIai4Ok";

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
    console.log("Error:", error);
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
    console.log("Error:", error);
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
