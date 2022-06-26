const currDayEl = $("#currentDay");
const today = moment().format("LL");
currDayEl.text(today);


let plans = JSON.parse(localStorage.getItem("DailyPlanner"));
if (!plans) {
  plans = {};
  plans[today] = {};
}

const createTimeblocks = () => {
  const timeblocks = $(".container");
  for (i = 9; i <= 17; i++) {
    const hour = moment(i, "H").format("hA");
    const row = $(`<div id=${hour} class="row time-block">`);
    const timeslot = $('<textarea class="col-10 form-control">');

    timeblocks.append(row);
    row.append(timeslot);

    timeslot
      .before(`<div class="hour col pt-4">${hour}</div>`)
      .after('<button class="col btn saveBtn" id="save">💾</button>');
    
    
     if (plans[today][hour]) $(`#${hour}`).children("textarea").val(plans[today][hour]);
  }
  checkTime();
  addListener()
};

const checkTime = () => {
  $("textarea").each((i, el) => {
    const prev = $(el).prev();
    const now = moment();
    const prevTime = moment(prev.text(), "hA");
    if (prevTime.isBefore(now)) {
      $(el).addClass("past");
    } else if (prevTime.isAfter(now)) {
      $(el).addClass("future");
    } else {
      $(el).addClass("present");
    }
  });
};

const savePlan = (e) => {
  const plan = $(e.target).prev()
  const planTime = $(plan).prev().text()
  plans[today][planTime] = plan.val()
  localStorage.setItem('DailyPlanner', JSON.stringify(plans))
}

const addListener = () => {
   $("button").on("click", savePlan);
}

setInterval(checkTime, 1000 * 60);

$(window).on("load", createTimeblocks);
