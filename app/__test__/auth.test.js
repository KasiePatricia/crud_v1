const axios = require("axios");

// in package.json
/*   "scripts": {
    "test": "npx jest"
  }, 

  npm run text
*/

// register
test("Test to see if the registration works well", async () => {
  try {
    const response = await axios.post("http://localhost:4000/auth/register", {
      fullName: "moon Doe",
      userName: "momome",
      password: "momome",
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
      userName: "momome",
      password: "momome",
    });

    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
  } catch (error) {
    console.log("Error:", error);
  }
});

// Add a item
test("Add a item", async () => {
  const Authorization =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2NTQwMzIwZjE1NWZiOTM2Yzg0Mjk5YTMiLCJ1c2VyTmFtZSI6ImhlbnJ5MTIzIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjk4NzA1OTU2fQ.0o3Cl_WpFzT8fLFVEZDfWawdMDyA7W1oNkDu7AfHpPk";

  try {
    const response = await axios.post(
      "http://localhost:4000/shop/add-item",
      {
        itemsName: "jet",
        description: "Buy this jet",
        price: 100,
        isInStock: true,
      },
      {
        Authorization,
      }
    );

    expect(response.status).toBe(201);
    expect(response.data.success).toBe(true);
  } catch (error) {}
});

// Get all items
test(" Get all items", async () => {
  const Authorization =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2NTQwMzIwZjE1NWZiOTM2Yzg0Mjk5YTMiLCJ1c2VyTmFtZSI6ImhlbnJ5MTIzIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjk4NzA1OTU2fQ.0o3Cl_WpFzT8fLFVEZDfWawdMDyA7W1oNkDu7AfHpPk";

  try {
    const response = await axios.get("http://localhost:4000/shop/items", {
      Authorization,
    });

    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
  } catch (error) {}
});

// Delete an item
test(" Get all items", async () => {
  const Authorization =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2NTQwMzIwZjE1NWZiOTM2Yzg0Mjk5YTMiLCJ1c2VyTmFtZSI6ImhlbnJ5MTIzIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjk4NzA1OTU2fQ.0o3Cl_WpFzT8fLFVEZDfWawdMDyA7W1oNkDu7AfHpPk";

  try {
    const response = await axios.delete(
      "http://localhost:4000/shop/item/653ee15f0b63f045b4387b44",
      {
        Authorization,
      }
    );

    expect(response.status).toBe(200);
    expect(response.data.success).toBe(true);
  } catch (error) {}
});
