console.log('Loaded!');

//change text

var element = document.getElementById ("main-text");

element.innerHTML = "Welcome to the Harry Potter Website!";

//move logo

var img = document.getElementById("logo");
var marginLeft = 0;
function moveRight () {
		marginLeft = marginLeft + 1;
		img.style.marginLeft = marginLeft + 'px';
}
img.onclick = function() {
	var interval = setInterval(moveRight,50)
}

//counter code
var button = document.getElementById('counter');

button.onclick = function () {
	
	//create a req object
	var request = new XMLHttpRequest();
	
	// capture response
	request.onreadystatechange = function () {
		if (request.readyState === XMLHttpRequest.DONE) {
			if (request.status === 200) {
				var counter = request.responseText;
				var span = document.getElementById('count');
				span.innerHTML = counter.toString();
			}
		}
	};
	
	//make a req
	request.open('GET', 'http://siddharthhariprasad.imad.hasura-app.io/counter', true);
	request.send(null);
};


// Submit name
var submit = document.getElementById('submit_btn');
submit.onclick = function () {
	
	//create a req object
	var request = new XMLHttpRequest();
	
	// capture response
	request.onreadystatechange = function () {
		if (request.readyState === XMLHttpRequest.DONE) {
			if (request.status === 200) {
				//capture list and render as list
				var names = request.responseText;
				names = JSON.parse(names);
				var list = '';
				for (var i=0; i< names.length; i++) {
					list += '<li>' + names[i] ;
				}
				var ul = document.getElementById('namelist');
				ul.innerHTML = list;
			}
		}
	};
	//make a req and send name
	var nameInput = document.getElementById('name');
	var name = nameInput.value;
	request.open('GET', 'http://siddharthhariprasad.imad.hasura-app.io/submit-name?name=' + name, true);
	request.send(null);

	
};