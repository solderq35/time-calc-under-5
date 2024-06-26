// See pageFlag variable (will either be 'index' or 'over5') for different behavior for index.html vs over5.html pages
// pageFlag variable is an input of findTotal() and initPage() functions

function findTotal(pageFlag) {
  let over5Flag = false;
  if (pageFlag === "over5") {
    over5Flag = true;
  }
  const baseScore = over5Flag ? 175000 : 210000;
  const baseDivisor = over5Flag ? 50 : 400;
  const lowerTimeBound = over5Flag ? 300 : 0;
  const higherTimeBound = over5Flag ? 1500 : 300;
  let score = parseFloat(
    document.getElementById("score").value.replace(/,/g, "")
  );
  let debugState = document.getElementById("debugCheckbox").checked;
  let resultCounter = 0;

  const result_array = [];
  // for all 20 possible M values
  for (let i = 1; i <= 20; i++) {
    // base M value multiplier (bonuses and penalties from rating screen)
    let base_M = 5000 * i;

    // base result value (given in seconds:milliseconds. No rounding yet)
    let base_result =
      (baseScore - parseInt(score) * (100000 / parseInt(base_M))) *
      1000 *
      (3 / baseDivisor);

    // error range (difference between upper bound ("base_result") and lower bound)
    let error_range_result =
      0.5 * (100000 / parseInt(base_M)) * 100000 * (3 / baseDivisor);

    // lower bound result value (given in seconds:milliseconds. No rounding yet)
    let lower_bound_result =
      (baseScore - (parseInt(score) + 0.5) * (100000 / parseInt(base_M))) *
      1000 *
      (3 / baseDivisor);

    // higher bound result value (given in seconds:milliseconds. No rounding yet)
    let higher_bound_result =
      (baseScore - (parseInt(score) - 0.5) * (100000 / parseInt(base_M))) *
      1000 *
      (3 / baseDivisor);

    // only calculate if the base result value is within bounds of possible values
    if (
      base_result >= lowerTimeBound * 1000 &&
      base_result < higherTimeBound * 1000
    ) {
      let formatted_result = formatTime(base_result).formatted_result;
      let formatted_lower_bound =
        formatTime(lower_bound_result).formatted_result;
      let lower_bound_seconds = formatTime(lower_bound_result).seconds;
      let formatted_higher_bound =
        formatTime(higher_bound_result).formatted_result;
      let higher_bound_seconds = formatTime(higher_bound_result).seconds;

      // show 10^-5 seconds (thousandths of a millisecond) for error range delta (plus or minus from original time calc value)
      // all ranges below are the same ms padding logic as in formatTime function, but with *100 for all ranges
      let error_range_milliseconds = Math.floor(error_range_result % 100000);
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

      // Exact string from timmy bot for future reference, use functions above to transform to properly nested html
      // bullets + link support.
      const markdownString = `- Original Time Calc: [${formatted_result}](<https://www.google.com/search?q=%28${baseScore}+-+%28${parseFloat(
        score
      )}+*+100000+%2F+${base_M}%29%29+*+%283+%2F+${baseDivisor}%29>)\n  - Time Calc Error Range: ([${formatted_lower_bound}](<https://www.google.com/search?q=%28${baseScore}+-+%28${parseFloat(
        score + 0.5
      )}+*+100000+%2F+${base_M}%29%29+*+%283+%2F+${baseDivisor}%29>), [${formatted_higher_bound}](<https://www.google.com/search?q=%28${baseScore}+-+%28${parseFloat(
        score - 0.5
      )}+*+100000+%2F+${base_M}%29%29+*+%283+%2F+${baseDivisor}%29>)]\n  - Margin of Error (Seconds): ± [${formatted_error_range}](<https://www.google.com/search?q=%280.5+*+100000+%2F+${base_M}%29+*+%283+%2F+${baseDivisor}%29>)\n  - M value: ${base_M}`;

      const htmlOutput = markdownToHtml(
        markdownLinkRegex(discordLinkRegex(markdownString)),
        resultCounter
      );

      let debug_result = htmlOutput;

      if (!debugState) {
        result_array.push(formatted_result);
        if (
          Math.floor(lower_bound_seconds) !== Math.floor(higher_bound_seconds)
        ) {
          let debugTip = `<ul style="margin-top: 0; margin-bottom: 0;"><li>Potential rounding error detected, for more info click the <b>Debug Mode</b> checkbox</li></ul>`;
          result_array.push(debugTip);
        }
      } else if (debugState) {
        result_array.push(debug_result);
      }
      resultCounter += 1; // only increment for results in range (0 to 5 minutes)
    }
  }

  let msgOutput = "";
  for (let i = 0; i < result_array.length; i++) {
    if (debugState || (!debugState && result_array[i].includes("<ul"))) {
      msgOutput += result_array[i];
    } else {
      msgOutput += result_array[i] + "<br />";
    }
  }

  // regex for input validation (only numeric input accepted)
  let num_hyphen_check = /^[0-9]*$/;
  if (
    (num_hyphen_check.test(score) == false ||
      score > baseScore ||
      score < 5000 ||
      // if no numbers were returned in range (0 to 5 minutes), it's a bad input
      result_array.length === 0) &&
    score
  ) {
    // may show up as weird characters on aws 3 test build: https://stackoverflow.com/questions/22403071/text-files-uploaded-to-s3-are-encoded-strangely
    msgOutput = "Invalid Score 🥰";
    let error_output_string = msgOutput.toString();
    document.getElementById("time0").innerHTML = error_output_string;
  } else {
    let base_output_string = msgOutput.toString();
    if (debugState) {
      let debugInfo =
        "M value = Completed SA bonuses (20k each) minus nontarget kills (5k each).<br />For more info, see below: <b>More Info on Time Calculation</b>";
      base_output_string += debugInfo;
    }
    document.getElementById("time0").innerHTML = base_output_string;
  }
}

function formatTime(base_result) {
  // let minutes = Math.floor(base_result / (60 * 1000));
  let base_seconds = Math.floor(base_result / 1000);
  let minutes = Math.floor(base_seconds / 60);
  let seconds = Math.floor(base_seconds % 60);

  // milliseconds we multiply by 1000 and then take remainder after dividing by 1000, to eliminate
  // float division rounding errors
  let milliseconds = Math.floor(base_result % 1000);

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

function discordLinkRegex(markdown) {
  const linkRegex = /\[([^\]]+)\]\(<([^>]+)>\)/g; // Regex for matching Markdown links with <>
  return markdown.replace(linkRegex, '<a href="$2">$1</a>');
}
function markdownLinkRegex(markdown) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g; // Regex for matching Markdown links
  return markdown.replace(linkRegex, '<a href="$2">$1</a>');
}
function markdownToHtml(markdown, resultCounter) {
  const lines = markdown.split("\n");
  let html = "";
  let currentIndent = 0;

  lines.forEach((line) => {
    const indent = line.search(/\S/);
    if (indent === -1) return; // Skip empty lines
    const bulletCount = Math.floor(indent / 2) + 1;
    const content = line.trim().substring(bulletCount * 2 - indent);
    if (indent === 0) {
      if (resultCounter === 0) {
        html += '<ul style="margin-top: 0; margin-bottom: 0;">';
      } else if (resultCounter > 0) {
        html += '<ul style="margin-top: 20px; margin-bottom: 0;">';
      }
    }
    if (indent > currentIndent) {
      html += '<ul style="margin-top: 0; margin-bottom: 0;">';
    } else if (indent < currentIndent) {
      html += "</ul>".repeat((currentIndent - indent) / 2);
    }
    if (indent === 0) {
      currentIndent = indent;
      html += `<li>${content}</li>`;
    } else {
      currentIndent = indent;
      html += `<li>${content}</li>`;
    }
  });
  html += "</ul>";
  html += "</ul>".repeat(currentIndent / 2); // Close any remaining unordered lists

  return html;
}

// reference: https://github.com/solderq35/fg-time-calc/blob/main/index.js#L756
function initPage(pageFlag) {
  let over5Flag = false;
  if (pageFlag === "over5") {
    over5Flag = true;
  }
  const currentPage = over5Flag ? "over5" : "index";
  const otherPage = over5Flag ? "index" : "over5";
  const titleHeaderText = over5Flag
    ? "HITMAN Milliseconds Time Calculator (5 to 15 Minutes)"
    : "HITMAN Milliseconds Time Calculator (Under 5 Minutes)";
  const otherPageLinkText = over5Flag
    ? "Calculator for Runs of Under 5 Minutes"
    : "Calculator for Runs of 5 to 15 Minutes";

  // Initialize any differing HTML elements for "Under 5 (index)" vs "5 to 15 Minutes (over5)" pages
  document.title = titleHeaderText;
  document.getElementById("titleHeader").textContent = titleHeaderText;
  document.getElementById("otherPage").text = otherPageLinkText;

  let queryIndex = window.location.href.indexOf("?");
  let currentPageIndex = window.location.href.indexOf(currentPage);
  let htmlIndex = window.location.href.indexOf(".html");
  let httpsIndex = window.location.href.indexOf("https");
  let params = window.location.href.substring(queryIndex + 1).split("&");
  let baseUrl = "";
  if (currentPageIndex < 0) {
    if (queryIndex < 0) {
      baseUrl = window.location.href;
    } else {
      baseUrl = window.location.href.substring(0, queryIndex);
    }
  } else {
    baseUrl = window.location.href.substring(0, currentPageIndex);
  }

  if (htmlIndex < 0 && httpsIndex >= 0) {
    // If ("https" in URL) + (no ".html" in URL) + (over5Flag is true), then set "otherPage" link to point to index ("/")
    document.getElementById("otherPage").href = over5Flag
      ? baseUrl
      : baseUrl + otherPage;
  } else {
    // If (no "https" in URL) or (no ".html" in URL), then enforce ".html" file extension in "otherPage" links
    // Intended to handle local dev / preview s3 use cases
    document.getElementById("otherPage").href = baseUrl + otherPage + ".html";

    // for context, current s3 test deployment URL is one of these 2:
    // http://time-calc-under-5.s3-website-us-west-2.amazonaws.com/
    // https://time-calc-under-5.s3.us-west-2.amazonaws.com/index.html
  }

  for (i = 0; i < params.length; i++) {
    param = params[i].split("=");
    if (param[0] === "score") {
      let num = param[1];
      document.getElementById("score").value = String(num);
    }
    if (param[0] === "debugmode") {
      document.getElementById("debugCheckbox").checked = true;
    }
  }
}

function clearFields() {
  document.getElementById("score").value = "";
  document.getElementById("debugCheckbox").checked = false;
  findTotal();
}

function saveData() {
  let score = parseFloat(
    document.getElementById("score").value.replace(/,/g, "")
  );
  let debugState = document.getElementById("debugCheckbox").checked;
  let baseUrl = "";
  // reference for queryindex / baseUrl: https://github.com/solderq35/fg-time-calc/blob/main/index.js#L759
  let queryIndex = window.location.href.indexOf("?");
  if (queryIndex < 0) {
    baseUrl = window.location.href;
  } else {
    baseUrl = window.location.href.substring(0, queryIndex);
  }
  let finalUrl = baseUrl;
  let params = [];
  if (score) {
    params.push(`score=${score}`);
  }
  if (debugState) {
    params.push("debugmode");
  }
  for (let i = 0; i < params.length; i++) {
    if (i === 0) {
      finalUrl += "?" + params[i];
    } else {
      finalUrl += "&" + params[i];
    }
  }

  // Reference (cross platform clipboard copy): https://stackoverflow.com/a/71985515
  const element = document.createElement("textarea");
  element.value = finalUrl;
  document.body.appendChild(element);
  element.select();
  document.execCommand("copy");
  document.body.removeChild(element);
  alert(`📋Copied to Clipboard: ${finalUrl}`);
}
