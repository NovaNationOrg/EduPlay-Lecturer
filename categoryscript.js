var modal = document.getElementById('modal');
var closeButton = document.getElementById('closeButton');
var openButton = document.getElementById('openModal');

// When the user clicks on the button, toggle between hiding and showing the dropdown content

function dropDownFunc() {
    document.getElementById("dropdown-1").classList.toggle("show");
}

function closeModal() {
    modal.classList.add('hidden');
}

function openModal() {
    modal.classList.remove('hidden');
}

closeButton.addEventListener('click', closeModal);
openButton.addEventListener('click', openModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});