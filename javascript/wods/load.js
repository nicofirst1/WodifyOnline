function insert_tr(table, wods) {
	// insert wods list into a table

	function insert_td(row, wod_csv) {
		// insert a single row of csv wod

		var wod_csv = wod_csv.split(",");

		row.id = wod_csv;
		row.data = wod_csv;
		var count = wod_csv.length;

		for (var i = 0; i < count; i++) {
			var cell = row.insertCell(i);
			cell.innerHTML = wod_csv[i];

		}
	}

	var count = wods.length;
	for (var i = 0; i < count; i++) {

		// check if id has not yet been add
		if (document.getElementById(wods[i].split(","))) {
			continue;
		}

		// init row
		var row = table.insertRow(1);
		insert_td(row, wods[i]);
		row.onclick = clicked_row(row);
		row.classList.add("unselected_wod_row")

	}
}


function load_wods() {
	// load all the wods as row of a table
	document.getElementById("wods_loads_id").style.display = "block";


	// Find a <table> element with id="myTable":
	var table = document.getElementById("wods_table");
	var wods = JSON.parse(localStorage.getItem('wods')) || [];
	insert_tr(table, wods);

}

function clicked_row(row) {
	// function called when a row is clicked
	return function () {
		if (row.classList.contains("selected_wod_row")) {
			row.classList.replace("selected_wod_row", "unselected_wod_row");
		} else {
			row.classList.replace("unselected_wod_row", "selected_wod_row");

		}

	}
}

