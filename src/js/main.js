(function () {
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const html = document.documentElement;
      const next = html.getAttribute("data-theme") === "light" ? "" : "light";
      html.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }
  const saved = localStorage.getItem("theme");
  if (saved) {
    document.documentElement.setAttribute("data-theme", saved);
  }
})();

function buildCastTable() {
  const cost = parseFloat(document.getElementById("cost").value) || 1;
  const aspd = parseFloat(document.getElementById("aspd").value) || 0.1;
  const start = parseFloat(document.getElementById("start").value) || 0;
  const mult = [10, 11, 12, 13];
  const tbody = document.querySelector("#tbl tbody");
  tbody.innerHTML = "";
  for (let n = 1; n <= 25; n++) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${n}</td>`;
    mult.forEach((m) => {
      const t = ((n - 1) * cost + (cost - start)) / (aspd * m);
      const td = document.createElement("td");
      td.textContent = t.toFixed(2);
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  }
}
function setExampleCast() {
  document.getElementById("cost").value = 100;
  document.getElementById("aspd").value = 4;
  document.getElementById("start").value = 35;
  buildCastTable();
}
function exportCastTable() {
  const rows = [
    ["Cast #", "Default ×10", "Charm ×11", "Skill-Tree ×12", "Both ×13"],
  ];
  const cost = parseFloat(document.getElementById("cost").value) || 1;
  const aspd = parseFloat(document.getElementById("aspd").value) || 0.1;
  const start = parseFloat(document.getElementById("start").value) || 0;
  const mult = [10, 11, 12, 13];
  for (let n = 1; n <= 25; n++) {
    const row = [n];
    mult.forEach((m) => {
      row.push(((n - 1) * cost + (cost - start)) / (aspd * m));
    });
    rows.push(row.map((v) => (typeof v === "number" ? v.toFixed(2) : v)));
  }
  const csv = rows.map((r) => r.join(",")).join("\n");
  navigator.clipboard.writeText(csv).then(() => alert("Table copied as CSV!"));
}
