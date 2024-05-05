function findTime(seconds_input, ms_input, output_div) {
  /*This function reformats the raw time inputs into minutes:seconds:milliseconds form, before printing the results
	to the screen.*/

  if (seconds_input % 60 > 10 && ms_input < 100 && ms_input >= 10) {
    document.getElementById(output_div).innerHTML =
      Math.floor(seconds_input / 60) +
      ":" +
      Math.floor((seconds_input % 60) / 1) +
      ":" +
      "0" +
      ms_input;
  }
  if (seconds_input % 60 < 10 && ms_input < 100 && ms_input >= 10) {
    document.getElementById(output_div).innerHTML =
      Math.floor(seconds_input / 60) +
      ":" +
      "0" +
      Math.floor((seconds_input % 60) / 1) +
      ":" +
      "0" +
      ms_input;
  }
  if (seconds_input % 60 > 10 && ms_input < 10) {
    document.getElementById(output_div).innerHTML =
      Math.floor(seconds_input / 60) +
      ":" +
      Math.floor((seconds_input % 60) / 1) +
      ":" +
      "0" +
      "0" +
      ms_input;
  }
  if (seconds_input % 60 < 10 && ms_input < 10) {
    document.getElementById(output_div).innerHTML =
      Math.floor(seconds_input / 60) +
      ":" +
      "0" +
      Math.floor((seconds_input % 60) / 1) +
      ":" +
      "0" +
      "0" +
      ms_input;
  }
  if (seconds_input % 60 > 10 && ms_input >= 100) {
    document.getElementById(output_div).innerHTML =
      Math.floor(seconds_input / 60) +
      ":" +
      Math.floor((seconds_input % 60) / 1) +
      ":" +
      ms_input;
  }
  if (seconds_input % 60 < 10 && ms_input >= 100) {
    document.getElementById(output_div).innerHTML =
      Math.floor(seconds_input / 60) +
      ":" +
      "0" +
      Math.floor((seconds_input % 60) / 1) +
      ":" +
      ms_input;
  }
}

function findTotal() {
  let score = parseInt(document.getElementById("score").value);
  let debug = document.getElementById("debug");
  console.log(debug.checked);
  // score = parseFloat(score.replace(/,/g, ""));

  const result_array = [];
  // for all 20 possible M values
  for (let i = 1; i <= 20; i++) {
    // base M value multiplier (bonuses and penalties from rating screen)
    let base_M = 5000 * i;

    // base result value (given in seconds:milliseconds. No rounding yet)
    let base_result =
      (parseFloat(210000) - parseFloat((score * 100000) / base_M)) *
      parseFloat(3 / 400);

    // error range (difference between upper bound ("base_result") and lower bound)
    let error_range_result =
      parseFloat((0.5 * 100000) / base_M) * parseFloat(3 / 400);

    // lower bound result value (given in seconds:milliseconds. No rounding yet)
    let lower_bound_result =
      (parseFloat(210000) - parseFloat(((score + 0.5) * 100000) / base_M)) *
      parseFloat(3 / 400);

    // higher bound result value (given in seconds:milliseconds. No rounding yet)
    let higher_bound_result =
      (parseFloat(210000) - parseFloat(((score - 0.5) * 100000) / base_M)) *
      parseFloat(3 / 400);

    // only calculate if the base result value is within bounds of 0 - 5 minutes
    if (base_result > 0 && base_result < 300) {
      let formatted_result = formatTime(base_result).formatted_result;
      let formatted_lower_bound =
        formatTime(lower_bound_result).formatted_result;
      let lower_bound_seconds = formatTime(lower_bound_result).seconds;
      let formatted_higher_bound =
        formatTime(higher_bound_result).formatted_result;
      let higher_bound_seconds = formatTime(higher_bound_result).seconds;
      let error_range_seconds = formatTime(error_range_result).seconds;

      // show 10^-5 seconds (thousandths of a millisecond) for error range delta (plus or minus from original time calc value)
      // all ranges below are the same ms padding logic as in formatTime function, but with *100 for all ranges
      let error_range_milliseconds = Math.floor(
        (error_range_seconds * 100000) % 100000
      );
      let formatted_error_range =
        formatTime(error_range_result).formatted_result;
      if (error_range_milliseconds < 100000) {
        if (error_range_milliseconds < 1000) {
          formatted_error_range = "0.00" + error_range_milliseconds;
        } else if (
          error_range_milliseconds >= 1000 &&
          error_range_milliseconds < 10000
        ) {
          formatted_error_range = "0.0" + error_range_milliseconds;
        } else if (
          error_range_milliseconds >= 10000 &&
          error_range_milliseconds < 100000
        ) {
          formatted_error_range = "0." + error_range_milliseconds;
        }
      }
      let debug_result = `- Original Time Calc: [${formatted_result}](<https://www.google.com/search?q=%28210000+-+%28${parseFloat(
        score
      )}+*+100000+%2F+${base_M}%29%29+*+%283+%2F+400%29>)<n>  - Time Calc Error Range: ([${formatted_lower_bound}](<https://www.google.com/search?q=%28210000+-+%28${parseFloat(
        score + 0.5
      )}+*+100000+%2F+${base_M}%29%29+*+%283+%2F+400%29>), [${formatted_higher_bound}](<https://www.google.com/search?q=%28210000+-+%28${parseFloat(
        score - 0.5
      )}+*+100000+%2F+${base_M}%29%29+*+%283+%2F+400%29>)]<n>  - Margin of Error (Seconds): ± [${formatted_error_range}](<https://www.google.com/search?q=%280.5+*+100000+%2F+${base_M}%29+*+%283+%2F+400%29>)<n>  - M value: ${base_M}`;

      result_array.push(formatted_result);
      if (
        Math.floor(lower_bound_seconds) !== Math.floor(higher_bound_seconds)
      ) {
        let debugCommand = "!debugtime " + score;
        let debugTip =
          "- Potential rounding error detected, for more info check `" +
          debugCommand +
          "`";
        result_array.push(debugTip);
      }
    }
  }

  let msgOutput = result_array.join("<br />");

  // regex for input validation (only numeric input accepted)
  console.log(score);
  let num_hyphen_check = /^[0-9]*$/;
  console.log(num_hyphen_check.test(score));
  console.log(result_array);
  if (
    num_hyphen_check.test(score) == false ||
    score > 210000 ||
    score < 5000 ||
    // if no numbers were returned in range (0 to 5 minutes), it's a bad input
    result_array.length === 0
  ) {
    msgOutput = "Invalid Score :smiling_face_with_3_hearts:";
    let error_output_string = msgOutput.toString();
    document.getElementById("time0").innerHTML = error_output_string;
  } else {
    //console.log(score);
    console.log(msgOutput);
    let base_output_string = msgOutput.toString();
    document.getElementById("time0").innerHTML = base_output_string;
    /*
      for (let i = 0; i < 20; i++) {
        if (result_array[i]) {
          document.getElementById(`time${i}`).innerHTML = String(result_array[i]);
        }
      }
      */
  }
}

function formatTime(base_result) {
  let minutes = Math.floor(base_result / 60);
  let seconds = base_result - minutes * 60;

  // milliseconds we multiply by 1000 and then take remainder after dividing by 1000, to eliminate
  // float division rounding errors
  let milliseconds = Math.floor((seconds * 1000) % 1000);

  // put the minutes / seconds / milliseconds together formatted
  let formatted_result;
  let formatted_seconds;
  let formatted_milliseconds;

  // add one leading zero to seconds digit if there are less than 10 seconds
  if (seconds < 10) {
    formatted_seconds = ":0" + Math.floor(seconds);
  } else {
    formatted_seconds = ":" + Math.floor(seconds);
  }

  // add two leading zeros to milliseconds digit if there are less than 10 milliseconds
  if (milliseconds < 10) {
    formatted_milliseconds = ".00" + (milliseconds % 1000);
  }

  // add one leading zero to milliseconds digit if there are 10 to 99 milliseconds
  else if (milliseconds >= 10 && milliseconds < 100) {
    formatted_milliseconds = ".0" + (milliseconds % 1000);
  } else {
    formatted_milliseconds = "." + (milliseconds % 1000);
  }

  formatted_result = minutes + formatted_seconds + formatted_milliseconds;
  return { seconds, formatted_result };
}

// reference: https://github.com/solderq35/fg-time-calc/blob/main/index.js#L756
function initPage() {
  let queryIndex = window.location.href.indexOf("?");
  let params = window.location.href.substring(queryIndex + 1).split("&");
  console.log(queryIndex);
  console.log(params);
  for (i = 0; i < params.length; i++) {
    param = params[i].split("=");
    console.log(param);
    if (param[0] === "score") {
      let num = param[1];
      console.log(num);
      document.getElementById("score").value = String(num);
    }
  }
}
