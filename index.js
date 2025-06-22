let inputBtn = document.getElementById("input-btn");
let myLeads = [];
const inputEl = document.getElementById("input-el");
const descEl = document.getElementById("desc-el");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const saveBtn = document.getElementById("tab-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

saveBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const url = tabs[0].url.trim();
    const description =
      prompt("Enter a short description for this tab (Optional):")?.trim() ||
      "";

    if (!url) {
      alert("Tab URL is empty. Cannot save.");
      return;
    }

    if (myLeads.some((lead) => lead.url === url)) {
      alert("This URL is already saved.");
      return;
    }

    myLeads.push({ url, description });
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

inputBtn.addEventListener("click", function () {
  const url = inputEl.value.trim();
  const description = descEl.value.trim();

  if (!url) {
    alert("Please enter a URL.");
    return;
  }

  if (myLeads.some((lead) => lead.url === url)) {
    alert("This URL is already saved.");
    return;
  }

  myLeads.push({ url, description });
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);

  inputEl.value = "";
  descEl.value = "";
});

deleteBtn.addEventListener("click", function () {
  if (confirm("Are you sure you want to delete all saved leads?")) {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
  }
});

function render(leads) {
  let listItems = "";
  leads.forEach((lead) => {
    listItems += `
        <li>
            <a target='_blank' href='${lead.url}'>${lead.url}</a>
            ${lead.description ? `<br/><small>${lead.description}</small>` : ""}
        </li>`;
  });
  ulEl.innerHTML = listItems;
}
