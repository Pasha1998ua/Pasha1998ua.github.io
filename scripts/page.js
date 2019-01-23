var menuFlag = 0;
var inProcessing = 0;
var continueTyping = 1;

var currentArticle = "persInfo";

function intializeSite(){
    document.getElementById("persInfoBtn").classList.toggle("activeBtn");
    setTimeout(() => {
        typingBlockOfLines(document.getElementById("persInfo"));
    }, 300); 
}

function toggleMenu() {
    if(inProcessing === 0){

        inProcessing = 1;
        var menuField = document.getElementsByClassName("menuField")[0];
        var menuBtn = document.getElementsByClassName("menuBtn")[0];

        menuBtn.classList.toggle("change");
        if(menuFlag === 0){ 
            menuField.classList.toggle("changeBckgrnd");
            setTimeout(function(){
                menuField.classList.toggle("showItems");
            },600);
            menuFlag = 1; 
        } else if(menuFlag === 1){
            menuField.classList.toggle("showItems");
            menuField.classList.toggle("changeBckgrnd");
            menuFlag = 0;
        }
        setTimeout(function(){
            inProcessing = 0;
        },600);
    }

}

function toggleArticle(targetArticle){
    if(inProcessing === 0){
        inProcessing = 1;
        continueTyping = 0;
        var articleHolder = document.getElementsByClassName("articleHolder")[0];

        articleHolder.classList.toggle("hideArticle");
        document.getElementById(currentArticle).style.display = "none";
        document.getElementById(currentArticle+"Btn").classList.toggle("activeBtn");
        setTimeout(function(){
            articleHolder.classList.toggle("hideArticle");
            document.getElementById(targetArticle+"Btn").classList.toggle("activeBtn");
        },700);
        setTimeout(function(){
            hidder(document.getElementById(currentArticle));
            document.getElementById(targetArticle).style.display = "block";
            continueTyping = 1;
            typingBlockOfLines(document.getElementById(targetArticle));
            inProcessing = 0;
        },1300);
        currentArticle = targetArticle;
    }
}

function typingBlockOfLines(elem){
    typeLine(elem,1)
}

function typeLine(elem,index){
    var temp = elem.childNodes[index];
    var tempsText = temp.innerHTML;
    typingAnimation(temp);
    temp.classList.toggle("visible");

    index = index + 2;
    if(index < elem.childNodes.length && continueTyping === 1 ){
        setTimeout(() => {
            typeLine(elem,index);
        }, tempsText.length * 30); 
    } else if(continueTyping === 0){
        hidder(elem);
    }
}

function typingAnimation(elem) {
    const text = elem.innerHTML;
    elem.innerHTML = "";

    typeLetter(text,elem,0);
}

function typeLetter(text,elem,index){

    elem.innerHTML = elem.innerHTML.replace("|","") + text.charAt(index) + "|";
    index++;
    if(index < text.length){
        setTimeout(() => {
            typeLetter(text,elem,index);
        }, 30); 
    } else {
        elem.innerHTML = elem.innerHTML.replace("|","")
    }
}

function hidder(elem){
    var elemsChildsArr = elem.childNodes;
        for(var i = 1; i < elemsChildsArr.length; i = i + 2) {
            var elemsChild = elemsChildsArr[i];
            if(elemsChild.classList.contains("visible")){
                elemsChild.classList.remove("visible");
            }
        }
}

