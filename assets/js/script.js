const currDayEl = $("#currentDay");
const today = moment().format("LL");
currDayEl.text(today);

//get plans
let plans = JSON.parse(localStorage.getItem("DailyPlanner"));
if (!plans) {
  plans = {};
  plans[today] = {};
}


//create time blocks
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
    
    //add plans to text area
     if (plans[today][hour]) $(`#${hour}`).children("textarea").val(plans[today][hour]);
  }
  checkTime();
  addListener()
};

//check if hour is in past, present, or future
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

//save plans
const savePlan = (e) => {
  const plan = $(e.target).prev()
  const planTime = $(plan).prev().text()
  plans[today][planTime] = plan.val()
  localStorage.setItem('DailyPlanner', JSON.stringify(plans))
}

//add save button click event listener
const addListener = () => {
   $("button").on("click", savePlan);
}

//check the time every minute
setInterval(checkTime, 1000 * 60);

//initiate time block creation
$(window).on("load", createTimeblocks);
