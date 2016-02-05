<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
  	<meta http-equiv="X-UA-Compatible" content="IE=edge">
  	<meta name="viewport" content="width=device-width, initial-scale=1">

		<title>{{ title || 'Abby' }}</title>
		<meta name="description" content="">

		<link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,300,600,700' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" href="/assets/css/abby.css">

		{% block head %}{% endblock %}
	</head>

	<body>

		{% block content %}{% endblock %}		

	</body>
</html>