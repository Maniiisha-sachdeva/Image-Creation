document.getElementById('signupButton').addEventListener('click', function () {
    openModal('signupModal');
});

document.getElementById('loginButton').addEventListener('click', function () {
    openModal('loginModal');
});

function openModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';

        // Assuming there is a close button inside the modal with the class 'close'
        var closeButton = modal.querySelector('.close');
        if (closeButton) {
            closeButton.addEventListener('click', function () {
                closeModal(modalId);
            });
        }
    }
}

function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}
