const config = {
    "filename": "filename.png",
};

for (var key in config) {
    if (config.hasOwnProperty(key)) {
        console.log(key + " -> " + config[key]);
        var temp = config[key];
        var newObj = document.createElement("div");
        newObj.className = "object";

        var h1 = document.createElement("h1");
        h1.innerText = key;

        var br = document.createElement("br");

        var img = document.createElement("img");
        img.style = "max-height: 120px;";
        img.src = "images/" + config[key];

        var button = document.createElement("input");
        button.type = "button";
        button.value = "Add to Drawing";
        var nm = Math.random().toString(13).replace('0.', '');
        button.id = nm;
        button.onclick = function(arg) {
            return function() {
                newItem(arg);
            }
        }(config[key]);

        newObj.appendChild(h1);
        newObj.appendChild(br);
        newObj.appendChild(br);
        newObj.appendChild(img);
        newObj.appendChild(br);
        newObj.appendChild(br);
        newObj.appendChild(button);
        document.getElementById("outerContainer").appendChild(newObj);
    }
}

function dragElement(elmnt) {
    // Taken from W3Schools. I was tired and couldn't be bothered so found this to drag things around
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function createNewItem (img, callback) { 
    getMeta(img, function(w,h) {
        var newDiv = document.createElement("div");
        var nm = Math.random().toString(13).replace('0.', '');
        newDiv.className = "item";
        newDiv.id = nm;
        newDiv.style = "background: url('images/"+ img +"'); background-size: auto 100%; background-repeat: no-repeat;width:" + w + ";height:" + h + ";";
    
        var currentDiv = document.getElementById("container"); 
        currentDiv.appendChild(newDiv);
    
        return callback(nm)
    });
}

function createNewText() {
    console.log("here")
    var text = document.getElementById("textinput").value;
    console.log(text)
    createText(text, function(name) {
        dragElement(document.getElementById(name));
    });
}

function createText(text, callback) {
    var newDiv = document.createElement("div");
    var nm = Math.random().toString(13).replace('0.', '');
    newDiv.className = "item";
    newDiv.id = nm;
    newDiv.style = "width: 100px;height: 30px;";
    newDiv.innerText = text;

    var currentDiv = document.getElementById("container"); 
    currentDiv.appendChild(newDiv);

    return callback(nm)
}

function newItem(img) {
    createNewItem(img, function(name) {
        dragElement(document.getElementById(name));
    });
}

function getMeta(url, callback){   
    var img = new Image();
    img.onload = function(){
        callback(this.width, this.height);
    };
    img.src = "images/" + url;
}

function save() {
    var data = document.getElementById("container").innerHTML;
    console.log(data);
    var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "drawing.gdraw");
}

function handleFileSelect(evt) {
    var files = evt.target.files; 
    f = files[0];
    var reader = new FileReader();
    reader.onload = (function(theFile) {
        return function(e) {
          document.getElementById('container').innerHTML = e.target.result;
        };
      })(f);
      reader.readAsText(f);
}
document.getElementById('fileinput').addEventListener('change', handleFileSelect, false);