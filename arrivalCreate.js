let addNewRow = function (table, rowCount) {
  let tableRowContent = `<th colspan='1'>SKU ID</th><td colspan='2'><input required type='number' id='arrival-sku-id${rowCount - 2}' name='arrival_sku_id${rowCount - 2}' value='' style='width: 15ch;'></td><th colspan='1'>QTY</th><td colspan='2'><input required type='number' id='arrival-qty${rowCount - 2}' name='arrival_qty${rowCount - 2}' value='' style='width: 10ch;'></td><td colspan='2'><button id='clone${rowCount - 2}' class ='cloneBtn' type='button'>Clone</button><button id='delete${rowCount - 2}' class ='deleteBtn' type='button'>Delete</button><button id="add${rowCount - 2}" type='button' class="addBtn">Add</button><button id='split${rowCount - 2}' class ='splitBtn' type='button'>Split</button></td>`;
  let newRow = table.insertRow(rowCount - 1);
  newRow.innerHTML = tableRowContent;
  newRow.id = `arrival-line${rowCount - 2}`;
  newRow.className = 'tableRow';
}

let renameChildProps = function (parentNodes, renameVal) {
  parentNodes.forEach((child) => {
    switch (child.className) {
      case 'arrival-sku-id':
        child.id = `arrival-sku-id${renameVal}`;
        child.name = child.id;
        break;
      case 'arrival-qty':
        child.id = `arrival-qty${renameVal}`;
        child.name = child.id;
        break;
      case 'cloneBtn':
        child.id = `clone${renameVal}`;
        break;
      case 'deleteBtn':
        child.id = `delete${renameVal}`;
        break;
      case 'addBtn':
        child.id = `add${renameVal}`;
        break;
    }
  });
}

let cloneRow = function (clone, rowCount) {
  clone.id = `arrival-line${rowCount - 2}`;
  let cloneArray = Array.from(clone.childNodes);
  cloneArray.forEach((index) => {
    let indexChildren = index.childNodes;
    renameChildProps(indexChildren, (rowCount - 2));
  });

  document.getElementById('tableBody').appendChild(clone);
}

//Event delegation method:
//Scales better, more optimize, keeps logic centralized.
document.addEventListener('click', function (event) {
  // if(event.target.tagName === 'BUTTON' && event.target.id !== 'submit'); (FIX LATER)
  const cloneBtn = event.target.closest('.cloneBtn');
  const deleteBtn = event.target.closest('.deleteBtn');
  const addBtn = event.target.closest('.addBtn');
  const splitBtn = event.target.closest('.splitBtn');
  const table = document.getElementById('arrival-create-table');
  const tableRow = event.target.closest('.tableRow');
  const tableBody = document.getElementById('tableBody');
  const clone = tableRow.cloneNode(true);
  let rowCount = table.rows.length;

  //Add row functionality
  if (addBtn) {
    addNewRow(table, rowCount);
  }

  //Delete row functionality
  if (deleteBtn) {
    let counter = 0;
    tableRow.remove();
    let tbodyArray = Array.from(tableBody.childNodes); //This is a list of all table rows
    tbodyArray.forEach((child) => { //This loops through all table rows
      if (child.className === 'tableRow') {
        let gcNodes = child.childNodes; //gc = grand child ggc = great grand child
        gcNodes.forEach((gChild) => { //This loops through all th and td's
          let ggcNodes = gChild.childNodes;
          renameChildProps(ggcNodes, counter);
        });
        counter++;
      }  
    });
  }

  //Clone/Split row functionality
  if (cloneBtn || splitBtn) {
    cloneRow(clone, rowCount);

    //Split row additional functionality
    if (splitBtn) {
      let newRowInput = document.getElementById(`arrival-qty${rowCount - 2}`);
      let originalInputValue = tableRow.children[3].children[0].value;
      let splitCount = 2;
      let remainder = newRowInput.value % splitCount;
      let newRowInputValue = Math.floor(newRowInput.value / splitCount) + remainder;
      let newOriginalInputValue = Math.floor(originalInputValue / splitCount);
      newRowInput.value = newRowInputValue;
      tableRow.children[3].children[0].value = newOriginalInputValue;
    }
  }
  rowCount = table.rows.length;
});

//Additional Notes:
//ID situation: IDs to row elements, have to be unique, so they can't replicate eachother when made.
//Name is not a universal property on the base element/HTML element.
//Big Tip: Work inside to out, getting Unnessesary data involves more trouble (more prone to errors/bugs).
// ONLY GET WHAT YOU NEED, and revolve your code around it.
//When solving problems/giving tasks, always assume to use dynamic programming.
//     Unless you know it will only be a one time reference. (Example: Table for HTML PAGE)
//WHen naming variables, name them to what you are trying to do/trying to get.
//     If you don't, you will easily lose yourself when reviewing the code in the future.
//ShortCut for changing variables for all locations (Control + F)(IMPORTANT)
//ShortCut to select all content (Control + A)
//ShortCut to Redo all changes made (Control + Y)
//When getting tables or rows of some sort, we use "Count" inside variable name.
//If there are multiple if's connected together, consider Switch/Case Method.
//Its ok to trade off a few extra lines for better Readability.
//New: When calling a function, you can also send in a variable WITH math calculation, since at the end of day,
//      its still a number being sent. EXAMPLE: renameChildProps(indexChildren, (rowCount - 2))   <-- Still a number.
//      Parser doesn't care, because it's still a number.

// 1. Parser brings back the first error, you don't know if there are more errors, so you can't
// 		Just assume there is just one error.
// 2. Script literally will break as long as there is a single error.
// 3. Submitting is not the same as refreshing the page. (more info later)
// 		a. Need to tell the broswer the data, if not, it will result in doing the default settings
// 			 And those settings are different between browsers.
//       Values refresh on chrome, but not on firefox (IMPORTANT).

//Tactic: I need to align my thinking with the documentation.
//        If my solutions are wrong based on my thinking, it's on me.
//        Also, if my solutions fail, then check debugger properties to see where i can find solution.
