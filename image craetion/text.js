function convertToImage() {
    var textInput = document.getElementById('textInput').value;
    var fontSize = document.getElementById('fontSize').value + 'px';
    var textColor = document.getElementById('textColor').value;
    var bgColor = document.getElementById('bgColor').value;
    var fontStyle = document.getElementById('fontStyle').value;
    var pageStyle = document.getElementById('pageStyle').value;

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    // Set canvas dimensions based on page style
    canvas.width = (pageStyle === 'lined') ? 2000 : 1000;
    canvas.height = (pageStyle === 'lined') ? 2000 : 1000;

    // Set background color
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw lines if the page style is "lined"
    if (pageStyle === 'lined') {
        ctx.beginPath();
        var lineHeight = 60;

        for (var i = 1; i < canvas.height / lineHeight; i++) {
            var y = i * lineHeight;
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
        }
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.stroke();
    }

    // Set text properties
    ctx.font = fontSize + ' ' + fontStyle;
    ctx.fillStyle = textColor;

    // Draw text on canvas
    var lines = textInput.split('\n');
    var lineHeight = 60;
    var y = lineHeight; 

    for (var i = 0; i < lines.length; i++) {
        wrapText(ctx, lines[i], 20, y, canvas.width - 40, lineHeight);
        y += lineHeight;
    }


    // Display image
    var img = new Image();
    img.src = canvas.toDataURL();
    document.getElementById('imageContainer').innerHTML = '';
    document.getElementById('imageContainer').appendChild(img);
}
function wrapText(context, text, x, y, maxWidth, lineHeight, pageStyle) {
    var words = text.split(' ');
    var line = '';

    for (var i = 0; i < words.length; i++) {
        var testLine = line + words[i] + ' ';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;

        if ((testWidth > maxWidth && i > 0) || words[i] === '\n') {
            context.fillText(line.trim(), x, y);
            line = (words[i] === '\n') ? '' : words[i] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }

    context.fillText(line.trim(), x, y);
}

// Example usage for lined page
// wrapText(ctx, 'Your text goes here', x, y, maxWidth, lineHeight, 'lined');

// Example usage for plain page
// wrapText(ctx, 'Your text goes here', x, y, maxWidth, lineHeight, 'plain');



function downloadImage() {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var img = new Image();

    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 90, 90, img.width, img.height);
        
        // Create a temporary link and trigger a download
        var link = document.createElement('a');
        link.href = canvas.toDataURL();
        link.download = 'text_to_image.png';
        link.click();
        
        // Ask the user if they want to reload the page
        var reloadChoice = confirm("Do you want to reload the page?");
        if (reloadChoice) {
            window.location.reload();
        }
    };

    img.src = document.querySelector('#imageContainer img').src;
}
    
 
function updateTextLayout() {
    const textInput = document.getElementById('textInput').value;
    const textContainer = document.getElementById('textContainer');
    textContainer.textContent = textInput;
}
