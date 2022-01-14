function findTime(seconds_input,ms_input,x)
{
	if ((((seconds_input % 60)) > 10 ) && (ms_input<100) && ms_input >=10)
	{
		document.getElementById(x).innerHTML = Math.floor(seconds_input / 60) + ":" + Math.floor((seconds_input % 60) / 1) + ":" + "0" + ms_input;
	}
	if ((((seconds_input % 60)) < 10 ) && (ms_input<100) && ms_input >=10){
		document.getElementById(x).innerHTML = Math.floor(seconds_input / 60) + ":" + "0" + Math.floor((seconds_input % 60) / 1) + ":" + "0" + ms_input;
	}
    if ((((seconds_input % 60)) > 10 ) && (ms_input<10)){
		document.getElementById(x).innerHTML = Math.floor(seconds_input / 60) + ":" + Math.floor((seconds_input % 60) / 1) + ":" + "0" + "0" + ms_input;
	}
    if ((((seconds_input % 60)) < 10 ) && (ms_input<10)){
		document.getElementById(x).innerHTML = Math.floor(seconds_input / 60) + ":" + "0" + Math.floor((seconds_input % 60) / 1) + ":" + "0" + "0" + ms_input;
	}
    if ((((seconds_input % 60)) > 10 ) && (ms_input>=100)){
		document.getElementById(x).innerHTML = Math.floor(seconds_input / 60) + ":" + Math.floor((seconds_input % 60) / 1) + ":" + ms_input;
	}
    if ((((seconds_input % 60)) < 10 ) && (ms_input>=100)){
		document.getElementById(x).innerHTML = Math.floor(seconds_input / 60) + ":" + "0" + Math.floor((seconds_input % 60) / 1) + ":" + ms_input;
	}
}



function findTotal() 
{
	var scoreunder5 = document.getElementsByClassName('scoreunder5');
	var scoreover5 = document.getElementsByClassName('scoreover5');
	var seconds_input = 0;
	var seconds_input2=0;
	var ms_input=0;
	var ms_input2=0;

	for (var i = 0; i < scoreunder5.length; i++) 
	{
		if (parseFloat(scoreunder5[i].value))
			seconds_input = (210000 - ((parseFloat(scoreunder5[i].value)) * (100000 / (100000)))) * (3 / 400);
		}
  

  for (var i = 0; i < scoreover5.length; i++) 
  {
		if (parseFloat(scoreover5[i].value))
			seconds_input2 = (175000 - ((parseFloat(scoreover5[i].value)) * (100000 / ((100000))))) * (3 / 50);
  }
  
   
  document.getElementById('totalordercost').value = seconds_input;
  ms_input=Math.floor((((seconds_input%60)%1)*1000));
  ms_input2=Math.floor((((seconds_input2%60)%1)*1000));

  for (var i = 0; i < scoreunder5.length; i++) 
  {
	  		if (seconds_input > 0)
			{
			document.getElementById('time').style.display = "block";
			findTime(seconds_input,ms_input,'time');
			}
			if (seconds_input2 > 0)
			{
			document.getElementById('time2').style.display = "block";
			findTime(seconds_input2,ms_input2,'time2');
			}
			if (seconds_input <= 0)
			{
				document.getElementById('time').style.display = "none";
			}
			if (seconds_input2 <= 0)
			{
				document.getElementById('time2').style.display = "none";
			}
	}
}