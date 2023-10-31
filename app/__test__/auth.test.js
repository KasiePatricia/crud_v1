const axios = require("axios");

// in package.json
/*   "scripts": {
    "test": "npx jest"
  }, 

  npm run text
*/

const Authorization =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2NTQwMzIwZjE1NWZiOTM2Yzg0Mjk5YTMiLCJ1c2VyTmFtZSI6ImhlbnJ5MTIzIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjk4NzUyNjM0fQ.ayHUpZDEKJkmBVLf1ZmNMqpuYDVbDUyPZ3CuhIai4Ok";

// register
test("Test to see if the registration works well", async () => {
  try {
    const response = await axios.post("http://localhost:4000/auth/register", {
      fullName: "moon Doe",
      userName: "jayzeme",
      password: "jayzeme",
      role: "admin",
    });

    expect(response.status).toBe(201);
    expect(response.data.success).toBe(true);
  } catch (error) {
    console.log("Error:", error);
  }
});

// login
test("Test to login a user/admin", async () => {
  try {
    const response = await axios.post("http://localhost:4000/auth/login", {
      userName: "jayzeme",
      password: "jayzeme",
    });

    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
  } catch (error) {
    console.log("Error:", error);
  }
});

// Add a item
test("Add a item", async () => {
  try {
    const response = await axios.post(
      "http://localhost:4000/shop/add-item",
      {
        itemsName: "Yam",
        description: "Buy this yam",
        price: 800,
        isInStock: true,
      },
      {
        headers: {
          Authorization,
          "Content-Type": "application/json",
        },
      }
    );

    expect(response.status).toBe(201);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe("Shop item created successfully");
  } catch (error) {}
});

// Get all items
test(" Get all items", async () => {
  try {
    const response = await axios.get("http://localhost:4000/shop/items", {
      headers: {
        Authorization,
      },
    });

    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
  } catch (error) {}
});

// Delete an item
test(" Delete an items", async () => {
  try {
    const response = await axios.delete(
      "http://localhost:4000/shop/item/6540ebcada7da8aaf25355ab",

      {
        headers: {
          Authorization,
        },
      }
    );

    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
  } catch (error) {}
});
