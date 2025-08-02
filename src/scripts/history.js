    const historyBody = document.getElementById("historyBody");
    const searchInput = document.getElementById("searchInput");
    let deletedItems = [];

    function loadHistory() {
      const params = new URLSearchParams(window.location.search);
      const keyword = params.get('keyword') || ""; 
      const filter = params.get('filter') || "ALL"; 
       
      document.getElementById("searchInput").value = keyword;
      document.getElementById("filter").value = filter;

      requestAJAX(null, "GET", `../server/budget/read.php${window.location.search}`, (response) => {
        if (response.success) {
           renderTable(response.message);
        }
        
    });
     
    }

    function renderTable(data) {
      historyBody.innerHTML = "";
      data.forEach((entry, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td contenteditable="true" name="date">${entry.addedTime ? entry.addedTime.split(" ")[0] : ""}</td>
          <td contenteditable="true" name="type">${entry.transactionType}</td>
          <td name="category">${entry.category}</td>
          <td contenteditable="true" name="amount">${parseFloat(entry.amount).toFixed(2)}</td>
          <td contenteditable="true" name="note">${entry.notes}</td>
          <td>
            <button class="button small-button edit" onclick="editEntry(${entry.transactionId})">Edit</button>
            <button class="button small-button danger" onclick="showRecallButton(${entry.transactionId})">Delete</button>
          </td>
        `;
        row.classList.add("editable-row");
        row.id=`transaction-${entry.transactionId}`
      
        historyBody.appendChild(row);
      });
    }

    function editEntry(transactionId) {
      const editItemParent = document.querySelector(`#transaction-${transactionId}`);

      const date = editItemParent.querySelector('td[name="date"]').innerHTML;
      if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
          alert("Date format is valid (YYYY-MM-DD).");
          return;
      }

      const amount = editItemParent.querySelector('td[name="amount"]').innerHTML;
      if (amount && !/^-?\d+(\.\d+)?$/.test(amount)) {
          alert("Invalid amount. Please enter a numeric value.");
          return;
      }

      const transactionType = editItemParent.querySelector('td[name="type"]').innerHTML;
      if (!['SPENDING', 'INCOME'].includes(transactionType)) {
          alert("Invalid type. Please enter 'SPENDING'or 'INCOME'");
          return;
      }

      const data = {
            category: editItemParent.querySelector('td[name="category"]').innerHTML || "",     
            note: editItemParent.querySelector('td[name="note"]').innerHTML, 
            transactionType,
            amount,
            transactionId,
            date
    }

    requestJsonAJAX(data, "UPDATE" , `../server/budget/update.php`, (response) => {
          if (response.success) {
            alert("Success");
            loadHistory();
          }
        });
    }

     function deleteItem(transactionId) {
      requestJsonAJAX({transactionId}, "DELETE" , `../server/budget/delete.php`, (response) => {
        if (response.success) {
           loadHistory();
           alert("Success");
           document.getElementById("recallButton")?.remove();
        }
        
      });
  
    }

    function showRecallButton(transactionId) {
      if (!document.getElementById("recallButton")) {
        const btn = document.createElement("button");
        btn.id = "recallButton";
        btn.className = "button small-button recall";
        btn.innerText = "Confirm Delete";
        btn.onclick =  () => deleteItem(transactionId);
        document.querySelector(".container").appendChild(btn);
      }
    }



    loadHistory();