//SI READY COMMENCE
$('#folder').ready(getPath(''));

  // DEFINI DATA
  var data = $('#folder > span').html();

    function getPath(data) {
      $.ajax({
          type: 'GET',
          url: 'navigator.php',
          data: "l=" + data,
          dataType: 'json',
          success: function(data) {

            var htmlcontainer = '';
                navbar = '';

            if (data != '') {
              linkDiv = $('#templatelink').html().trim();
              //THIS DONT WORK
              chemin = data.path.substr(27);
              linkDiv = linkDiv.replace(/{{back}}/g, chemin);
              navbar += linkDiv;
            }

            $.each( data.items, function( key, val ) {
              if (val.type == 'file') {
                fileDiv = $(' #templatefile ').html().trim();
                fileDiv = fileDiv.replace(/{{fichier}}/g, val.name);
                fileDiv = fileDiv.replace(/{{taille}}/g, val.size);
                re = /(?:\.([^.]+))?$/;
                ext = re.exec(val.name)[1];

                //Verifie l'extension
                if (ext=="svg" || ext=="png" || ext=="jpg" || ext=="gif") {
                  fileDiv = fileDiv.replace(/{{file}}/g, "fa-file-image-o");
                }
                if (ext=="php" || ext=="html" || ext=="sql" || ext=="py" || ext=="css" || ext=="js") {
                  fileDiv = fileDiv.replace(/{{file}}/g, "fa-file-code-o");
                }
                if (ext=="txt" || ext=="docx") {
                  fileDiv = fileDiv.replace(/{{file}}/g, "fa-file-text-o");
                }
                if (ext=="zip" || ext=="rar" || ext=="jar" || ext=="tar" || ext=="7zip") {
                  fileDiv = fileDiv.replace(/{{file}}/g, "fa-file-archive-o");
                }
                if (ext=="pdf") {
                  fileDiv = fileDiv.replace(/{{file}}/g, "fa-file-pdf-o");
                }
                else {
                  fileDiv = fileDiv.replace(/{{file}}/g, "fa-file-o");
                }

                //THIS DONT WORK
                chemin = val.path.substr(27);
                fileDiv = fileDiv.replace(/{{chemin}}/g, chemin);
                htmlcontainer += fileDiv;
              } 
              else 
              {
                fileDiv = $(' #templatefolder ').html().trim();
                fileDiv = fileDiv.replace(/{{dossier}}/g, val.name);
                //THIS DONT WORK
                chemin = val.path.substr(27);
                fileDiv = fileDiv.replace(/{{chemin}}/g, chemin);
                fileDiv = fileDiv.replace(/{{file}}/g, "fa-folder-open-o");
                htmlcontainer += fileDiv;
              }
            }); //ajax end


            $(' #container ').html(htmlcontainer);
            $('#navbar').html(navbar);
            $('[data-toggle="tooltip"]').tooltip();
          },
        
        error: function() {
          console.log('error');
        }
      });

    } // func getData

$(document).ready(function() {
  $('#logo').delay( 800 ).height( '10vh');

  $('#head').hover(function() {
    $('#logo').height('80vh');
    $('#desc').show(1000);
    $('#content').hide();
  }, function() {
    $('#logo').height('10vh');
    $('#desc').hide();
    $('#content').slideDown(1000);
  });
});


