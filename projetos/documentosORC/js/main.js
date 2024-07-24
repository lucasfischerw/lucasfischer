document.getElementById("file-input").addEventListener("change", function() {
    var reader = new FileReader();
    reader.onload = function(e) {
        var text = reader.result;
        var lines = text.split("\n");
        var result = [];
        for (var i = 0; i < lines.length; i++) {
        if (lines[i].trim() !== "") {
            result.push(lines[i]);
        }
        }
        console.log(result);
    };
    reader.readAsText(this.files[0]);
});