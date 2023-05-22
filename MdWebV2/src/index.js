var md = window.markdownit({
    html: true,
    linkify: true,
    typographer: true,
    linkify: false,
});

md.use(window.markdownitMathjax());


let fileHandle

async function Open() {
    const options = {
        types: [{
            accept: {
                'text/plain': ['.txt'],
                'text/markdown': ['.md'],
            },
        }],
        startIn: 'desktop',
        // suggestedDirectory: 'documents'
    };

    [fileHandle] = await window.showOpenFilePicker(options);
    let fileData = await fileHandle.getFile();
    let text = await fileData.text();
    textarea.value = text;
}

async function Save() {
    let stream = await fileHandle.createWritable();
    await stream.write(textarea.value);
    await stream.close();
}

async function SaveAs() {
    const options = {
        suggestedName: 'notes.md',
        startIn: 'desktop',
        // suggestedDirectory: 'documents'
    };
    fileHandle = await window.showSaveFilePicker(options);
    Save();
}

function Render() {
    var Value = document.getElementById("textarea")
    var text = Value.value;
    var result = md.render(text);
    var A4 = document.getElementById("output");
    output.innerHTML = result;
    MathJax.typesetPromise([A4]);
}



function Print() {
    const text = textarea.value;
    const result = md.render(text);
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
     body{
        font-size:18px;
        font-family:'Arial';
        padding-top:3rem;
        padding-bottom:2rem;
        position:absolute;
        left:50%;
        transform:translateX(-50%);
}
     }
     
    table {
    border-collapse: collapse;
    margin-bottom: 1em;
    width: 100%;
    }

    th,
    td {
    border: 1px solid #ddd;
    padding: 0.5em;
    text-align: left;
    }

    th {
    background-color: #f2f2f2;
    font-weight: bold;
    }

    blockquote{
    color: rgb(141, 141, 141);
    padding-left: 1em;
    }

    ul{
    padding-left: 2rem;
    }

    </style>
    </head>
    <body>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
    <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
    ${result}
    </body>
    </html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Luit.html';
    a.click();
}


function toggleClass() {
    var output = document.getElementById("Renderer");
    output.classList.toggle("read");

    var editor = document.getElementById("editor");
    editor.classList.toggle("editor");
}




var button = document.getElementById("myButton");
button.addEventListener("click", function () {
    if (button.textContent === "Write") {
        button.textContent = "Read";
    } else {
        button.textContent = "Write";
    }
});


var messages = document.getElementById("output");

// Scroll to bottom
messages.scrollTop = messages.scrollHeight;

// Create a new MutationObserver
var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        messages.scrollTop = messages.scrollHeight;
    });
});

// Observe changes to the messages element
observer.observe(messages, { childList: true });



document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        document.getElementById('Save').click();
    }
});


document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.key === 'o') {
        event.preventDefault();
        document.getElementById('Open').click();
    }
});


document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.key === 'p') {
        event.preventDefault();
        document.getElementById('Print').click();
    }
});

document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.key === 'q') {
        event.preventDefault();
        document.getElementById('SaveAs').click();
    }
});

document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.key === 'l') {
        event.preventDefault();
        document.getElementById('myButton').click();
    }
});