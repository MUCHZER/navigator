

//init du js au lancement de la page
$(document).ready(getJSON());



function getJSON( path ) {
  var data = '';

  console.log('1 ' + path);
  $.ajax({
    type: 'POST',
    url: 'navigator.php',

    data: data,
    dataType: 'json',
    success: function( path ) {
        console.log( path.serialize() );
        afficherJSON( path );
          }
    });
}
function afficherJSON( data ) {
console.log('2 ' + data);
  //init du html
  var htmlcontainer = '';

  // Boucle d'affichager du json recu
  $.each( data.items, function( key, val ) {

      if (val.type == 'file') {
        fileDiv = $(' #templatefile ').html().trim();
        fileDiv = fileDiv.replace('Nom_fichier', val.name);
        fileDiv = fileDiv.replace('Taille_fichier', bytesToSize(val.size));
        re = /(?:\.([^.]+))?$/;
        ext = re.exec(val.name)[1];
        //Verifie si l'extension est défini
        if (ext=='html' ||ext=='php' ||ext=='css' ||ext=='js' ||ext=='png' ||ext=='jpg' ||ext=='jpeg' ||ext=='svg' ||ext=='gif' ||ext=='psd' ||ext=='ai' ||ext=='mp3' ||ext=='wma' ||ext=='wav' ||ext=='mp4' ||ext=='avi' ||ext=='wmv' ||ext=='mov' ||ext=='mkv' ||ext=='flv' ||ext=='pdf' ||ext=='rar' ||ext=='zip' ||ext=='ttf' ||ext=='otf' ||ext=='eot' ||ext=='woff') {
           fileDiv = fileDiv.replace('Image_class', ext);
        }
        chemin = val.path.substr(27);
        fileDiv = fileDiv.replace('FileLink_Replace', chemin);
        htmlcontainer += fileDiv;
      } else {
        fileDiv = $(' #templatefolder ').html().trim();
        fileDiv = fileDiv.replace('Nom_dossier', val.name);
        chemin = val.path.substr(27);
        fileDiv = fileDiv.replace('PathLink_Replace', chemin);
        htmlcontainer += fileDiv;
      }
    }
  );
  $(' #container ').html(htmlcontainer);

}


function bytesToSize(size) {
  var format = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (size == 0) return '0 Bytes';
  var i = parseInt(Math.floor(Math.log(size) / Math.log(1024)));
  return Math.round(size / Math.pow(1024, i), 2) + ' ' + format[i];
}
