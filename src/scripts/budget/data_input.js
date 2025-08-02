
let successBanner;
 let errorBanner;
 
 function showError(msg) {
    errorBanner.textContent = msg;
    errorBanner.style.color = "red";
    errorBanner.style.display = "block";
    setTimeout(() => {
      errorBanner.style.display = "none";
    }, 4000);
  }

  function showSuccess(msg) {
    successBanner.textContent = msg;
    successBanner.style.display = "block";
    setTimeout(() => {
      successBanner.style.display = "none";
    }, 4000);
  }

document.addEventListener("DOMContentLoaded", function () {
  // Cache elements
  // Use ISO string format to set date input value properly
  const today = new Date().toISOString().split("T")[0];
  const dateInput = document.getElementById("entry-date");
  dateInput.value = today;

  // Track if user manually changed the date
  let dateManuallyChanged = false;
  dateInput.addEventListener("change", () => {
    dateManuallyChanged = true;
  });

  const incomeBtn = document.getElementById("add-income");
  const spendingBtn = document.getElementById("add-spending");
  const incomeContainer = document.getElementById("income-rows");
  const spendingContainer = document.getElementById("spending-rows");
  const submitBtn = document.getElementById("submit-btn");
  errorBanner = document.getElementById("error-banner");

  // Step 1: Create success banner element dynamically and insert it just after error banner
  successBanner = document.createElement("div");
  successBanner.id = "success-banner";
  successBanner.style.display = "none";
  successBanner.style.color = "green";
  successBanner.style.textAlign = "center";
  successBanner.style.marginTop = "10px";
  successBanner.style.fontWeight = "bold";
  errorBanner.parentNode.insertBefore(successBanner, errorBanner.nextSibling);

  let hasUnsavedData = false;

 

  function updateTotalsLive() {
    const _sum = (rows) =>
      Array.from(rows).reduce((acc, r) => {
        const v = parseFloat(r.querySelector(".entry-amount").value);
        return acc + (isNaN(v) ? 0 : v);
      }, 0);

    const ti = _sum(incomeContainer.children);
    const ts = _sum(spendingContainer.children);
    document.getElementById("total-income").textContent = ti.toFixed(2);
    document.getElementById("total-spending").textContent = ts.toFixed(2);
    const net = ti - ts;
    const asset = document.getElementById("asset-display");
    asset.textContent = "$" + net.toFixed(2);
    asset.className = "asset " + (net > 0 ? "asset-positive" : net < 0 ? "asset-negative" : "asset-zero");
  }

  function updateSubmitAvailability() {
    submitBtn.disabled = (incomeContainer.children.length === 0 && spendingContainer.children.length === 0);
  }

  function validateInputs() {
    let ok = true;
    Array.from(document.querySelectorAll(".input-row")).forEach((row) => {
      const cat = row.querySelector(".entry-category");
      const amt = row.querySelector(".entry-amount");
      cat.classList.remove("error-border");
      amt.classList.remove("error-border");
      if (!cat.value || !amt.value || parseFloat(amt.value) <= 0) {
        cat.classList.add("error-border");
        amt.classList.add("error-border");
        ok = false;
      }
    });
    return ok;
  }

  function createRow(type) {
    hasUnsavedData = true;
    const container = type === "income" ? incomeContainer : spendingContainer;
    const row = document.createElement("div");
    row.className = "input-row";
    const cat = document.createElement("select");
    cat.className = "entry-category";
    cat.innerHTML = `<option value="">Select Category</option>`;

    const categories = {
      income: ["Job", "Stock", "Fund", "Interest", "Gift", "Rental", "Bonus", "Other"],
      spending: ["Transport", "Food", "Clothes", "Entertainment", "Medical", "Education", "Rent", "Subscription", "Utilities", "Other"]
    }[type];

    categories.forEach(c => {
      const o = document.createElement("option");
      o.value = c; o.textContent = c;
      cat.append(o);
    });

    const amt = document.createElement("input");
    amt.type = "number";
    amt.min = 0.01;
    amt.step = 0.01;
    amt.placeholder = "Amount";
    amt.className = "entry-amount";
    amt.addEventListener("input", () => {
      hasUnsavedData = true;
      updateTotalsLive();
    });

    const note = document.createElement("input");
    note.type = "text";
    note.placeholder = "Note";
    note.className = "entry-note";
    note.addEventListener("input", () => {
      hasUnsavedData = true;
    });

    const del = document.createElement("button");
    del.className = "delete-btn";
    del.textContent = "Delete";
    del.addEventListener("click", () => {
      row.remove();
      hasUnsavedData = true;
      updateTotalsLive();
      updateSubmitAvailability();
    });

    [cat, amt, note, del].forEach(el => row.appendChild(el));
    container.appendChild(row);
    updateSubmitAvailability();
  }

  function collectDataAndStore() {
    const entries = ["income", "spending"].flatMap(type =>
      Array.from(document.getElementById(type + "-rows").children)
        .map(r => ({
          category: r.querySelector(".entry-category").value,
          amount: parseFloat(r.querySelector(".entry-amount").value),
          note: r.querySelector(".entry-note").value.trim(),
          type
        }))
    );

    const totalIncome = entries.filter(e => e.type === "income").reduce((a, b) => a + b.amount, 0);
    const totalSpending = entries.filter(e => e.type === "spending").reduce((a, b) => a + b.amount, 0);
    const net = totalIncome - totalSpending;
    const history = JSON.parse(localStorage.getItem("visualBudgetHistory") || "[]");

    history.push({
      date: dateInput.value,
      user: "John Doe",
      entries, totalIncome, totalSpending, net
    });

    localStorage.setItem("visualBudgetHistory", JSON.stringify(history));
  }

  incomeBtn.addEventListener("click", () => createRow("income"));
  spendingBtn.addEventListener("click", () => createRow("spending"));

  submitBtn.addEventListener("click", () => {
    if (!dateInput.value) {
      showError("Please select the date.");
      return;
    }
    if (incomeContainer.children.length === 0 && spendingContainer.children.length === 0) {
      showError("You haven't added any record yet.");
      return;
    }
    if (!validateInputs()) {
      showError("Please fill in all categories and valid amounts.");
      return;
    }
    collectDataAndStore();
    hasUnsavedData = false;
    dateManuallyChanged = false;  // Reset manual change flag on submit

    savaBudgetToDatabase();

    incomeContainer.innerHTML = "";
    spendingContainer.innerHTML = "";
    updateTotalsLive();
    updateSubmitAvailability();
  });

  // Helper function to determine if there is real unsaved data
  function hasRealUnsavedData() {
    // Return true if there is unsaved data (input rows added/modified) or user changed date manually
    return hasUnsavedData || dateManuallyChanged;
  }

  document.getElementById("history-btn").addEventListener("click", (e) => {
    if (hasRealUnsavedData()) {
      e.preventDefault();
      showError("There is unsaved data. Please submit first.");
    } else {
      window.location.href = "history.php";
    }
  });

  document.getElementById("visualize-btn").addEventListener("click", (e) => {
    if (hasRealUnsavedData()) {
      e.preventDefault();
      showError("There is unsaved data. Please submit first.");
    } else {
      window.location.href = "dashboard.php";
    }
  });

  updateTotalsLive();
  updateSubmitAvailability();
});