function handleFile() {
  const fileInput = document.getElementById('fileInput');
  const fileList = fileInput.files;
  
  if (fileList.length === 0) {
    alert('Please select a file.');
    return;
  }

  const file = fileList[0];
  const reader = new FileReader();

  reader.onload = function(event) {
    const contents = event.target.result;
    displayProducts(contents);
  };

  reader.readAsText(file);
}

function displayProducts(contents) {
  const productListDiv = document.getElementById('productList');
  productListDiv.innerHTML = ''; 

  const products = JSON.parse(contents);
  const table = document.createElement('table');

  const headerRow = table.insertRow();
  const nameHeader = headerRow.insertCell();
  nameHeader.innerHTML = 'Products Name';

  for (const product of products) {
    const row = table.insertRow();
    const cell = row.insertCell();
    
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = product.name;
    
    link.onclick = function() {
      showDetails(product);
      return false; 
    };

    cell.appendChild(link);
  }

  productListDiv.appendChild(table);
}

function showDetails(product) {
  const { name, image, description } = product;
  const operations = product.operations || {};
  const properties = product.properties || {};

  const productDetailsDiv = document.getElementById('productDetails');
  productDetailsDiv.innerHTML = `
    <h2>${name}</h2>
    <img src="${image}" alt="${name}" style="max-width: 200px;">
    <table>
      <tr>
        <th>Product ID:</th>
        <td>${product.id}</td>
      </tr>
      <tr>
        <th>Description:</th>
        <td>${description}</td>
      </tr>
      <tr>
        <th>Operations:</th>
        <td>${formatDetails(operations)}</td>
      </tr>
      <tr>
        <th>Properties:</th>
        <td>${formatDetails(properties)}</td>
      </tr>
    </table>
    <button onclick="clearDetails()">Back</button>
  `;
}

function formatDetails(details) {
  let html = '<ul>';
  for (const [key, value] of Object.entries(details)) {
    html += `<li><strong>${key}:</strong> ${value}</li>`;
  }
  html += '</ul>';
  return html;
}

function clearDetails() {
  const productDetailsDiv = document.getElementById('productDetails');
  productDetailsDiv.innerHTML = '';
}
