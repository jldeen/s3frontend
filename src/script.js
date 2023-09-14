// script.js
const form = document.getElementById("form");
const button = document.getElementById('submit-btn');
const input = document.getElementById('files');

form.addEventListener("submit", submitForm);

button.addEventListener("click", () => {
    if (input.value == '') {
        button.disabled = true
        button.style.backgroundColor = " rgb(202, 24, 24)";
        button.textContent="Please provide a file!"
        setTimeout(function(){
            window.location.reload();
         }, 1500)
    
        console.log(`Error! No file provided!`)
    } else {
        button.disabled = false
        console.log(`File provided, uploading to S3`)
    }
})

function uploading() {
    button.style.backgroundColor = "#FFA500";
    button.textContent=`Uploading...`
    return 
}

async function submitForm(e) {
    e.preventDefault();

    const files = document.getElementById("files");
    const formData = new FormData();

    for(let i =0; i < files.files.length; i++) {
            formData.append("files", files.files[i]);
    }
    await fetch("http://localhost:3000/upload_files", {
        method: 'POST',
        body: formData,
    })
        .then((res) => console.log(res))
        .then(() => {
            form.reset();
            button.style.backgroundColor = "rgb(78, 98, 168)";
            button.textContent = "Upload";
        })
        .catch((err) => console.log("Error occurred", err))
}
