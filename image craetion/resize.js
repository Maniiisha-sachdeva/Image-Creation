document.getElementById('imageInput').addEventListener('change', handleFileSelect);

        let originalImage; 

        function handleFileSelect(event) {
            const file = event.target.files[0];
            displayImage(file);
        }

        function displayImage(file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = new Image();
                img.onload = function () {
                    originalImage = img; 
                    const canvas = document.getElementById('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0, img.width, img.height);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }

        function resizeImage() {
            const ctx = canvas.getContext('2d');
            const width = document.getElementById('widthInput').value;
            const height = document.getElementById('heightInput').value;

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(originalImage, 0, 0, width, height);
        }

        function downloadImage() {
            const canvas = document.getElementById('canvas');
            const dataURL = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = dataURL;
            link.download = 'resized_image.png';
            link.click();
        }