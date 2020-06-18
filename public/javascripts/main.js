// Define any objects required
let SpendCategory = function(pName, pBudgetTarget, pId){
    this.name = pName;
    this.BudgetTarget = pBudgetTarget;
    this.id = pId;
}

let SpendItem = function(pDate, pName, pCategory, pAmount, pId){
    this.date = pDate;
    this.name = pName;
    this.category = pCategory;
    this.amount = pAmount;
    this.id = pId;
}
// End object defintion

// Variables
let localCategoryArray = [];
let localItemArray = [];

// Now comes the code that must wait to run until the document is fully loaded
document.addEventListener("DOMContentLoaded", function (event) {

    // Do these things immediately
    // Load master data from the server (the locally-stored file)
    //fileManager.read();

    // End list of tasks to perform immediately

    // Add recurring functions here
    // Refresh the server-side data every 10 seconds
    window.setInterval(function(){
        // DEBUGGING
        //console.log("hello");

        // Save categories to their own file and save detailed-item list to their own file
        //fileManager.write();

    }, 10000);
    // End recurring functions
    
    // Event listeners
    // Create a new item | Updates the local array and tables
    document.getElementById("addItem").addEventListener("click", function () {
        // Get value(s)
        let itemDateValue = document.getElementById("itemDate").value;
        let itemDescValue = document.getElementById("itemDescription").value;
        let itemCategoryValue = document.getElementById("itemCategory").value;
        let itemAmount = document.getElementById("itemAmount").value;

        function uID() {
            return (((1 + Math.random()) * 0x10000)|0).toString(16).substring(1);
        }
        let guid = (uID() + uID() + "-" + uID() + "-4" + uID().substr(0,3) + "-" + uID() + "-" + uID() + uID() + uID()).toLowerCase();
        
        // Do nothing if any fields are blank
        if (itemDateValue != "" && itemDescValue.trim != "" && itemCategoryValue != "" && itemAmount != ""){
            // Create a new temp object
            let tempItem = new SpendItem(itemDateValue, itemDescValue, itemCategoryValue, itemAmount, guid);
            
            // Update the local array
            localItemArray.push(tempItem);

            // Update the table of logged expenses (completely refresh it)
            // Remove all child elements of the table and select button
            let itemNode = document.getElementById("addItemHere");
            while (itemNode.firstChild) {
                itemNode.removeChild(itemNode.lastChild);
            }
            let selectNode = document.getElementById("removeItemDesc");
            while (selectNode.firstChild) {
                selectNode.removeChild(selectNode.lastChild);
            }

            // Loop through local array and append them to the table
            let itemLength = localItemArray.length;
            for (let i = 0; i < itemLength; i++) {
                // Append list to the table
                let tempTr = document.createElement("tr");
                
                let tempDate = localItemArray[i].date;
                let tempThOne = document.createElement("th");
                tempThOne.innerHTML = tempDate;
                tempTr.appendChild(tempThOne);

                let tempDesc = localItemArray[i].name;
                let tempThTwo = document.createElement("th");
                tempThTwo.innerHTML = tempDesc;
                tempTr.appendChild(tempThTwo);

                let tempCategory = localItemArray[i].category;
                let tempThThree = document.createElement("th");
                tempThThree.innerHTML = tempCategory;
                tempTr.appendChild(tempThThree);

                let tempAmount = localItemArray[i].amount;
                let tempThFour = document.createElement("th");
                tempThFour.innerHTML = tempAmount;
                tempTr.appendChild(tempThFour);

                itemNode.appendChild(tempTr);

                // Append list to the select button
                let uniqueValue = tempDate + " - " + tempDesc + " - " + tempAmount;
                let currentItemGuid = tempGuid = localItemArray[i].id;

                let newOption = document.createElement("option");
                newOption.setAttribute("value", currentItemGuid);
                newOption.innerHTML = uniqueValue;
                selectNode.appendChild(newOption);
            }

            // Reset the form
            document.getElementById("form-2").reset();
        }
    });

    // Remove the list item and refresh the table
    document.getElementById("removeItem").addEventListener("click", function () {

    });

    // Create a new budget category | Update the local array and add element to required select lists
    document.getElementById("addCategory").addEventListener("click", function () {
        // Get value(s)
        let budgetNameValue = document.getElementById("budgetName").value;
        let budgetTargetValue = document.getElementById("budgetTarget").value;
        
        function uID() {
            return (((1 + Math.random()) * 0x10000)|0).toString(16).substring(1);
        }
        let guid = (uID() + uID() + "-" + uID() + "-4" + uID().substr(0,3) + "-" + uID() + "-" + uID() + uID() + uID()).toLowerCase();

        // Do nothing if either field is blank
        if (budgetNameValue.trim != "" && budgetTargetValue.trim != ""){
            // Create a new temp object
            let temp = new SpendCategory(budgetNameValue, budgetTargetValue, guid);

            // Update the local array
            localCategoryArray.push(temp);

            // Update the select list for removing a category (Completely refresh it)
            // Empty options
            let categoryList = document.getElementById("deleteCategory");
            while (categoryList.firstChild) {
                categoryList.removeChild(categoryList.lastChild);
            }
            let itemCatSelect = document.getElementById("itemCategory");
            while (itemCatSelect.firstChild) {
                itemCatSelect.removeChild(itemCatSelect.lastChild);
            }
            // Add options again
            let selectTotal = localCategoryArray.length;
            for (let i = 0; i < selectTotal; i++){

                let newCategory = document.createElement("option");
                newCategory.setAttribute("value", localCategoryArray[i].name);
                newCategory.innerHTML = localCategoryArray[i].name;
                categoryList.appendChild(newCategory);
                
                let newSelect = document.createElement("option");
                newSelect.setAttribute("value", localCategoryArray[i].name);
                newSelect.innerHTML = localCategoryArray[i].name;
                itemCatSelect.appendChild(newSelect);
            }

            // Reset the form
            document.getElementById("form-1").reset();
            document.getElementById("budgetName").focus();
        }
    });

    // Remove a budget category
    document.getElementById("removeCategory").addEventListener("click", function () {
        // Get value(s)
        let categorySelect = document.getElementById("deleteCategory").value;

        // Remove selected value from the select input
        removeElement(categorySelect);
        
        // Remove selected value from the local array if exists
        let arrayIndex = localCategoryArray.indexOf(categorySelect);
        if (arrayIndex > -1) {
            localCategoryArray.splice(arrayIndex, 1);
        }

        // Reset the form
        document.getElementById("form-3").reset();
    });
    // End event listeners

    // Functions on standby
    let removeElement = function (elmentId) {
        var element = document.getElementById(elmentId);
        element.parentNode.removeChild(element);
    }
    // End functions on standby
});