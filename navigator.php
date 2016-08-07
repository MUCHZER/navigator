<?php

// init var
$nav = "/" . $_REQUEST['l'];
$dir = __DIR__ . $nav;


// returned var
$response = viewFiles($dir);


/**
 * Function viewFiles
 *
 * Scan $dir and return files and folders
 *
 * @param $dir
 * @return array
 */
function viewFiles($dir)
{

    $files = [];

    if (file_exists($dir))
    {

        foreach (scandir($dir) as $f) 
        {

            //  Cache les fichers cachées
            // if(!$f || $f[0] == '.') {
            // 	continue;
            // }

            if (is_dir($dir . '/' . $f)) 
            {

                $files[] = [
                    "name" => htmlentities($f),
                    "type" => "folder",
                    "path" => htmlentities($dir . '/' . $f)
                ];
            } 
            else 
            {
                $files[] = [
                    "name" => htmlentities($f),
                    "type" => "file",
                    "path" => htmlentities($dir . '/' . $f),
                    "size" => bytesToHuman(filesize($dir . '/' . $f))
                ];
            }
        }
    }

    return $files;
} // /viewFiles end.

/**
 * Function bytesToHuman
 *
 * Return a human readable size
 *
 * @param $bytes
 * @param int $decimals
 * @return string
 */
function bytesToHuman($bytes, $decimals = 2) 
{
    $sz = 'BKMGTP';
    $factor = floor((strlen($bytes) - 1) / 3);
    return sprintf("%.{$decimals}f", $bytes / pow(1024, $factor)) . @$sz[$factor];
}


/**
 * Return json file
 */
header('Content-type: application/json');

echo json_encode([
    "name" => $dir,
    "type" => "folder",
    "path" => htmlentities($dir),
    "items" => $response
]);
