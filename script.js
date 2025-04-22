function saveData() {
  const startDate = document.getElementById("start-date").value;
  const periodLength = parseInt(document.getElementById("period-length").value);
  const cycleLength = parseInt(document.getElementById("cycle-length").value);

  if (!startDate || isNaN(periodLength) || isNaN(cycleLength)) {
    alert("請填寫所有欄位");
    return;
  }

  const start = new Date(startDate);
  const nextPeriod = new Date(start);
  nextPeriod.setDate(start.getDate() + cycleLength);

  const ovulationDay = new Date(start);
  ovulationDay.setDate(start.getDate() + cycleLength - 14); // 約排卵期

  const data = {
    startDate,
    periodLength,
    cycleLength,
    nextPeriod: nextPeriod.toISOString().split('T')[0],
    ovulationDay: ovulationDay.toISOString().split('T')[0]
  };

  localStorage.setItem("menstrualData", JSON.stringify(data));
  showPrediction(data);
}

function showPrediction(data) {
  const div = document.getElementById("prediction");
  div.innerHTML = `
    <p><strong>預測下次月經日：</strong> ${data.nextPeriod}</p>
    <p><strong>排卵期約在：</strong> ${data.ovulationDay}</p>
  `;
}

// 自動載入上次紀錄
window.onload = () => {
  const saved = localStorage.getItem("menstrualData");
  if (saved) {
    const data = JSON.parse(saved);
    document.getElementById("start-date").value = data.startDate;
    document.getElementById("period-length").value = data.periodLength;
    document.getElementById("cycle-length").value = data.cycleLength;
    showPrediction(data);
  }
};
