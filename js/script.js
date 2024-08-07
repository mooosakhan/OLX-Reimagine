
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc
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

// Create a collection and add multiple items
document.getElementById("submit").addEventListener("click", async () => {
  let productName = document.getElementById("pname").value;
  let productPrice = document.getElementById("pprice").value;
  let productImg = document.getElementById("pimg").value;
  let productDesc = document.getElementById("pdesc").value;

  console.log(productName, productPrice, productImg, productDesc);

  try {
    await addDoc(data, {
      productName: productName,
      productPrice: productPrice,
      productDesc: productDesc,
      imgurl: productImg,
    });
    alert("Product added successfully!");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});


document.getElementById('fetch').addEventListener("click", async () => {



  const querySnapshot = await getDocs(data);
  const ProductElement = document.getElementById('products-container')
  ProductElement.innerHTML = " "
  querySnapshot.forEach((doc) => {
    const product = doc.data();
    const card = document.createElement('div')
    card.classList.add("col-md-4");
    card.innerHTML = `<div class="card" style="width: 18rem;">
<img src="${product.imgurl}" class="card-img-top" alt="...">
<div class="card-body">
<h5 class="card-title">${product.productName}</h5>
<p class="card-text">${product.productDesc}</p>
<a href="#" class="btn btn-primary">Edit</a> <a href="#" class="btn btn-danger">Delete</a>
</div>
</div>`
 ProductElement.appendChild(card)

    console.log(doc.id, " => ", doc.data());

  });

});















// Fetch data from Firestore and display in cards
// document.getElementById("fetch").addEventListener("click", async () => {
// const querySnapshot = await getDocs(data);
//   const productsContainer = document.getElementById("products-container");
//   productsContainer.innerHTML = ""; // Clear previous data

//   querySnapshot.forEach((doc) => {
//     const product = doc.data();
//     const card = document.createElement("div");
//     card.classList.add("col-md-4");

//     card.innerHTML = `
//       <div class="card mb-4">
//         <img class="card-img-top" src="${product.imgurl}" alt="Product Image">
//         <div class="card-body">
//           <h5 class="card-title">${product.productName}</h5>
//           <p class="card-text">${product.productDesc}</p>
//           <p class="card-text"><strong>Price:</strong> ${product.productPrice}</p>
//         </div>
//       </div>
//     `;
//     productsContainer.appendChild(card);
//   });
// });

