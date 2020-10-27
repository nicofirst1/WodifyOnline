function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function insert_running_tr(table, wods) {
    // insert wods list into a table

    function insert_td(row, wod) {
        // insert a single row of csv wod


        row.id = wod.join(",")
        setInterval(update(row), 1000);
        var count = wod.length;

        for (var i = 0; i < count; i++) {
            var cell = row.insertCell(i);
            cell.innerHTML = wod[i];

        }
        row.insertCell(i).innerHTML = "-";
    }

    var count = wods.length;
    for (var i = 0; i < count; i++) {

        let wod = random_wod(wods[i]);

        // check if id has not yet been add
        if (document.getElementById(wod.join(","))) {
            continue;
        }

        // init row
        var row = table.insertRow(1);
        row.data = wods[i].join(",");
        insert_td(row, wod);
        row.onclick = clicked_row(row);
        row.classList.add("unselected_wod_row")

    }
}


function random_wod(wod) {
    // define a random wod given the specs
    var name = wod[0];
    var time_min = parseInt(wod[1]);
    var time_max = parseInt(wod[2]);
    var rep_min = parseInt(wod[3]);
    var rep_max = parseInt(wod[4]);

    var time = getRandomInt(time_min, time_max);
    var reps = getRandomInt(rep_min, rep_max);

    return [name, time, reps]
}

function start_wod() {
    // get all selected rows
    var selected_rows = document.getElementsByClassName("selected_wod_row");


    var wods = []
    //extract wod and change class to running
    while (selected_rows.length) {
        var row = selected_rows[0];
        var wod = row.data.split(',');
        console.log(wod);
        row.classList.replace("selected_wod_row", "running_wod_row");

        // define a wod and push it to list
        wods.push(wod);

    }
    var table = document.getElementById("wods_running_table");
    insert_running_tr(table, wods);

    // hide selection and show running
    document.getElementById("wods_loads_id").style.display = "none";
    document.getElementById("wods_running_id").style.display = "block";
}

function update(row) {
    // function to update a row every second
    var inter = setInterval(inner_update, 1000)

    function inner_update() {

        var cur_time = parseInt(row.cells[2].innerHTML);
        if (cur_time === 0) {
            setTimeout(time_end(row, inter), 1);
        } else {
            cur_time -= 1;
            row.cells[2].innerHTML = cur_time;
        }

    }
}

function time_end(row, inter) {
    const prev_rep = parseInt(row.cells[1].innerHTML);
    if (confirm(row.id)) {
        console.log(row.data);
        var wod = random_wod(row.data.split(','));
        row.cells[1].innerHTML = wod[1];
        row.cells[2].innerHTML = wod[2];

    } else {
        console.log("no");
        clearInterval(inter);
    }
    if (row.cells[3].innerHTML === "-") {
        row.cells[3].innerHTML = prev_rep;
    } else {
        row.cells[3].innerHTML = parseInt(row.cells[3].innerHTML) + prev_rep;

    }

}