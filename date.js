module.exports.getdate = getDate;

function getDate(){
  let today = new Date();
  let options = {
    weekday : "long",
    day: "numeric",
    month: "long"
  };
  let day = today.toLocaleDateString("en-US", options);
  return day;
}

module.exports.getDay = getDay;
function getDay(){
  let today = new Date();
  let options = {
    weekday : "long"
  };
  let day = today.toLocaleDateString("en-US", options);
  return day;
}
//simpler way to do everything above
exports.getdateSame = function(){
  let today = new Date();
  let options = {
    weekday : "long",
    day: "numeric",
    month: "long"
  };
  let day = today.toLocaleDateString("en-US", options);
  return day;
}

exports.getDaySame = function(){
  let today = new Date();
  let options = {
    weekday : "long"
  };
  let day = today.toLocaleDateString("en-US", options);
  return day;
}
