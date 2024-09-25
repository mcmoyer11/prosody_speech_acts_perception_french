
var path = 'https://raw.githubusercontent.com/mcmoyer11/perception_prosody_speech_acts_french/main/files/list_A_paras.csv'
// var path = '../txt/list_A_paras.csv'

console.log(path);

function get_data(fullpath) {
    var response = $.ajax({
        type: "GET",
        async: false,
        url: fullpath,
        dataType: "text",
    });
    return response.responseText;
}

// function generate_stim() {

//     var contents = get_data(path);
//     var raw = contents;
//     var rows = raw.split('\n');
//     var data = [];

//     headings = rows[0].split('\t');
//     var total = rows.length - 1;

//     // Push every item from the text file into the array, split on the tab (or whatever split)
//     for (var i = 1; i < total; i++) {
//         data.push(rows[i].split('\t'));
//     }

//     console.log("data: ", data);

//     var stim = data.map(function (row) {
//         return row.reduce(function (result, field, index) {
//             result[headings[index]] = field;
//             return result;
//         }, {});
//     });

//     console.log("stim: ", stim);

//     return stim;

// }

function generate_stim() {
    var contents = get_data(path);
    var rows = contents.trim().split('\n');
    var data = [];

    // Extract column names from the first row
    var headings = rows[0].split(',');

    // Loop through each row starting from the second row
    for (var i = 1; i < rows.length; i++) {
        var rowData = rows[i].split(',');

        // Create an object to store data for each row
        var rowObject = {};

        // Loop through each column and assign the value to the corresponding column name
        for (var j = 0; j < headings.length; j++) {
            rowObject[headings[j]] = rowData[j];
        }

        // Push the row object to the data array
        data.push(rowObject);
    }

    console.log("data: ", data);

    return data;
}
