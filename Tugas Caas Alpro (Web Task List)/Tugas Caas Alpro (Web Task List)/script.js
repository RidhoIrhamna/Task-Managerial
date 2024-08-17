let members = JSON.parse(localStorage.getItem('members')) || ['Ellen', 'Lycaon'];
let tasks = JSON.parse(localStorage.getItem('tasks')) || ['Alpro', 'OOP', 'PPB', 'PBO'];
let assignments = JSON.parse(localStorage.getItem('assignments')) || [];

function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function showConfirmPopup(message, onYes) {
    const confirmPopup = document.getElementById('confirmPopup');
    const confirmMessage = document.getElementById('confirmMessage');
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');

    confirmMessage.textContent = message;
    confirmPopup.style.display = 'flex';

    const popupContent = confirmPopup.querySelector('.popup-content');
    popupContent.classList.add('shake');

    setTimeout(() => {
        popupContent.classList.remove('shake');
    }, 250); 

    yesButton.onclick = function () {
        confirmPopup.style.display = 'none';
        onYes();
    };

    noButton.onclick = function () {
        confirmPopup.style.display = 'none';
    };
}

function showSuccessPopup(message) {
    const successPopup = document.getElementById('successPopup');
    const successMessage = document.getElementById('successMessage'); 
    successMessage.textContent = message; 
    const closeSuccessButton = document.getElementById('closeSuccessButton');

    successPopup.style.display = 'flex';

    const popupContent = successPopup.querySelector('.popup-content');
    popupContent.classList.add('shake');

    setTimeout(() => {
        popupContent.classList.remove('shake');
    }, 250); 

    closeSuccessButton.onclick = function () {
        successPopup.style.display = 'none';
    };
}

function showWarningPopup(message) {
    const warningPopup = document.getElementById('warningPopup');
    const warningMessage = document.getElementById('warningMessage');
    warningMessage.textContent = message;
    const closeWarningButton = document.getElementById('closeWarningButton');

    warningPopup.style.display = 'flex';

    const popupContent = warningPopup.querySelector('.popup-content');
    popupContent.classList.add('shake');

    setTimeout(() => {
        popupContent.classList.remove('shake');
    }, 250);

    closeWarningButton.onclick = function () {
        warningPopup.style.display = 'none';
    };
}

function addMember() {
    const memberInput = document.getElementById('memberInput');
    const memberName = memberInput.value.trim();

    if (!memberName) {
        showWarningPopup('Harap isikan nama anggota!');
        return;
    }

    if (members.includes(memberName)) {
        showWarningPopup(`Anggota ${memberName} sudah ada!`); 
    } else {
        members.push(memberName);
        saveToLocalStorage('members', members);
        updateMemberSelect();
        memberInput.value = '';
        showSuccessPopup(`Anggota ${memberName} berhasil ditambahkan!`); 
    }
}

function updateMemberSelect() {
    const memberSelect = document.getElementById('memberSelect');
    memberSelect.innerHTML = '<option value="">--Pilih Anggota--</option>';

    members.forEach(member => {
        const option = document.createElement('option');
        option.value = member;
        option.textContent = member;
        memberSelect.appendChild(option);
    });
}

function addNewTask() {
    const newTaskInput = document.getElementById('newTaskInput');
    const newTask = newTaskInput.value.trim();

    if (!newTask) {
        showWarningPopup('Harap isikan nama tugas!');
        return;
    }

    if (tasks.includes(newTask)) {
        showWarningPopup(`Tugas ${newTask} sudah ada!`); 
    } else {
        tasks.push(newTask);
        saveToLocalStorage('tasks', tasks);
        updateTaskSelect();
        newTaskInput.value = '';
        showSuccessPopup(`Tugas ${newTask} berhasil ditambahkan!`); 
    }
}

function updateTaskSelect() {
    const taskSelect = document.getElementById('taskSelect');
    taskSelect.innerHTML = '<option value="">--Pilih Tugas--</option>';

    tasks.forEach(task => {
        const option = document.createElement('option');
        option.value = task;
        option.textContent = task;
        taskSelect.appendChild(option);
    });
}

function assignTask() {
    const selectedMember = document.getElementById('memberSelect').value;
    const selectedTask = document.getElementById('taskSelect').value;
    const dueDateInput = document.getElementById('dueDateInput').value;

    if (selectedMember === '' || selectedTask === '' || dueDateInput === '') {
        showWarningPopup('Harap lengkapi semua kolom sebelum menugaskan tugas!');
        return;
    }
    
        const taskAssignedToMember = assignments.some(assignment => assignment.task === selectedTask && assignment.member === selectedMember);

        if (taskAssignedToMember) {
            showWarningPopup(`Tugas ${selectedTask} sudah ditugaskan ke ${selectedMember}!`);
        } else {
          
            showConfirmPopup(`Apakah Anda yakin ingin menugaskan ${selectedTask} kepada ${selectedMember} dengan tenggat waktu ${dueDateInput}?`, function() {
                const task = {
                    member: selectedMember,
                    task: selectedTask,
                    dueDate: dueDateInput
                };

                assignments.push(task);
                saveToLocalStorage('assignments', assignments);
                displayAssignments();
                showSuccessPopup(`Tugas ${selectedTask} berhasil ditugaskan ke ${selectedMember}!`); 

                document.getElementById('taskSelect').value = '';
                document.getElementById('dueDateInput').value = '';
            });
        }
    }



function displayAssignments() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; 

    assignments.forEach(assignment => {
  
        const row = document.createElement('tr');

        const taskCell = document.createElement('td');
        taskCell.textContent = assignment.task;
        row.appendChild(taskCell);

        const memberCell = document.createElement('td');
        memberCell.textContent = assignment.member;
        row.appendChild(memberCell);

        const dueDateCell = document.createElement('td');
        dueDateCell.textContent = assignment.dueDate;
        row.appendChild(dueDateCell);

        taskList.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateTaskSelect();
    updateMemberSelect();
    displayAssignments(); 
});

function resetMembers() {
    if (members.length === 2 && members.includes('Ellen') && members.includes('Lycaon')) {
        showWarningPopup('Tidak ada anggota baru yang telah ditambahkan!');
    } else {
        showConfirmPopup('Apakah Anda yakin ingin mereset data anggota?', function() {
            members = ['Ellen', 'Lycaon'];
            saveToLocalStorage('members', members);
            updateMemberSelect();
            showSuccessPopup('Data anggota berhasil direset!');
        });
    }
}

function resetTasks() {
    if (tasks.length === 4 && tasks.includes('Alpro') && tasks.includes('OOP') && tasks.includes('PPB') && tasks.includes('PBO')) {
        showWarningPopup('Tidak ada tugas baru yang telah ditambahkan!');
    } else {
        showConfirmPopup('Apakah Anda yakin ingin mereset data tugas?', function() {
            tasks = ['Alpro', 'OOP', 'PPB', 'PBO'];
            saveToLocalStorage('tasks', tasks);
            updateTaskSelect();
            showSuccessPopup('Data tugas berhasil direset!');
        });
    }
}

function resetAssignments() {
    if (assignments.length === 0) {
        showWarningPopup('Tidak ada penugasan yang telah ditambahkan!');
    } else {
        showConfirmPopup('Apakah Anda yakin ingin mereset data penugasan?', function() {
            assignments = [];
            saveToLocalStorage('assignments', assignments);
            displayAssignments();
            showSuccessPopup('Data penugasan berhasil direset!');
        });
    }
}
