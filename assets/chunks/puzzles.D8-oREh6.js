const n={id:"factorial",code:`const [n] = input().map(Number);
console.log(n);`,tests:[{input:["1"],expects:"1"},{input:["2"],expects:"2"},{input:["3"],expects:"6"},{input:["4"],expects:"24"},{input:["5"],expects:"120"},{input:["6"],expects:"720"},{input:["10"],expects:"3628800"}]},t={id:"prime",code:`const [n] = input().map(Number);
console.log(n);`,tests:[{input:["1"],expects:"false"},{input:["2"],expects:"true"},{input:["3"],expects:"true"},{input:["5"],expects:"true"},{input:["7"],expects:"true"},{input:["51"],expects:"false"},{input:["343"],expects:"false"},{input:["99"],expects:"false"},{input:["101"],expects:"true"},{input:["12345"],expects:"false"}]},e={id:"triangle",code:`const [n] = input().map(Number);
console.log(n);`,tests:[{input:["1"],expects:"*"},{input:["2"],expects:`*
**`},{input:["3"],expects:`*
**
***`},{input:["4"],expects:`*
**
***
****`},{input:["5"],expects:`*
**
***
****
*****`},{input:["6"],expects:`*
**
***
****
*****
******`},{input:["7"],expects:`*
**
***
****
*****
******
*******`},{input:["8"],expects:`*
**
***
****
*****
******
*******
********`},{input:["9"],expects:`*
**
***
****
*****
******
*******
********
*********`},{input:["10"],expects:`*
**
***
****
*****
******
*******
********
*********
**********`}]},p={id:"hypotenuse",code:`const [x, y] = input().map(Number);
console.log(x, y);`,tests:[{input:["3","4"],expects:"5"},{input:["5","12"],expects:"13"},{input:["8","15"],expects:"17"},{input:["7","24"],expects:"25"},{input:["20","21"],expects:"29"},{input:["9","40"],expects:"41"},{input:["12","35"],expects:"37"},{input:["11","60"],expects:"61"},{input:["16","63"],expects:"65"},{input:["28","45"],expects:"53"},{input:["33","56"],expects:"65"},{input:["48","55"],expects:"73"},{input:["13","84"],expects:"85"},{input:["36","77"],expects:"85"}]},s={id:"fibonacci",code:`const [n] = input().map(Number);
console.log(n);`,tests:[{input:["1"],expects:"0"},{input:["2"],expects:"1"},{input:["3"],expects:"1"},{input:["8"],expects:"13"},{input:["35"],expects:"5702887"},{input:["96"],expects:"31940434634990099905"},{input:["98"],expects:"83621143489848422977"},{input:["99"],expects:"135301852344706746049"},{input:["100"],expects:"218922995834555169026"},{input:["116"],expects:"483162952612010163284885"},{input:["119"],expects:"2046711111473984623691759"},{input:["120"],expects:"3311648143516982017180081"},{input:["121"],expects:"5358359254990966640871840"},{input:["122"],expects:"8670007398507948658051921"}]},c={id:"square",code:`const inputs = input();
const s = Number(inputs.shift());
const [tb, lr] = inputs;

console.log(s, tb, lr);`,tests:[{input:["1","~","~"],expects:"~"},{input:["2","-","X"],expects:`--
--`},{input:["3","=","|"],expects:`===
| |
===`},{input:["5",".",","],expects:`.....
,   ,
,   ,
,   ,
.....`},{input:["8","^","l"],expects:`^^^^^^^^
l      l
l      l
l      l
l      l
l      l
l      l
^^^^^^^^`},{input:["10","_","<"],expects:`__________
<        <
<        <
<        <
<        <
<        <
<        <
<        <
<        <
__________`},{input:["12",":",";"],expects:`::::::::::::
;          ;
;          ;
;          ;
;          ;
;          ;
;          ;
;          ;
;          ;
;          ;
;          ;
::::::::::::`},{input:["14","<","3"],expects:`<<<<<<<<<<<<<<
3            3
3            3
3            3
3            3
3            3
3            3
3            3
3            3
3            3
3            3
3            3
3            3
<<<<<<<<<<<<<<`},{input:["16","+","1"],expects:`++++++++++++++++
1              1
1              1
1              1
1              1
1              1
1              1
1              1
1              1
1              1
1              1
1              1
1              1
1              1
1              1
++++++++++++++++`},{input:["18","<",">"],expects:`<<<<<<<<<<<<<<<<<<
>                >
>                >
>                >
>                >
>                >
>                >
>                >
>                >
>                >
>                >
>                >
>                >
>                >
>                >
>                >
>                >
<<<<<<<<<<<<<<<<<<`}]},u={"add-two-numbers":{id:"sum",code:`const [x, y] = input().map(Number);
console.log(x, y);`,tests:[{input:["1","2"],expects:"3"},{input:["5","7"],expects:"12"},{input:["10","15"],expects:"25"},{input:["58","69"],expects:"127"},{input:["45","2"],expects:"47"}]},factorial:n,prime:t,triangle:e,hypotenuse:p,fibonacci:s,square:c};export{u as p};
