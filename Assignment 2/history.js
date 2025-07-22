document.addEventListener("DOMContentLoaded", function () {
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("entry-date").value = today;
  
    const incomeBtn = document.getElementById("add-income");
    const spendingBtn = document.getElementById("add-spending");
    const incomeContainer = document.getElementById("income-rows");
    const spendingContainer = document.getElementById("spending-rows");
    const submitBtn = document.getElementById("submit-btn");
    const historyBtn = document.getElementById("history-btn");
    const visualizeBtn = document.getElementById("visualize-btn");
    const errorBanner = document.getElementById("error-banner");
  
    let rowCounter = 0;
    let hasUnsavedData = false;
  
    incomeBtn.addEventListener("click", () => {
      createRow("income");
      hasUnsavedData = true;
    });
  
    spendingBtn.addEventListener("click", () => {
      createRow("spending");
      hasUnsavedData = true;
    });
  
    submitBtn.addEventListener("click", () => {
      clearError();
      if (incomeContainer.children.length === 0 && spendingContainer.children.length === 0) {
        showError("You haven't added new data yet.");
        return;
      }
  
      collectDataAndStore();
      hasUnsavedData = false;
      incomeContainer.innerHTML = "";
      spendingContainer.innerHTML = "";
      updateTotals();
      alert("Data submitted successfully.");
    });
  
    historyBtn.addEventListener("click", () => {
      if (hasUnsavedData) {
        showError("There is unsaved data. Please submit before continuing.");
        return;
      }
      window.location.href = "history.html";
    });
  
    visualizeBtn.addEventListener("click", () => {
      if (hasUnsavedData) {
        showError("There is unsaved data. Please submit before continuing.");
        return;
      }
      window.location.href = "dashboard.html";
    });
  
    function createRow(type) {
      const container = type === "income" ? incomeContainer : spendingContainer;
      const row = document.createElement("div");
      row.className = "entry-row";
      row.dataset.type = type;
  
      row.innerHTML = `
        <input type="text" placeholder="Description" class="desc-input" />
        <input type="number" placeholder="Amount" class="amount-input" />
        <button class="remove-btn">Remove</button>
      `;
  
      row.querySelector(".remove-btn").addEventListener("click", () => {
        container.removeChild(row);
        updateTotals();
      });
  
      container.appendChild(row);
      updateTotals();
    }
  
    function updateTotals() {
      const totalIncome = [...incomeContainer.querySelectorAll(".amount-input")]
        .map(input => parseFloat(input.value) || 0)
        .reduce((sum, val) => sum + val, 0);
  
      const totalSpending = [...spendingContainer.querySelectorAll(".amount-input")]
        .map(input => parseFloat(input.value) || 0)
        .reduce((sum, val) => sum + val, 0);
  
      document.getElementById("total-income").textContent = totalIncome.toFixed(2);
      document.getElementById("total-spending").textContent = totalSpending.toFixed(2);
  
      const netAsset = totalIncome - totalSpending;
      const assetDisplay = document.getElementById("asset-display");
      assetDisplay.textContent = `$${netAsset.toFixed(2)}`;
      assetDisplay.className = "asset " + (netAsset < 0 ? "asset-negative" : netAsset > 0 ? "asset-positive" : "asset-zero");
    }
  
    function collectDataAndStore() {
      const date = document.getElementById("entry-date").value;
      const incomeData = [...incomeContainer.children].map(row => ({
        type: "income",
        description: row.querySelector(".desc-input").value,
        amount: parseFloat(row.querySelector(".amount-input").value) || 0
      }));
      const spendingData = [...spendingContainer.children].map(row => ({
        type: "spending",
        description: row.querySelector(".desc-input").value,
        amount: parseFloat(row.querySelector(".amount-input").value) || 0
      }));
  
      const allData = [...incomeData, ...spendingData];
      const key = `record-${date}`;
      localStorage.setItem(key, JSON.stringify(allData));
    }
  
    function showError(message) {
      errorBanner.textContent = message;
      errorBanner.style.display = "block";
    }
  
    function clearError() {
      errorBanner.style.display = "none";
      errorBanner.textContent = "";
    }
  });