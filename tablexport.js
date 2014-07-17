
// Ajith Ranganatha
/**
* Grab table elements from HTML page 
* to download as CSV.
* uses jQuery
**/


TableXport = function() {
  this.toggleXport();
  this.Xport();
};

TableXport.prototype.toggleXport = function() {
  if ($(".expbutton").length) {
    $(".expbutton").remove();
  } else {
    $("table").before("<a href='#'' class='expbutton' role='button' " +
      "style='background: rgba(0,0,0,0.7); color: white; padding: 5px; border-radius: 5px; " +
      "font-family: arial, sans-serif; font-size: 10pt; text-shadow: 1px 1px 1px black;'>Export</a>");
  }
};
  


TableXport.prototype.Xport = function() {
  var MIME_TYPE = "text/plain";

  $(".expbutton").click(function () {
    var xCSV = [];
    var tt = $(this).next().find("tr");
    var xH = [];
    $(tt).first().find("th").each(function (i, e) {
      xH.push($(e).text());
    });
    if (xH.length) {
      xCSV.push(xH.join(","));
    }
    $(tt).each(function (index, elem) {
      var xR = [];

      $(elem).find("td").each(function (i, e) {
        xR.push($(e).text());
      });
      if (xR.length) {
        xCSV.push(xR.join(","));
      }
    });
    var xCSVBlob = xCSV.join("\r\n");
    var bb = new Blob([xCSVBlob], {type: MIME_TYPE});
    this.download = "MyData.csv";
    this.href = window.URL.createObjectURL(bb);
    this.dataset.downloadurl = [MIME_TYPE, this.download, this.href].join(':');
     $(".expbutton").remove();
  });
};
