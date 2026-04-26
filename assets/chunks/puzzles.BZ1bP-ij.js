const t="AUTO GENERATED. USE PUZZLE MAKER TO MAKE NEW PUZZLES",e={id:"factorial",code:`const [n] = input();
console.log(n);`,tests:[{input:[1],expects:"1"},{input:[2],expects:"2"},{input:[3],expects:"6"},{input:[4],expects:"24"},{input:[5],expects:"120"},{input:[6],expects:"720"},{input:[10],expects:"3628800"}]},n={id:"prime",code:`const [n] = input();
console.log(n);`,tests:[{input:[1],expects:"false"},{input:[2],expects:"true"},{input:[3],expects:"true"},{input:[5],expects:"true"},{input:[7],expects:"true"},{input:[51],expects:"false"},{input:[343],expects:"false"},{input:[99],expects:"false"},{input:[101],expects:"true"},{input:[12345],expects:"false"}]},p={id:"triangle",code:`const [n] = input();
console.log(n);`,tests:[{input:[1],expects:"*"},{input:[2],expects:`*
**`},{input:[3],expects:`*
**
***`},{input:[4],expects:`*
**
***
****`},{input:[5],expects:`*
**
***
****
*****`},{input:[6],expects:`*
**
***
****
*****
******`},{input:[7],expects:`*
**
***
****
*****
******
*******`},{input:[8],expects:`*
**
***
****
*****
******
*******
********`},{input:[9],expects:`*
**
***
****
*****
******
*******
********
*********`},{input:[10],expects:`*
**
***
****
*****
******
*******
********
*********
**********`}]},s={id:"hypotenuse",code:`const [x, y] = input();
console.log(x, y);`,tests:[{input:[3,4],expects:"5"},{input:[5,12],expects:"13"},{input:[8,15],expects:"17"},{input:[7,24],expects:"25"},{input:[20,21],expects:"29"},{input:[9,40],expects:"41"},{input:[12,35],expects:"37"},{input:[11,60],expects:"61"},{input:[16,63],expects:"65"},{input:[28,45],expects:"53"},{input:[33,56],expects:"65"},{input:[48,55],expects:"73"},{input:[13,84],expects:"85"},{input:[36,77],expects:"85"}]},c={NOTE:t,"add-two-numbers":{id:"add-two-numbers",code:`const [x, y] = input();
console.log(x);`,tests:[{input:[1,2],expects:"3"},{input:[5,7],expects:"12"},{input:[10,15],expects:"25"},{input:[58,69],expects:"127"},{input:[45,2],expects:"47"}]},factorial:e,prime:n,triangle:p,hypotenuse:s};export{c as p};
