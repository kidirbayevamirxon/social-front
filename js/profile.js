const fileInput = document.getElementById('fileInput');
const displayImg = document.getElementById('displayimg');

fileInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            displayImg.src = e.target.result;
            displayImg.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        displayImg.style.display = 'none';
        displayImg.src = '';
    }
});