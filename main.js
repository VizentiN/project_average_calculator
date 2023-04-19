const form = document.getElementById("form_activity");
const imgApproved = '<img src="./images/aprovado.png" alt="emoji party">';
const imgDisapproved = '<img src="./images/reprovado.png" alt="emoji sad">';
const activities = [];
const notes = [];
const spanApproved = '<span class="result approved">Approved</span>'
const spanDisapproved = '<span class="result disapproved">Disapproved</span>'
const minNote = parseFloat(prompt("Enter the minimum grade: "));

let lines = '';

form.addEventListener('submit', function (e) {
    e.preventDefault();

    addLine();
    updateTable();
    updateAverage();
});

function addLine() {
    const inputActivityName = document.getElementById('activity_name');
    const inputActivityNote = document.getElementById('activity_note');

    if (activities.includes(inputActivityName.value)) {
        alert(`The activity: ${inputActivityName.value} already exist!`)
    } else {
        activities.push(inputActivityName.value);
        notes.push(parseFloat(inputActivityNote.value));

        let line = '<tr>';
        line += `<td>${inputActivityName.value}</td>`;
        line += `<td>${inputActivityNote.value}</td>`;
        line += `<td>${inputActivityNote.value >= minNote ? imgApproved : imgDisapproved}</td>`;
        line += '</tr>';

        lines += line
    }

    inputActivityName.value = ''
    inputActivityNote.value = ''
}

function updateTable() {
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = lines;
}

function updateAverage() {
    const finalAverage = calculateFinalAverage();

    document.getElementById('final_average_note').innerHTML = finalAverage;
    document.getElementById('final_average_result').innerHTML = finalAverage >= minNote ? spanApproved : spanDisapproved;
}

function calculateFinalAverage() {
    let sumOfGrades = 0;

    for (let i = 0; i < notes.length; i++) {
        sumOfGrades += notes[i];
    }

    return sumOfGrades / notes.length;
}

