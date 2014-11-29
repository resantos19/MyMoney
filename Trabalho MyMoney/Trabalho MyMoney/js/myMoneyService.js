app.factory('NameService', function($window){
	var 
		names = [];
		ns = {};

	var choseSomebody = function() {
		return $window.parseInt(Math.random() * names.length);
	};

	var persistNames = function() {
		$window.localStorage.setItem('names', JSON.stringify(names));
	};

	ns.addName = function(name) {
		names.push(name);
		persistNames();
	};

	ns.getNames = function() {
		var retrivedNames = JSON.parse(
			$window.localStorage.getItem('names')
		);
		if(retrivedNames && retrivedNames.length > 0) {
			names = retrivedNames;
		}
		return names;
	};

	ns.remove = function(name) {
		var index = names.indexOf(name);
		if(index != -1) {
			names.splice(index, 1);
			persistNames();
		}
	};

	return ns;
});