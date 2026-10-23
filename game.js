"use strict";
// Fire Span browser glue: wires the deck engine in game.js to the page.

var G = null;

function $(id) { return document.getElementById(id); }

function fmt(x) {
  var n = Math.round(x);
  return "$" + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function render() {
  $("yearlab").textContent = "Year " + G.year + " of 30";
  $("ballab").textContent = "Portfolio: " + fmt(G.cash);
  var hist = "";
  for (var i = 0; i < G.cards.length; i++) {
    hist += "Y" + (i + 1) + " " + G.cards[i].note + " -> " + fmt(G.cards[i].bal) + ". ";
  }
  $("drawhist").textContent = hist;
}

function showYear(res) {
  var line = $("yeartable");
  if (res.dead) {
    line.innerHTML = "<span class='warn'>The plan died in year " + (G.year - 1) +
      ": " + res.card.note + ", minus the " + fmt(res.wd) +
      " withdrawal, took the balance below zero. Order, not average.</span>";
    return;
  }
  line.textContent = "The year was " + res.card.note +
    ". The withdrawal left the portfolio at " + fmt(G.cash) + ".";
}

function endGame() {
  $("play").hidden = true;
  $("end").hidden = false;
  var v = $("verdict");
  var s = $("summary");
  if (G.cash <= 0) {
    v.textContent = "Ruined in year " + G.year + ".";
    s.textContent = "The deck ran out of patience before year 30. Try a lower withdrawal rate or keep a work year in reserve for the early stretch. Rebalance after a crash and you sell bonds into the hole instead of stocks.";
  } else {
    v.textContent = "Survived all 30 years with " + fmt(G.cash) + " left.";
    s.textContent = "The plan held. Note the order the cards arrived in: rerun with the same rate and a different shuffle and the story can change. That is sequence of returns risk.";
  }
}

function begin() {
  var start = parseFloat($("start").value);
  var wr = parseFloat($("wr").value);
  if (isNaN(start) || start < 100000) { start = 100000; }
  G = { start: start, wr: wr, cash: start, year: 1, worked: 0, cards: [], over: false,
        deckStocks: [], deckBonds: [] };
  $("setup").hidden = true;
  $("play").hidden = false;
  $("end").hidden = true;
  $("yeartable").textContent = "Set an allocation, then draw year 1. The withdrawal is " + fmt(G.wr * G.start) + " a year, taken after the market moves.";
  render();
}

function draw() {
  if (!G || G.over) { return; }
  var alloc = $("alloc").value;
  var card = nextCard(alloc);
  var wd = G.wr * G.start;
  var bal = G.cash * (1 + card.r) - wd;
  G.cash = bal;
  G.cards.push({ note: card.note, r: card.r, bal: bal });
  G.year += 1;
  showYear({ card: card, wd: wd, dead: bal <= 0 });
  if (bal <= 0 || G.year > 30) { G.over = true; endGame(); return; }
  render();
}

function work() {
  if (!G || G.over || G.worked >= 3) { return; }
  G.cash += 20000;
  G.worked += 1;
  G.year += 1;
  G.cards.push({ note: "part-time year: +$20,000, no withdrawal", bal: G.cash });
  $("yeartable").textContent = "You worked a part-time year: +$20,000, no withdrawal. " + (3 - G.worked) + " left.";
  if (G.year > 30) { G.over = true; endGame(); return; }
  render();
}

function nextCard(alloc) {
  var key = alloc === "stocks" ? "deckStocks" : "deckBonds";
  var base = alloc === "stocks" ? STOCKS : BONDS;
  if (G[key].length === 0) { G[key] = base.slice(); }
  var idx = Math.floor(Math.random() * G[key].length);
  return G[key].splice(idx, 1)[0];
}

var STOCKS = [
  { r: 0.35, note: "a roaring bull year (+35%)" },
  { r: 0.18, note: "a strong stock year (+18%)" },
  { r: 0.12, note: "a mild stock year (+12%)" },
  { r: 0.07, note: "a flat-ish stock year (+7%)" },
  { r: -0.10, note: "a correction (-10%)" },
  { r: -0.25, note: "a brutal bear (-25%)" },
  { r: -0.34, note: "a 2008-style crash (-34%)" },
  { r: 0.22, note: "a rebound year (+22%)" },
  { r: 0.05, note: "a sideways year (+5%)" },
  { r: 0.15, note: "a good stock year (+15%)" }
];
var BONDS = [
  { r: 0.06, note: "a bond year (+6%)" },
  { r: 0.04, note: "a steady bond year (+4%)" },
  { r: 0.02, note: "a thin bond year (+2%)" },
  { r: -0.03, note: "a bond wobble (-3%)" },
  { r: 0.05, note: "a good bond year (+5%)" }
];

document.getElementById("begin").addEventListener("click", begin);
document.getElementById("draw").addEventListener("click", draw);
document.getElementById("work").addEventListener("click", work);
