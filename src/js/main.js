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

function calcReroll() {
  const books = parseInt(document.getElementById("books").value) || 0;
  let cost = 1100,
    rolls = 0,
    spent = 0;
  while (spent + cost <= books) {
    spent += cost;
    rolls++;
    cost = Math.ceil(cost * 1.1);
  }
  document.getElementById("rolls").textContent = rolls;
  document.getElementById("reset").textContent = rolls
    ? Math.max(1, Math.floor(rolls / 10) * 10)
    : 0;
  document.getElementById("remaining").textContent = books - spent;
}
function setExampleBooks() {
  document.getElementById("books").value = 20000;
  calcReroll();
}
function exportRerollResults() {
  const books = document.getElementById("books").value;
  const rolls = document.getElementById("rolls").textContent;
  const reset = document.getElementById("reset").textContent;
  const remaining = document.getElementById("remaining").textContent;
  const txt = `Books used: ${books}\nTotal rerolls: ${rolls}\nOptimal reset: after roll ${reset}\nBooks remaining: ${remaining}`;
  navigator.clipboard
    .writeText(txt)
    .then(() => alert("Results copied to clipboard!"));
}

function calcDefense() {
  const armor = parseFloat(document.getElementById("flatArmor").value) || 0;
  const dr = parseFloat(document.getElementById("flatDR").value) || 0;
  const armorPct = (armor / (armor + 15000)) * 90;
  const total = (1 - armorPct / 100) * (1 - dr / 100);
  document.getElementById("armorPct").textContent = armorPct.toFixed(2) + " %";
  document.getElementById("totalRed").textContent =
    ((1 - total) * 100).toFixed(2) + " %";
}
function setExampleDefense() {
  document.getElementById("flatArmor").value = 10000;
  document.getElementById("flatDR").value = 0;
  calcDefense();
}
function exportDefenseResults() {
  const armor = document.getElementById("flatArmor").value;
  const dr = document.getElementById("flatDR").value;
  const armorPct = document.getElementById("armorPct").textContent;
  const totalRed = document.getElementById("totalRed").textContent;
  const txt = `Flat armor: ${armor}\nFlat DR: ${dr}%\nArmor %: ${armorPct}\nTotal DR: ${totalRed}`;
  navigator.clipboard
    .writeText(txt)
    .then(() => alert("Results copied to clipboard!"));
}

let lucid = false;
function toggleLucid() {
  lucid = !lucid;
  const btn = document.getElementById("lucid-btn");
  btn.classList.toggle("active", lucid);
  btn.setAttribute("aria-pressed", lucid ? "true" : "false");
  calcTerra();
}
function calcTerra() {
  const prestige = parseFloat(document.getElementById("prestige").value) || 0;
  const aspd = parseFloat(document.getElementById("aspd").value) || 0.01;
  const abilityCost = 175;
  let manaPerSwing = 12;
  if (lucid) manaPerSwing = 13;
  const abilityDur = 5;
  const bonus = 0.8 + 0.08 * prestige;
  const timeToCast = abilityCost / manaPerSwing / aspd;
  const uptime = abilityDur / timeToCast > 1 ? 1 : abilityDur / timeToCast;
  const overallBonus = bonus * uptime;
  document.getElementById("bonus").textContent =
    (bonus * 100).toFixed(2) + " %";
  document.getElementById("cast").textContent = timeToCast.toFixed(2) + " s";
  document.getElementById("uptime").textContent =
    (uptime * 100).toFixed(1) + " %";
  document.getElementById("overall").textContent =
    (overallBonus * 100).toFixed(1) + " %";
}
