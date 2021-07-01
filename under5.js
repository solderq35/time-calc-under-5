function findTotal() {
  var arr = document.getElementsByClassName('amount');
  var barr = document.getElementsByClassName('bonuses');
  var tot = 0;
  var totms = 0;
var totss=0;
  for (var i = 0; i < arr.length; i++) {
    if (parseFloat(arr[i].value))
      tot = (210000 - ((parseFloat(arr[i].value)) * (100000 / ((parseFloat(barr[i].value)))))) * (3 / 400);
  }
  document.getElementById('totalordercost').value = tot;
  totss=Math.floor((((tot%60)%1)*1000));
  //totms=Math.floor(tot/60)+0.1*(tot%60);
  if ((((tot % 60)) > 10 ) && (totss<100) && totss >=10){
document.getElementById('time').innerHTML = Math.floor(tot / 60) + ":" + Math.floor((tot % 60) / 1) + ":" + "0" + Math.floor((((tot % 60) % 1) * 1000));
  }
  if ((((tot % 60)) < 10 ) && (totss<100) && totss >=10){
document.getElementById('time').innerHTML = Math.floor(tot / 60) + ":" + "0" + Math.floor((tot % 60) / 1) + ":" + "0" + Math.floor((((tot % 60) % 1) * 1000));
  }
    if ((((tot % 60)) > 10 ) && (totss<10)){
document.getElementById('time').innerHTML = Math.floor(tot / 60) + ":" + Math.floor((tot % 60) / 1) + ":" + "0" + "0" + Math.floor((((tot % 60) % 1) * 1000));
  }
    if ((((tot % 60)) < 10 ) && (totss<10)){
document.getElementById('time').innerHTML = Math.floor(tot / 60) + ":" + "0" + Math.floor((tot % 60) / 1) + ":" + "0" + "0" + Math.floor((((tot % 60) % 1) * 1000));
  }
    if ((((tot % 60)) > 10 ) && (totss>=100)){
document.getElementById('time').innerHTML = Math.floor(tot / 60) + ":" + Math.floor((tot % 60) / 1) + ":" + Math.floor((((tot % 60) % 1) * 1000));
  }
    if ((((tot % 60)) < 10 ) && (totss>=100)){
document.getElementById('time').innerHTML = Math.floor(tot / 60) + ":" + "0" + Math.floor((tot % 60) / 1) + ":" + Math.floor((((tot % 60) % 1) * 1000));
  }
}
