

const createTimeslots = () => {
  const timeblocks = $("#timeblocks");
  for (i = 9; i <= 17; i++) {
    let time = moment(i, 'H').format('hA')
    let timeslot = $('<input class="col-10" type="text">')
    let row = $(`<div id=${time} class="row">`); 
    timeblocks.append(row)
    row.append(timeslot)
    timeslot
      .before(`<p class="col"></p>`)
      .after('<p class="col" id="save">💾</p>');;
    $(`#${time}`).children().first().text(time)
  }
}

$(window).on("load", createTimeslots);
