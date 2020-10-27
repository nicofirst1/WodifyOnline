
function new_wod() {
    var form = document.getElementById("new_wod_form_id");
    form.style.display = "block";
  }
  
  function save_new_wod() {
  
    var name = document.getElementById("wod_name");
    var time_min = document.getElementById("time_min");
    var time_max = document.getElementById("time_max");
    var freq_min = document.getElementById("freq_min");
    var freq_max = document.getElementById("freq_max");
  
    // check that inputs are not empty
    if (!all_not_empty([name, time_min, time_max, freq_min, freq_max])) {
      alert("You must specify each input")
    }
  
    console.log(name, time_min, time_max, freq_min, freq_max);
  
  
    if (parseInt(time_min.value) > parseInt(time_max.value)) {
      alert("Time min should be less or equal to time max");
    }
  
    if (parseInt(freq_min.value) > parseInt(freq_max.value)) {
      alert("Repetitions min should be less or equal to freq max");
    }
  
    // define wod in csv format and save
    let wod = [name.value, time_min.value, time_max.value, freq_min.value, freq_max.value].join(',');
    save_wods(wod);
  
    // hide form
    var form = document.getElementById("new_wod_form_id");
    form.style.display = "none";
  }
  
  
  function save_wods(wod) {
    var a = [];
    // Parse the serialized wod back into an aray of objects
    a = JSON.parse(localStorage.getItem('wods')) || [];
    // Push the new wod (whether it be an object or anything else) onto the array
    a.push(wod);
  
    // Re-serialize the array back into a string and store it in localStorage
    localStorage.setItem('wods', JSON.stringify(a));
  }
  
  function all_not_empty(list) {
  
    var count = list.length;
  
    for (var i = 0; i < count; i++) {
      var item = list[i];
      if (item.value.length == 0) {
        return false;
      }
  
    }
  
    return true
  
  }
  