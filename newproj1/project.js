const prompt = require("prompt-sync")();

const ROWS = 3;
const COLUMNS = 3;

const SYMBOLS_COUNT = {
    "A":2,
    "B":4,
    "C":6,
    "D":8
}

const SYMBOL_VALUES = {
    "A":5,
    "B":4,
    "C":3,
    "D":2
}

const deposit = () => {
    while(true) {
        const depositAmt = prompt("Enter the deposit amount: ");
        const NumberDepositAmt = parseFloat(depositAmt);
        if(isNaN(NumberDepositAmt) || NumberDepositAmt <= 0){
            console.log("Invalid deposit amount");
        } else {
            return NumberDepositAmt; 
        }
    }
}

const noOfLines = () => {
    while(true) {
        const lines = prompt("Enter the no of lines to be bet on (1-3): ");
        const NumberOfLines = parseInt(lines);
        if(isNaN(NumberOfLines) || NumberOfLines < 1 || NumberOfLines > 3) {
            console.log("Invalid number of lines");
        } else {
            return NumberOfLines; 
        }
    }
}
const Bet = (NoOfLines,depositAmt) => {
    while(true) {
        const bet = prompt("Enter the bet per line: ");
        const NumberBet = parseFloat(bet);
        if(isNaN(NumberBet) || NumberBet <=0 || NumberBet > depositAmt*NoOfLines) {
            console.log("Invalid number of bet:");
        } else {
            return NumberBet; 
        }
    }
}
const Spin = () =>{
    const symbols = [];
    for(const[symbol,count] of Object.entries(SYMBOLS_COUNT)){
        for(let i = 0;i<count;i++){
            //console.log(symbol+" "+count);
            symbols.push(symbol);
        }
    }

const reels = [[] ,[],[]];
for(let i=0;i<ROWS;i++){
    let reelsymbol = [...symbols];
    for(let j=0;j<COLUMNS;j++){
        const randomIndex = Math.floor(Math.random()*reelsymbol.length);
        const element = reelsymbol[randomIndex];
        reels[i].push(element);
        reelsymbol.splice(randomIndex,1);
    }
}
return reels;
}
const traverse = (reels) =>{
    const rows = [];
    for(let i = 0;i<ROWS;i++){
     rows.push([]);
     for(let j =0;j<COLUMNS;j++){
         rows[i].push(reels[j][i]);
     }
    }
    return rows;
 }
 const printRows = (rows) =>{
    for(const row of rows){
        let rowString="";
        for(const[i,symbol] of row.entries()){
             rowString+=symbol;
             if(i!=row.length-1){
                rowString+=" |";
             }
        }
        console.log(rowString);
    }
 }

 const getwinnings = (NoOfLines,bet,rows) =>{
    let winnings = 0;
   for(let  i= 0;i<NoOfLines;i++){
    const symbols = rows[i];
    let allsame = true;
      for(const symbol of symbols){
         if(symbol!=symbols[0]){
              allsame = false;
              break;
         }
      }
      if(allsame){
        winnings+=bet*SYMBOL_VALUES[symbols[0]];
       }
   }
   return winnings;
 }

 const game = () =>{
let depositAmt = deposit();
while(true){
    console.log("You have balance $",depositAmt);
const NoOfLines = noOfLines();
const bet = Bet(depositAmt,NoOfLines);
depositAmt-=NoOfLines*bet;
const result = Spin();
const traversed = traverse(result);
printRows(traversed);
const winnings = getwinnings(NoOfLines,bet,traversed);
depositAmt+=winnings;
// console.log("The traversed reel",traversed);
// console.log("The reel is",result);
// console.log("Deposit Amount:", depositAmt);
// console.log("Number of Lines:", NoOfLines);
// console.log("Number of Bet:", bet);
console.log("You have won $",winnings);
if(depositAmt<=0){
    console.log("you ran out of money");
    break;
}
const play = prompt("Do you want to play again (Y/N)");
if(play!="Y"){
    break;
}
}
 }
game();
