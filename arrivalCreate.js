let addNewRow = function (table, rowCount) {
  let tableRowContent = `<th colspan='1'>SKU ID</th><td colspan='2'><input required type='number' id='arrival-sku-id${rowCount - 2}' name='arrival_sku_id${rowCount - 2}' value='' style='width: 15ch;'></td><th colspan='1'>QTY</th><td colspan='2'><input required type='number' id='arrival-qty${rowCount - 2}' name='arrival_qty${rowCount - 2}' value='' style='width: 10ch;'></td><td colspan='2'><button id='clone${rowCount - 2}' class ='cloneBtn' type='button'>Clone</button><button id='delete${rowCount - 2}' class ='deleteBtn' type='button'>Delete</button><button id="add${rowCount - 2}" type='button' class="addBtn">Add</button><button id='split${rowCount - 2}' class ='splitBtn' type='button'>Split</button></td>`;
  let newRow = table.insertRow(rowCount - 1);
  newRow.innerHTML = tableRowContent;
  newRow.id = `arrival-line${rowCount - 2}`;
  newRow.className = "tableRow";
};

let renameChildProps = function (parentNodes, renameVal) {
  parentNodes.forEach((child) => {
    switch (child.className) {
      case "arrival-sku-id":
        child.id = `arrival-sku-id${renameVal}`;
        child.name = child.id;
        break;
      case "arrival-qty":
        child.id = `arrival-qty${renameVal}`;
        child.name = child.id;
        break;
      case "cloneBtn":
        child.id = `clone${renameVal}`;
        break;
      case "deleteBtn":
        child.id = `delete${renameVal}`;
        break;
      case "addBtn":
        child.id = `add${renameVal}`;
        break;
    }
  });
};

let cloneRow = function (clone, rowCount) {
  clone.id = `arrival-line${rowCount - 2}`;
  let cloneArray = Array.from(clone.childNodes);
  cloneArray.forEach((index) => {
    let indexChildren = index.childNodes;
    renameChildProps(indexChildren, rowCount - 2);
  });

  document.getElementById("tableBody").appendChild(clone);
};

document.addEventListener("click", function (event) {
  const cloneBtn = event.target.closest(".cloneBtn");
  const deleteBtn = event.target.closest(".deleteBtn");
  const addBtn = event.target.closest(".addBtn");
  const splitBtn = event.target.closest(".splitBtn");
  const table = document.getElementById("arrival-create-table");
  const tableRow = event.target.closest(".tableRow");
  const tableBody = document.getElementById("tableBody");
  const clone = tableRow.cloneNode(true);
  let rowCount = table.rows.length;

  if (addBtn) {
    addNewRow(table, rowCount);
  }

  if (deleteBtn) {
    let counter = 0;
    tableRow.remove();
    let tbodyArray = Array.from(tableBody.childNodes);
    tbodyArray.forEach((child) => {
      if (child.className === "tableRow") {
        let gcNodes = child.childNodes;
        gcNodes.forEach((gChild) => {
          let ggcNodes = gChild.childNodes;
          renameChildProps(ggcNodes, counter);
        });
        counter++;
      }
    });
  }

  if (cloneBtn || splitBtn) {
    cloneRow(clone, rowCount);

    if (splitBtn) {
      let newRowInput = document.getElementById(`arrival-qty${rowCount - 2}`);
      let originalInputValue = tableRow.children[3].children[0].value;
      let splitCount = 2;
      let remainder = newRowInput.value % splitCount;
      let newRowInputValue =
        Math.floor(newRowInput.value / splitCount) + remainder;
      let newOriginalInputValue = Math.floor(originalInputValue / splitCount);
      newRowInput.value = newRowInputValue;
      tableRow.children[3].children[0].value = newOriginalInputValue;
    }
  }
  rowCount = table.rows.length;
});
