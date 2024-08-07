import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBBrrvd7TyEr6UOFwBDxoXEMkfYdRpv70c",
  authDomain: "olx-2-49bfa.firebaseapp.com",
  projectId: "olx-2-49bfa",
  storageBucket: "olx-2-49bfa.appspot.com",
  messagingSenderId: "375246816859",
  appId: "1:375246816859:web:124fd2ccad917aa8b9617e",
  measurementId: "G-CJ0DG552X5",
};
const app = initializeApp(firebaseConfig);

// Get a reference to the Firestore database
const db = getFirestore(app);

const data = collection(db, "Products");

let editProductId = null;

// Function to add or update product to Firestore
document.getElementById("submit").addEventListener("click", async () => {
  let productName = document.getElementById("pname").value;
  let productPrice = document.getElementById("pprice").value;
  let productImg = document.getElementById("pimg").value;
  let productDesc = document.getElementById("pdesc").value;

  console.log(productName, productPrice, productImg, productDesc);

  try {
    if (editProductId) {
      const productDoc = doc(db, "Products", editProductId);
      await updateDoc(productDoc, {
        productName: productName,
        productPrice: productPrice,
        productDesc: productDesc,
        imgurl: productImg,
      });
      editProductId = null; // Reset after updating
      alert("Product updated successfully!");
    } else {
      await addDoc(data, {
        productName: productName,
        productPrice: productPrice,
        productDesc: productDesc,
        imgurl: productImg,
      });
      alert("Product added successfully!");
    }
    fetchProducts();
  } catch (e) {
    console.error("Error adding/updating document: ", e);
  }
});

// Function to fetch data from Firestore and display in cards
async function fetchProducts() {
  const querySnapshot = await getDocs(data);
  const productsContainer = document.getElementById('products-container');
  productsContainer.innerHTML = ""; // Clear previous data

  querySnapshot.forEach((doc) => {
    const product = doc.data();
    const card = document.createElement('div');
    card.classList.add("col-md-4");
    let imageUrl = !(product.imgurl) ?
      "https://imgs.search.brave.com/QrrF8yctvnxGKn5UBvuEt1XL7Pv04zXmzQ0y50RN5cY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA3LzkxLzIyLzU5/LzM2MF9GXzc5MTIy/NTkyN19jYVJQUEg5/OUQ2RDFpRm9ua0NS/bUNHemtKUGYzNlFE/dy5qcGc" :
      product.imgurl;

    card.innerHTML = `
      <div class="card mb-4">
          <img class="card-img-top" src="${imageUrl}" alt="Sorry, image is not available due to some reasons">
          <div class="card-body">
              <h5 class="card-title">${product.productName}</h5>
              <p class="card-text">${product.productDesc}</p>
              <p class="card-text"><strong>Price:</strong> ${product.productPrice}</p>
              <button onclick="editProduct('${doc.id}', '${product.productName}', '${product.productPrice}', '${product.imgurl}', '${product.productDesc}')" type="button" class="btn btn-primary">Edit</button>
              <button type="button" class="btn btn-danger">Delete</button>
          </div>
      </div>
    `;

    productsContainer.appendChild(card);
  });
}

// Function to edit a product
function editProduct(id, name, price, img, desc) {
  editProductId = id;
  document.getElementById("pname").value = name;
  document.getElementById("pprice").value = price;
  document.getElementById("pimg").value = img;
  document.getElementById("pdesc").value = desc;
}

document.getElementById('fetch').addEventListener("click", fetchProducts);

// Initial fetch of products
fetchProducts();
