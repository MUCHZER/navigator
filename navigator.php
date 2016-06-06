<?php

$nav = "/".$_REQUEST['l'];

$dir = '/var/www/html/student/leog'.$nav;

$response = scan($dir);

function scan($dir){

	$files = array();

	if(file_exists($dir)){

		foreach(scandir($dir) as $f) {

			if(!$f || $f[0] == '.') {
				continue;
			}

			if(is_dir($dir . '/' . $f)) {



				$files[] = array(
					"name" => $f,
					"type" => "folder",
					"path" => $dir . '/' . $f,
				);
			}

			else {



				$files[] = array(
					"name" => $f,
					"type" => "file",
					"path" => $dir . '/' . $f,
					"size" => filesize($dir . '/' . $f)
				);
			}
		}

	}

	return $files;
}



header('Content-type: application/json');

echo json_encode(array(
	"name" => substr($dir,  22),
	"type" => "folder",
	"path" => $dir,
	"items" => $response
));
