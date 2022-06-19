const fileInput = document.querySelector('input');
const downloadBtn = document.querySelector("button");

downloadBtn.addEventListener('click', e =>{
    e.preventDefault(); //preventing file to submmit
    downloadBtn.innerText = "Downloading file...."
    fetchFile(fileInput.value);
});

function fetchFile(url){
    //fetching file & returning as blob
    fetch(url).then(res => res.blob().then(file =>{
  //URL.createObjectURL(file) creates the url of passed object
        let tempUrl = URL.createObjectURL(file);
        let aTag = document.createElement("a");
        aTag.href = tempUrl;  // passing tempUrl as href value of <a> tag 
        //passing file last name and extension as download value of <a> tag
        aTag.download = "filename"; 
        document.body.appendChild(aTag); //adding <a> Tag inside body.

        aTag.click(); //clcking <a> tag so that file download
        aTag.remove();//removing <a> tag once file get downloaded
        URL.revokeObjectURL(tempUrl);
        downloadBtn.innerText = "Download file...."
    })).catch(() => {
        //catch method will be called if any error occur while downloading
        downloadBtn.innerText = "Download file...."
        alert("Failed to download file!");
    });
}