	//SI READY COMMENCE
	$('#folder').ready( getPath('') );

	// DEFINI DATA
	var data = $('#folder > span').html();
	  
	/*
	* Parse data from API
	*/
	function parse_data( data ) {
		var htmlcontainer = '';
		var navbar = '';

		if (data != '') {
			linkDiv = $('#templatelink').html().trim();
			console.log( data.path );
			chemin = data.path;
			linkDiv = linkDiv.replace(/{{back}}/g, chemin);
			navbar += linkDiv;
		}

		$.each( data.items, function( key, val ) {

			if (val.type == 'file') 
			{
				fileDiv = $(' #templatefile ').html().trim();
				fileDiv = fileDiv.replace(/{{fichier}}/g, val.name);
				fileDiv = fileDiv.replace(/{{taille}}/g, val.size);
				re = /(?:\.([^.]+))?$/;
				ext = re.exec(val.name)[1];

				//Verifie l'extension
				getFileExtention( ext );

				chemin = data.items[key].filepath;
				
				fileDiv = fileDiv.replace( /{{chemin}}/g, chemin);
				htmlcontainer += fileDiv;
			} 

			else 
			{
				fileDiv = $(' #templatefolder ').html().trim();
				fileDiv = fileDiv.replace(/{{dossier}}/g, val.name);
				//THIS DONT WORK
				console.log( data.items[key] );
				chemin = data.items[key].filepath;
				fileDiv = fileDiv.replace(/{{chemin}}/g, chemin);
				fileDiv = fileDiv.replace(/{{file}}/g, "fa-folder-open-o");
				htmlcontainer += fileDiv;
			}


		}); //foreach
		
		$(' #container ').html(htmlcontainer);
		$('#navbar').html(navbar);
		//$('[data-toggle="tooltip"]').tooltip();
	}

	function getFileExtention( ext ) {
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

	}


	function getPath(data) {

		$.ajax({
			type: 'GET',
			url: 'navigator.php',
			data: "l=" + data,
			dataType: 'json',
			success: function(data) {
				console.log( data );
				parse_data( data );
			},
			
			error: function() {
				console.log('error');
			}
		}); //ajax end

	} // func getData

	$(document).ready(function() {
		$('#logo').delay( 800 ).height('10vh');
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


