function savaBudgetToDatabase() {
    const incomeSelector = "#income-rows .input-row";
    const spendingSelector = "#spending-rows .input-row";
    const incomeData = Array.from(document.querySelectorAll(incomeSelector)).reduce((list, item) => {
       
        list.push({
            category: item.querySelector(".entry-category").value,
            amount: item.querySelector(".entry-amount").value,
            note: item.querySelector(".entry-note").value
        })
        return list;
    }, []);

    const spendingData = Array.from(document.querySelectorAll(spendingSelector)).reduce((list, item) => {
        list.push({
            category: item.querySelector(".entry-category").value,
            amount: item.querySelector(".entry-amount").value,
            note: item.querySelector(".entry-note").value
        })
        return list;
    }, []);

      requestJsonAJAX({
        date: document.querySelector("#entry-date").value,
        incomes: incomeData,
        spending: spendingData
      }, "POST", "../server/budget/create.php", (response) => {
        if (response.success) {
            showSuccess("Data submitted successfully!");
            window.location.href = "history.php";
        } else {
            showError(response.message);
        }
        
    }, () => {
        showSuccess("An error occurred. Please try again.");
    }, () => {
        showSuccess("An error occurred. Please try again.");
    });
}
