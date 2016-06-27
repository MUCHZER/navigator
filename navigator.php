<?php

// init var
$nav = "/".$_REQUEST['l'];
$dir = '/var/www/html/student/leog'.$nav;

// returned var
$response = viewFiles($dir);



/*

	Scan $dir and return a json file

*/

function viewFiles($dir){

	$files = array();

	if(file_exists($dir)){

		foreach(scandir($dir) as $f) {

			//  Cache les fichers cachées
			// if(!$f || $f[0] == '.') {
			// 	continue;
			// }

			if(is_dir($dir.'/'.$f)) {

				$files[] = array(
					"name" => $f,
					"type" => "folder",
					"path" => $dir.'/'.$f,
				);
			}

			else {

				$files[] = array(
					"name" => $f,
					"type" => "file",
					"path" => $dir.'/'.$f,
					"size" => filesize($dir.'/'.$f)
				);
			}
		}
	}

	return $files;
} // /viewFiles end.




/*

	Encode the fson file

*/

header('Content-type: application/json');

echo json_encode(array(
	"name" => substr($dir, 22),
	"type" => "folder",
	"path" => htmlentities($dir),
	"items" => htmlentities($response)
));
