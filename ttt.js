var cells=document.querySelectorAll(".items");
var statusText=document.querySelector("#statusText");
var restartBtn=document.querySelector("#restartbtn");
var winConditions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [4,1,7],
    [2,8,5],
    [0,4,8],
    [2,4,6],
];

var options=["","","","","","","","",""];

var currentPlayer="X";
var running =true;

initializeGame();

function initializeGame()
{
    for(var i=0;i<9;i++)
    {
        cells[i].addEventListener("click",cellClicked);
    }
    restartBtn.addEventListener("click",restartGame);
    statusText.innerHTML=currentPlayer+"'s Turn";
}
function cellClicked()
{
    var cellIndex=this.getAttribute("itemIndex");
    if(options[cellIndex]!="" || !running)
    {
        return;
    }
    
    updateCell(this,cellIndex);
    checkWinner();
   
}
function updateCell(cell,index)
{
    options[index]=currentPlayer;
    cell.innerHTML=currentPlayer;
}
function changePlayer()
{
    if(currentPlayer=="X")
    {
        currentPlayer="0";
    }
    else{
        currentPlayer="X";
    }
    statusText.innerHTML=currentPlayer+"'s turn";
}
function checkWinner()
{
    let roundWon=false;
    for(var i=0;i<8;i++)
    {
        let win=winConditions[i];
        let x=options[win[0]];
        let y=options[win[1]];
        let z=options[win[2]];
        if(x=="" || y=="" || z=="")
        {
            continue;
        }
        if(x==y && y==z)
        {
            roundWon=true;
            break;
        }
    }
    if(roundWon)
    {
        statusText.innerHTML=currentPlayer+" Won the game";
        running=false;
    }
    else if(!options.includes(""))
    {
        statusText.innerHTML="Match Draw";
        running=false;
    }
    else{
        changePlayer();
    }
}
function restartGame()
{
    currentPlayer="X";
     options=["","","","","","","","",""];
    statusText.innerHTML="X plays First";
    for(var i=0;i<9;i++)
    {
        cells[i].innerHTML="";
    }
    running=true;
}