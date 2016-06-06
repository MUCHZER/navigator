


/*
*   PAS AJAX SET LA BASE DE LA PAGE
*
*
*/


//SI READY COMMENCE
$('#folder').ready(function() {

  // DEFINI DATA
  var data = $('#folder > span').html();

$.ajax({
  type: 'GET',
  url: 'navigator.php',
  data: data,
  dataType: 'json',
  success: function(data) {

    var htmlcontainer = '';

    $.each( data.items, function( key, val ) {

        //verifie si val de dataitem est un fichier
        if (val.type == 'file') {
          fileDiv = $(' #templatefile ').html().trim();
          fileDiv = fileDiv.replace(/{{fichier}}/g, val.name);
          fileDiv = fileDiv.replace(/{{taille}}/g, bytesToSize(val.size));
          re = /(?:\.([^.]+))?$/;
          ext = re.exec(val.name)[1];
            //Verifie si l'extension est défini
            if (ext=='html' ||ext=='php' ||ext=='css' ||ext=='js' ||ext=='png' ||ext=='jpg' ||ext=='jpeg' ||ext=='svg' ||ext=='gif' ||ext=='psd' ||ext=='ai' ||ext=='mp3' ||ext=='wma' ||ext=='wav' ||ext=='mp4' ||ext=='avi' ||ext=='wmv' ||ext=='mov' ||ext=='mkv' ||ext=='flv' ||ext=='pdf' ||ext=='rar' ||ext=='zip' ||ext=='ttf' ||ext=='otf' ||ext=='eot' ||ext=='woff') {
               fileDiv = fileDiv.replace('laclassdelimage', ext);
            }
          chemin = val.path.substr(27);
          fileDiv = fileDiv.replace('leliendutruc', chemin);

          //envoi le bordel dans le html
          htmlcontainer += fileDiv;
        }

        //sinon c'est un dossier
        else {
          fileDiv = $(' #templatefolder ').html().trim();
          fileDiv = fileDiv.replace(/{{dossier}}/g, val.name);
          //envoi le bordel dans le html
          htmlcontainer += fileDiv;
        }
      }
    );
    $(' #container ').html(htmlcontainer);


  },
  error: function() {
    alert('lol=' + id);
  }
});
});


        function getPath(data) {


            $.ajax({
              type: 'GET',
              url: 'navigator.php',
              data: "l=" + data,
              dataType: 'json',
              success: function(data) {

                var htmlcontainer = '';

                $.each( data.items, function( key, val ) {

                    if (val.type == 'file') {
                      fileDiv = $(' #templatefile ').html().trim();
                      fileDiv = fileDiv.replace(/{{fichier}}/g, val.name);
                      fileDiv = fileDiv.replace(/{{taille}}/g, bytesToSize(val.size));
                      re = /(?:\.([^.]+))?$/;
                      ext = re.exec(val.name)[1];
                      //Verifie si l'extension est défini
                      if (ext=='html' ||ext=='php' ||ext=='css' ||ext=='js' ||ext=='png' ||ext=='jpg' ||ext=='jpeg' ||ext=='svg' ||ext=='gif' ||ext=='psd' ||ext=='ai' ||ext=='mp3' ||ext=='wma' ||ext=='wav' ||ext=='mp4' ||ext=='avi' ||ext=='wmv' ||ext=='mov' ||ext=='mkv' ||ext=='flv' ||ext=='pdf' ||ext=='rar' ||ext=='zip' ||ext=='ttf' ||ext=='otf' ||ext=='eot' ||ext=='woff') {
                         fileDiv = fileDiv.replace('laclassdelimage', ext);
                      }
                      chemin = val.path.substr(27);
                      fileDiv = fileDiv.replace('leliendutruc', chemin);
                      htmlcontainer += fileDiv;
                    } else {
                      fileDiv = $(' #templatefolder ').html().trim();
                      fileDiv = fileDiv.replace(/{{dossier}}/g, val.name);
                      chemin = val.path.substr(27);
                      fileDiv = fileDiv.replace(/{{chemin}}/g, chemin);


                      htmlcontainer += fileDiv;
                    }
                  }
                );
                $(' #container ').html(htmlcontainer);


              },
              error: function() {
                alert('lol=' + id);
              }
            });

        } // fin on click







// converti les octay en kilooctay
function bytesToSize(size) {
  var format = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (size == 0) return '0 Bytes';
  var i = parseInt(Math.floor(Math.log(size) / Math.log(1024)));
  return Math.round(size / Math.pow(1024, i), 2) + ' ' + format[i];
}
