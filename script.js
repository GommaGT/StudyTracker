// Werte aus Local Storage abrufen oder auf 0 setzen
let hourlyCount = parseInt(localStorage.getItem("hourlyCount")) || 0;
let weeklyCount = parseInt(localStorage.getItem("weeklyCount")) || 0;
let totalCount = parseInt(localStorage.getItem("totalCount")) || 0;

// HTML aktualisieren
document.getElementById("hourlyCount").textContent = hourlyCount;
document.getElementById("weeklyCount").textContent = weeklyCount;
document.getElementById("totalCount").textContent = totalCount;

// Funktion zum Erhöhen der Werte
function increaseCount() {
    hourlyCount++;
    weeklyCount++;
    totalCount++;

    // Werte speichern
    localStorage.setItem("hourlyCount", hourlyCount);
    localStorage.setItem("weeklyCount", weeklyCount);
    localStorage.setItem("totalCount", totalCount);

    // HTML aktualisieren
    document.getElementById("hourlyCount").textContent = hourlyCount;
    document.getElementById("weeklyCount").textContent = weeklyCount;
    document.getElementById("totalCount").textContent = totalCount;
}

// Funktion zum Zurücksetzen des Stundenzählers
function resetHourly() {
    hourlyCount = 0;
    localStorage.setItem("hourlyCount", hourlyCount);
    document.getElementById("hourlyCount").textContent = hourlyCount;
}

// Funktion zum automatischen Zurücksetzen des Wochenzählers (jeden Montag)
function resetWeekly() {
    let lastReset = localStorage.getItem("lastWeekReset");
    let today = new Date();
    let currentWeek = today.getFullYear() + "-" + today.getWeek(); // Woche als "YYYY-WW"

    if (lastReset !== currentWeek) {
        weeklyCount = 0;
        localStorage.setItem("weeklyCount", weeklyCount);
        localStorage.setItem("lastWeekReset", currentWeek);
        document.getElementById("weeklyCount").textContent = weeklyCount;
    }
}

// Hilfsfunktion: Aktuelle Kalenderwoche berechnen
Date.prototype.getWeek = function () {
    let date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    let week1 = new Date(date.getFullYear(), 0, 4);
    return (
        date.getFullYear() +
        "-" +
        Math.round(((date - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7 + 1)
    );
};

// Wöchentlicher Reset prüfen
resetWeekly();
