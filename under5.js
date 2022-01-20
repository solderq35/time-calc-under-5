function findTime(seconds_input,ms_input,output_div)
{
	/*This function reformats the raw time inputs into minutes:seconds:milliseconds form, before printing the results
	to the screen.*/
	
	if ((((seconds_input % 60)) > 10 ) && (ms_input<100) && ms_input >=10)
	{
		document.getElementById(output_div).innerHTML = Math.floor(seconds_input / 60) + ":" + Math.floor((seconds_input % 60) / 1) + ":" + "0" + ms_input;
	}
	if ((((seconds_input % 60)) < 10 ) && (ms_input<100) && ms_input >=10)
	{
		document.getElementById(output_div).innerHTML = Math.floor(seconds_input / 60) + ":" + "0" + Math.floor((seconds_input % 60) / 1) + ":" + "0" + ms_input;
	}
    if ((((seconds_input % 60)) > 10 ) && (ms_input<10)){
		document.getElementById(output_div).innerHTML = Math.floor(seconds_input / 60) + ":" + Math.floor((seconds_input % 60) / 1) + ":" + "0" + "0" + ms_input;
	}
    if ((((seconds_input % 60)) < 10 ) && (ms_input<10)){
		document.getElementById(output_div).innerHTML = Math.floor(seconds_input / 60) + ":" + "0" + Math.floor((seconds_input % 60) / 1) + ":" + "0" + "0" + ms_input;
	}
    if ((((seconds_input % 60)) > 10 ) && (ms_input>=100)){
		document.getElementById(output_div).innerHTML = Math.floor(seconds_input / 60) + ":" + Math.floor((seconds_input % 60) / 1) + ":" + ms_input;
	}
    if ((((seconds_input % 60)) < 10 ) && (ms_input>=100)){
		document.getElementById(output_div).innerHTML = Math.floor(seconds_input / 60) + ":" + "0" + Math.floor((seconds_input % 60) / 1) + ":" + ms_input;
	}
}



function findTotal() 
{
	/*This function is the overarching function that sets up input/ output arrays, and determines which solutions to show.*/
	
	var score_array = document.getElementsByClassName('score');
	var minutes_array = document.getElementsByClassName('minutes');
	var seconds_array = document.getElementsByClassName('seconds');
	var seconds_input = 0;
	var ms_input=0; // milliseconds output
	var seconds_input_array = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var seconds_input_array_whole = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var output_div_array = ["time", "time2", "time3", "time4", "time5", "time6", "time7", "time8", "time9", "time10", "time11", "time12", "time13", "time14", "time15", "time16", "time17", "time18", "time19", "time20"];
	var ms_input_array = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	
	// This for loop generates an array of the possible seconds input values
	for (var k=0; k <= 19; k++)
	{
		for (var i = 0; i < score_array.length; i++) 
		{
			if (parseFloat(score_array[i].value))
			{
				
				seconds_input_array[k] = (210000 - ((parseInt(score_array[i].value)) * (100000 / parseInt(5000*(k+1))))) * (3 / 400);
				seconds_input_array_whole[k] = ((210000 - ((parseInt(score_array[i].value)) * (100000 / parseInt(5000*(k+1)))))*1000) * (3 / 400);
			}
		}
	}

	// This for loop generates an array of the possible millisecond input values
	document.getElementById('totalordercost').value = seconds_input;
	for (var m =0; m <= 19; m++)
	{
		ms_input_array[m]=Math.floor((seconds_input_array_whole[m])%1000);
	}
	
	for (var i = 0; i < minutes_array.length; i++)
	{
		// For loop to call the findTime function for all possible inputs.
		for (var l = 0; l <= 19; l++)
		{
			findTime(seconds_input_array[l],ms_input_array[l],output_div_array[l]);
		}

		/* Only show the possible calculated solution that is the same or 1 second more
		than the time shown on rating screen (due to possible rounding errors)  */
		for (var n =0; n <= 19; n++)
		{
			if (((Math.floor(parseFloat((minutes_array[i].value)))*60)+parseFloat(seconds_array[i].value)==((Math.floor(seconds_input_array[n])/1)-1)) || ((Math.floor(parseFloat((minutes_array[i].value)))*60)+parseFloat(seconds_array[i].value)==((Math.floor(seconds_input_array[n])/1))) || ((Math.floor(parseFloat((minutes_array[i].value)))*60)+parseFloat(seconds_array[i].value)>0))
			{
				document.getElementById(output_div_array[n]).style.display = "block"; 
			}
		}
		
		/* Do not show the possible calculated solutions that are either less than the time shown on rating
		screeen, or at least 2 seconds more than the time shown on rating screen (due to possible rounding errors)*/
		for (var o =0; o <= 19; o++)
		{
			if (((Math.floor(parseFloat((minutes_array[i].value)))*60)+parseFloat(seconds_array[i].value)<((Math.floor(seconds_input_array[o]))/1)-1) || ((Math.floor(parseFloat((minutes_array[i].value)))*60)+parseFloat(seconds_array[i].value)> ((Math.floor(seconds_input_array[o]))/1)) || ((Math.floor(parseFloat((minutes_array[i].value)))*60)+parseFloat(seconds_array[i].value)<=0))
			{
				document.getElementById(output_div_array[o]).style.display = "none";
			}
		}
	}
}