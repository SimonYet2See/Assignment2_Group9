document.addEventListener("DOMContentLoaded", function () {
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("current-date").textContent = today;
  
    const incomeBtn = document.getElementById("add-income");
    const spendingBtn = document.getElementById("add-spending");
    const entriesContainer = document.getElementById("entries-container");
    const submitBtn = document.getElementById("submit-btn");
  
    let totalIncome = 0;
    let totalSpending = 0;
  
    function updateSummary() {
      document.getElementById("total-income").textContent = totalIncome.toFixed(2);
      document.getElementById("total-spending").textContent = totalSpending.toFixed(2);
      const asset = totalIncome - totalSpending;
      const assetText = document.getElementById("net-asset");
      assetText.textContent = asset.toFixed(2);
  
      if (asset > 0) {
        assetText.style.color = "green";
      } else if (asset < 0) {
        assetText.style.color = "red";
      } else {
        assetText.style.color = "darkgray";
      }
    }
  
    function createRow(type) {
      const row = document.createElement("div");
      row.classList.add("entry-row");
  
      const categorySelect = document.createElement("select");
      categorySelect.name = "category";
      categorySelect.innerHTML = (type === "income")
        ? `
          <option>Job</option>
          <option>Stock</option>
          <option>Fund</option>
          <option>Interest</option>
          <option>Side Hustle</option>
          <option>Gift</option>
          <option>Other</option>`
        : `
          <option>Transport</option>
          <option>Food</option>
          <option>Clothing</option>
          <option>Entertainment</option>
          <option>Medical</option>
          <option>Housing</option>
          <option>Utilities</option>
          <option>Education</option>
          <option>Gift</option>
          <option>Other</option>`;
  
      const amountInput = document.createElement("input");
      amountInput.type = "number";
      amountInput.placeholder = "Amount";
      amountInput.classList.add("amount-input");
  
      const noteInput = document.createElement("input");
      noteInput.type = "text";
      noteInput.placeholder = "Notes";
      noteInput.classList.add("note-input");
  
      const okBtn = document.createElement("button");
      okBtn.textContent = "OK";
      okBtn.classList.add("ok-btn");
  
      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.classList.add("delete-btn");
  
      okBtn.addEventListener("click", function () {
        const amount = parseFloat(amountInput.value);
        if (isNaN(amount) || amount <= 0) {
          alert("Please enter a valid amount.");
          return;
        }
  
        // Update totals
        if (type === "income") {
          totalIncome += amount;
        } else {
          totalSpending += amount;
        }
        updateSummary();
  
        // Lock row
        categorySelect.disabled = true;
        amountInput.disabled = true;
        noteInput.disabled = true;
        okBtn.disabled = true;
      });
  
      delBtn.addEventListener("click", function () {
        // If row was confirmed before deletion, subtract amount
        if (okBtn.disabled) {
          const amount = parseFloat(amountInput.value);
          if (type === "income") {
            totalIncome -= amount;
          } else {
            totalSpending -= amount;
          }
          updateSummary();
        }
        row.remove();
      });
  
      row.appendChild(categorySelect);
      row.appendChild(amountInput);
      row.appendChild(noteInput);
      row.appendChild(okBtn);
      row.appendChild(delBtn);
  
      entriesContainer.appendChild(row);
    }
  
    incomeBtn.addEventListener("click", function () {
      createRow("income");
    });
  
    spendingBtn.addEventListener("click", function () {
      createRow("spending");
    });
  
    submitBtn.addEventListener("click", function () {
      // In the future, this is where you'd send the data to MySQL
      alert("Data submitted!");
      entriesContainer.innerHTML = "";
      totalIncome = 0;
      totalSpending = 0;
      updateSummary();
    });
  
    updateSummary();
  });