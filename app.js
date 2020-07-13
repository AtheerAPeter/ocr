const button = document.getElementById("button");
const result = document.getElementById("result");

function test() {
  var file = document.getElementById("file").files[0];
  var reader = new FileReader();
  reader.onload = function (e) {
    var image = document.createElement("img");
    image.src = e.target.result;

    const exampleImage = e.target.result;
    const worker = Tesseract.createWorker({
      logger: (m) => {
        console.log(m.progress * 100);
        progressPercent(m.progress * 100);
      },
    });
    Tesseract.setLogging(true);
    work();
    async function work() {
      await worker.load();
      await worker.loadLanguage("eng");
      await worker.initialize("eng");
      let result = await worker.detect(exampleImage);
      console.log(result.data);
      result = await worker.recognize(exampleImage);
      console.log(result.data.text);
      var para = document.createElement("p");
      var node = document.createTextNode(result.data.text);
      para.appendChild(node);
      var element = document.getElementById("text");
      element.appendChild(para);
      await worker.terminate();
    }
    var element = document.getElementById("container");

    element.appendChild(image);
  };
  reader.readAsDataURL(file);
}
function progressPercent(data) {
  var pnumber = document.getElementById("pnumber");
  if (Math.round(data) <= 99) {
    pnumber.innerHTML = Math.round(data) + "% Please wait";
  } else if (Math.round(data) > 99) {
    pnumber.innerHTML = "";
  }
}
