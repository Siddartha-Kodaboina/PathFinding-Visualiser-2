function randInt(max) {
    return Math.floor(Math.random() * Math.floor(max))+1;
}
function Board() {
    this.height = 13;
    this.width = 17;
    this.nodesToAnimate=[];
}
Board.prototype.createGrid=function(){
    let tableHTML = "",secondTableHTML="";
    console.log("started");
    for (let r = 0; r <=this.height ; r++) {
        let currentHTMLRow = `<tr id="row ${r}">`;
        let secondCurrentHTMLRow = `<tr id="row ${r}">`;
        for (let c = 0; c <= this.width; c++) {
            let newNodeId = `${r}-${c}`;
            let newData=randInt(9);
            currentHTMLRow += `<td id="${newNodeId}">${newData}</td>`;
            secondCurrentHTMLRow+=`<td id="1-${newNodeId}">${newData}</td>`;
        }
        tableHTML += `${currentHTMLRow}</tr>`;
        secondTableHTML+=`${secondCurrentHTMLRow}</tr>`;
    }
    let board = document.getElementById("board");
    board.innerHTML = tableHTML;
    board = document.getElementById("board1");
    board.innerHTML = secondTableHTML;
    console.log("completed");
}

Board.prototype.OxO_to_NxN=function(){
    let delay=0;
    for(let i=0;i<=this.height;i++){
        for(let j=0;j<=this.width;j++){
            document.getElementById(`${i}-${j}`).style.animation=`visitedPathAnimation 2s ease-in-out ${delay}ms forwards`;
            delay+=10;
            if(i==0 && j==0) {

            }
            else if(i==0) {
                let previous=document.getElementById(`1-${i}-${j-1}`);
                let cur=document.getElementById(`1-${i}-${j}`);
                cur.innerText=parseInt(cur.innerText)+parseInt(previous.innerText);
            }
            else if(j==0){
                let previous=document.getElementById(`1-${i-1}-${j}`);
                let cur=document.getElementById(`1-${i}-${j}`);
                cur.innerText=parseInt(cur.innerText)+parseInt(previous.innerText);
            }
            else{
                let prevRow=document.getElementById(`1-${i-1}-${j}`);
                let prevCol=document.getElementById(`1-${i}-${j-1}`);
                let cur=document.getElementById(`1-${i}-${j}`);
                cur.innerText=parseInt(cur.innerText)+Math.min(parseInt(prevCol.innerText),parseInt(prevRow.innerText));
            }
        }
    }
    this.nodesToAnimate.push(`${this.height}-${this.width}`);
    let curCol=this.width,curRow=this.height;
    while(!(curCol==0 && curRow==0)){
        if(curRow==0){
            this.nodesToAnimate.push(`${curRow}-${curCol-1}`);
            curCol=curCol-1;
        }else if(curCol==0){
            this.nodesToAnimate.push(`${curRow-1}-${curCol}`);
            curRow=curRow-1;
        }else{
            let prevRow=document.getElementById(`1-${curRow-1}-${curCol}`);
            let prevCol=document.getElementById(`1-${curRow}-${curCol-1}`);
            if(parseInt(prevCol.innerText)<parseInt(prevRow.innerText)){
                this.nodesToAnimate.push(`${curRow}-${curCol-1}`);
                curCol=curCol-1;
            }else{
                this.nodesToAnimate.push(`${curRow-1}-${curCol}`);
                curRow=curRow-1;
            }
        }
    }
    this.nodesToAnimate.reverse();
    setTimeout(()=>{
        delay=0;
        for(var x of this.nodesToAnimate) {
            let k=document.getElementById(`${x}`);
            let k1=document.getElementById(`1-${x}`);
            /*if(k.className!="start" && k.className!="target")*/
            
            k.style.animation=`shortestPathAnimation 2s ease-in-out ${delay}ms forwards`;
            k1.style.animation=`shortestPathAnimation 2s ease-in-out ${delay}ms forwards`;
            delay+=150;
            console.log(x,k.className);
        }
    },delay+100);
    
    console.log(this.nodesToAnimate.length);
}
let newBoard=new Board();
newBoard.createGrid();
document.getElementById("changer").onclick=function(){
    newBoard.OxO_to_NxN();
};
document.getElementById("create").onclick=function(){
    newBoard.nodesToAnimate=[];
    newBoard.createGrid();
};