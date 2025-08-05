
// Name: Jihee Seo
// Assignment 2

// File Name: dashboard.js
// Date: 2025-08-05
// Description: dashboard javascript to render charts

const incomeCategories = ["Job", "Stock", "Fund", "Interest", "Gift", "Rental", "Bonus", "Other"];

const spendingCategories = ["Transport", "Food", "Clothes", "Entertainment", "Medical", "Education", "Rent", "Subscription", "Utilities", "Other"];

const baseColors = [
    "rgb(255, 99, 132)", // red-pink
    "rgb(54, 162, 235)", // blue
    "rgb(255, 205, 86)", // yellow
    "rgb(75, 192, 192)", // teal
    "rgb(153, 102, 255)", // purple
    "rgb(255, 159, 64)", // orange

    // New additions
    "rgb(201, 203, 207)", // light gray
    "rgb(255, 99, 71)", // tomato
    "rgb(60, 179, 113)", // medium sea green
    "rgb(106, 90, 205)", // slate blue
    "rgb(244, 164, 96)", // sandy brown
];


function sumAmount(groupedByCategory) {
    const sums = {};
    for (const category in groupedByCategory) {
        const sum = groupedByCategory[category].reduce((acc, val) => acc + Number(val.amount || 0 ), 0);
        sums[category] = sum;
    }
    return sums;
}

function drawPieChart(chartType, selector, title, labes, sums) {
    const data = {
        labels: labes,
        datasets: [
            {
                label: title,
                data: Object.values(sums),
                baseColors: baseColors,
                hoverOffset: 4,
            }
        ],
        options: {
                responsive: true,
                
         }
    };

    new Chart(document.getElementById(selector), {
        type: chartType,
        data
    });
}

function loadHistory() {
    const params = new URLSearchParams(window.location.search);
    const start = params.get("start") || "";
    const end = params.get("end") || "";

    document.getElementById("start").value = start;
    document.getElementById("end").value = end;

    requestAJAX(null, "GET", `../server/budget/read.php${window.location.search}`, (response) => {
        if (response.success) {
            const chartData = response.message.reduce(
                (acc, item) => {
                    if (item.transactionType === "INCOME") {
                        acc.incomes.push(item);
                    } else {
                        acc.spendigs.push(item);
                    }
                    return acc;
                },
                {
                    incomes: [],
                    spendigs: [],
                }
            );

            const groupedIncomesByCategory = chartData.incomes.reduce(
                (acc, item) => {
                    const cat = item.category;
                    acc[cat].push(item);
                    return acc;
                },
                incomeCategories.reduce((acc, item) => {
                    acc[item] = [];
                    return acc;
                }, {})
            );

            const groupedSpendingByCategory = chartData.spendigs.reduce(
                (acc, item) => {
                    const cat = item.category;
                    acc[cat].push(item);
                    return acc;
                },
                spendingCategories.reduce((acc, item) => {
                    acc[item] = [];
                    return acc;
                }, {})
            );

            

            const incomeAmountSum = sumAmount(groupedIncomesByCategory);
            const spendingAmountSum = sumAmount(groupedSpendingByCategory);
            drawPieChart("pie", "incomePieChart", "Income Pie Chart", incomeCategories, incomeAmountSum);
            drawPieChart("pie", "spendingPieChart", "Spending Pie Chart", spendingCategories, spendingAmountSum);
            drawPieChart("bar", "incomeBarChart", "Income Bar Chart", incomeCategories, incomeAmountSum);
            drawPieChart("bar", "spendingBarChart", "Spending Bar Chart", spendingCategories, spendingAmountSum);
        }
    });
}



loadHistory();
