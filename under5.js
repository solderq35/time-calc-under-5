function findTime(tot,totss,x)
{
  if ((((tot % 60)) > 10 ) && (totss<100) && totss >=10){
document.getElementById(x).innerHTML = Math.floor(tot / 60) + ":" + Math.floor((tot % 60) / 1) + ":" + "0" + totss;
  }
  if ((((tot % 60)) < 10 ) && (totss<100) && totss >=10){
document.getElementById(x).innerHTML = Math.floor(tot / 60) + ":" + "0" + Math.floor((tot % 60) / 1) + ":" + "0" + totss;
  }
    if ((((tot % 60)) > 10 ) && (totss<10)){
document.getElementById(x).innerHTML = Math.floor(tot / 60) + ":" + Math.floor((tot % 60) / 1) + ":" + "0" + "0" + totss;
  }
    if ((((tot % 60)) < 10 ) && (totss<10)){
document.getElementById(x).innerHTML = Math.floor(tot / 60) + ":" + "0" + Math.floor((tot % 60) / 1) + ":" + "0" + "0" + totss;
  }
    if ((((tot % 60)) > 10 ) && (totss>=100)){
document.getElementById(x).innerHTML = Math.floor(tot / 60) + ":" + Math.floor((tot % 60) / 1) + ":" + totss;
  }
    if ((((tot % 60)) < 10 ) && (totss>=100)){
document.getElementById(x).innerHTML = Math.floor(tot / 60) + ":" + "0" + Math.floor((tot % 60) / 1) + ":" + totss;
  }
}



function findTotal() {
  var arr = document.getElementsByClassName('amount');
  var barr = document.getElementsByClassName('stars');
  var tot = 0;
  var tot2=0;
  var tot3=0;
  var tot4=0;
  var totms = 0;
var totss=0;
var totss2=0;
var totss3=0;
var totss4=0;
var stard;

  for (var i = 0; i < arr.length; i++) {
    if (parseFloat(arr[i].value))
      tot = (210000 - ((parseFloat(arr[i].value)) * (100000 / ((parseFloat(barr[i].value))*20000)))) * (3 / 400);
  }
  

  for (var i = 0; i < arr.length; i++) {
    if (parseFloat(arr[i].value))
      tot2 = (210000 - ((parseFloat(arr[i].value)) * (100000 / (((parseFloat(barr[i].value))*20000)+5000)))) * (3 / 400);
  }
  
    for (var i = 0; i < arr.length; i++) {
    if (parseFloat(arr[i].value))
      tot3 = (210000 - ((parseFloat(arr[i].value)) * (100000 / (((parseFloat(barr[i].value))*20000)+10000)))) * (3 / 400);
  }
    for (var i = 0; i < arr.length; i++) {
    if (parseFloat(arr[i].value))
      tot4 = (210000 - ((parseFloat(arr[i].value)) * (100000 / (((parseFloat(barr[i].value))*20000)+15000)))) * (3 / 400);
  }
  document.getElementById('totalordercost').value = tot;
  totss=Math.floor((((tot%60)%1)*1000));
  totss2=Math.floor((((tot2%60)%1)*1000));
  totss3=Math.floor((((tot3%60)%1)*1000));
  totss4=Math.floor((((tot4%60)%1)*1000));
  //totms=Math.floor(tot/60)+0.1*(tot%60);
  for (var i = 0; i < barr.length; i++) {
findTime(tot,totss,'time');
if ((parseFloat(barr[i].value))<5)
{
//window.alert(tot2);
//window.alert(tot4);
findTime(tot2,totss2,'time2');
findTime(tot3,totss3,'time3');
findTime(tot4,totss4,'time4');
}



}
}
