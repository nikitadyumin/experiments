<!DOCTYPE html>
<html lang="en">
<head>
    <style>
        #hammer {
            margin: 50px;
            width: 150px;
            height: 150px;
            background: green;
            font-family: arial,serif;
            color: white;
            padding-top: 110px;
            text-align: center;
            transition: background 1s;
        }
        #hammer.tapped {
            background: yellow;
        }
    </style>
</head>
<body>
<div id="hammer">
    touch this
</div>
</body>
</html>