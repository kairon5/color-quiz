var submitted = false;
function redTextEventListener(element) {
    element.addEventListener('mouseover',function(){
        element.style.color = 'rgb(212, 23, 23)';
    });
    element.addEventListener('mouseout',function(){
        element.style.color = 'black';
    });
}
function tryagain(tryagainButton) {
    tryagainButton.addEventListener('mousedown',function(){
        document.body.innerHTML = ''; //clear the document body
        submitted = false; //set submitted to false so the event listeners will run
        startit();
    });
}
function showresults(correctanswers,wronganswers,percentcorrect) {
    //create new divs to display the results
    var wordresults = document.createElement('div');
    var percentcorrectShown = document.createElement('div');
    var wronganswersShown = document.createElement('div');
    var correctanswersShown = document.createElement('div');
    var seperator2 = document.createElement('div');
    var tryagainButton = document.createElement('div');

    correctanswersShown.innerHTML = `Correct Answers: ${correctanswers}/8`
    wronganswersShown.innerHTML = `Wrong Answers: ${wronganswers}/8`
    percentcorrectShown.innerHTML = `Percent Correct: ${percentcorrect}`
    wordresults.innerHTML = 'RESULTS';
    tryagainButton.innerHTML = 'Try Again';

    correctanswersShown.style.left = `${window.screen.width/2-250}px`;
    wronganswersShown.style.left = `${window.screen.width/2-250}px`;
    percentcorrectShown.style.left = `${window.screen.width/2-250}px`;
    wordresults.style.left = `${window.screen.width/2-160}px`;
    tryagainButton.style.left = `${window.screen.width/2-170}px`;
    seperator2.style.left = '520px';

    correctanswersShown.style.top = '100px';
    wronganswersShown.style.top = '175px';
    percentcorrectShown.style.top = '250px';
    wordresults.style.top = '35px';
    tryagainButton.style.top = '325px';

    seperator2.style.width = '5px';
    seperator2.style.height = '500px'

    correctanswersShown.classList.add('maintxt');
    wronganswersShown.classList.add('maintxt');
    percentcorrectShown.classList.add('maintxt');
    wordresults.classList.add('maintxt');
    tryagainButton.classList.add('maintxt');
    seperator2.classList.add('seperator');

    redTextEventListener(tryagainButton);
    
    document.body.appendChild(seperator2);
    document.body.appendChild(wordresults);
    document.body.appendChild(tryagainButton);    
    document.body.appendChild(wronganswersShown);
    document.body.appendChild(correctanswersShown);
    document.body.appendChild(percentcorrectShown);   
    
    tryagain(tryagainButton);
}
function calculateResults(buttons) {
    var wronganswers = 0;
    var correctanswers = 0;
    var percentcorrect = 0;
    for(var i = 0;i<buttons.length;i++) {
        var iteratedbutton = buttons[i];
        if(iteratedbutton[1]==true&&iteratedbutton[2]=='clicked') correctanswers+=1;
        if(iteratedbutton[4]==true&&iteratedbutton[5]=='clicked') correctanswers+=1;
        
        if(iteratedbutton[1]==false&&iteratedbutton[2]=='clicked') wronganswers+=1;
        if(iteratedbutton[4]==false&&iteratedbutton[5]=='clicked') wronganswers+=1;
    }
    percentcorrect = `${(correctanswers/buttons.length)*100}%`;
    showresults(correctanswers,wronganswers,percentcorrect);
}
function submitButton(buttons) {
    var submit = document.createElement('div');
    var j = 0;

    submit.innerHTML = 'Submit';
    submit.classList.add('maintxt');
    submit.style.top = '485px';
    submit.style.left = '195px';//change css values
    
    //add event listener for extra styling
    redTextEventListener(submit);

    submit.addEventListener('mousedown',function(){
        for(var i = 0;i<buttons.length;i++) { 
            //this loop validates if the user has answered all questions
            //create a new button because the syntax buttons[i][5] is invalid
            var iteratedbutton = buttons[i];
            if(iteratedbutton[5]=='clicked' || iteratedbutton[2]=='clicked') {
                j+=1;
            }
        } if(j==buttons.length) {
            submit.remove();
            submitted = true;//change the global variable 'submitted' to true
            calculateResults(buttons); 
        } else { 
            var warning = document.createElement('div');
            
            warning.innerHTML = 'You havent answered all questions!'
            warning.classList.add('maintxt');
            warning.style.top='525px';
            warning.style.left='25px'; //create a warning element
            warning.style.color = 'rgb(255,0,0)'
            document.body.appendChild(warning);
            
            setTimeout(function(){ //set a timeout to remove it after 3s
                warning.remove();    
                delete(warning);
            },3000)
            
        }
        //reset the value of j
        j=0;
    });
    document.body.appendChild(submit);
}
function eventListeners(buttons) {
    buttons.forEach(button => {
        var true1 = button[0]; 
        var false1 = button[3];
        /*since 'buttons' is an array of arrays i am defining these buttons in that way
          the first button represents the users first option: "true",
          and the second button represents the users second option: "false".

          quite a lot of information is passed through each 'button'.
          the typical structure looks like this:
            
          [button1,true,'!clicked',button2,false,'!clicked']

          the boolean values adjacent to the buttons were defined earlier,
          and what they do is they serve to tell which button is the correct answer.
          if true is next to button2, then button2 is the correct answer, 
          vice versa.

          the 'clicked' values in index 2 and 5 tell if that button is clicked.
          this is very useful for the event listeners below. 
          if a button is already clicked we dont want it to turn black 
          when the mouse is moved out, etc.
        */

        true1.addEventListener('mouseover',function(){
            //if both buttons arent clicked then change the color to red
            if(button[2]=='!clicked'&&button[5]=='!clicked') {
                true1.style.color='rgb(212, 23, 23)'
            };
        }); 
        true1.addEventListener('mouseout',function(){
            //if the button isnt clicked then change the color to black
            if(button[2]=='!clicked') true1.style.color='rgb(0,0,0)';
        });
        true1.addEventListener('mousedown',function(){
            if(!submitted) {//this is to turn off event listener if answers are submitted
                if(button[2]=='clicked') {
                    button[2]='!clicked';
                    /*change the clicked value if its already clicked.
                    if the user clicks a button twice it will turn black again*/
                    true1.style.color = 'rgb(0,0,0)';
                } else {
                    /*if not then it means they have clicked the opposite button
                    in that case turn the opposite buttons color to red,
                    and this ones to black*/
                    button[2]='clicked';
                    button[5]='!clicked';
                    false1.style.color = 'rgb(0,0,0)';
                    true1.style.color = 'rgb(212, 23, 23)';
                }
            }
        });

        //rinse and repeat for the other button
        false1.addEventListener('mouseover',function(){
            if(button[2]=='!clicked'&&
            button[5]=='!clicked') false1.style.color='rgb(212, 23, 23)';
        }); 
        false1.addEventListener('mouseout',function(){
            if(button[5]=='!clicked') false1.style.color='rgb(0,0,0)';
        });
        false1.addEventListener('mousedown',function(){
            if(!submitted) {
                if(button[5]=='clicked') {
                    button[5]='!clicked'
                    false1.style.color = 'rgb(0,0,0)';
                } else {
                    button[5]='clicked';
                    button[2]='!clicked';
                    true1.style.color = 'rgb(0,0,0)';
                    false1.style.color = 'rgb(212, 23, 23)';
                }
            }
        });
    });
    return buttons;
}
function startit() {
    var presented = [];
    var correct = [];
    var buttons = [];
    var correctAnswers = Math.round(Math.random()*7); 
    for(var i = 0;i<8;i++) {
        //add random rgb values to both arrays
        correct.push([
            Math.round(Math.random()*255),Math.round(Math.random()*255),
            Math.round(Math.random()*255)]);
        presented.push([
            Math.round(Math.random()*255),Math.round(Math.random()*255),
            Math.round(Math.random()*255)]);
    }
   
    //make sure that we have answer variation 
    for(var i = 0;i<correctAnswers;i++) {
        var index = Math.round(Math.random()*7);
        correct[index]=presented[index];
    } 
    for(var i = 0;i<8;i++) {
        //create html elements for everything
        var seperator = document.createElement('div');
        var tru = document.createElement('div');
        var fals = document.createElement('div');
        var pic = document.createElement('div');
        var div = document.createElement('div');
        
        //change the positions of said elements
        seperator.style.top=`${(i+1)*60-5}px`;
        div.style.top=`${i*60+5}px`;
        pic.style.top = `${i*60+5}px`;
        fals.style.top=`${i*60+5}px`;
        tru.style.top=`${i*60+5}px`;
        fals.style.top=`${i*60+5}px`;

        div.style.left='60px';
        tru.style.left = '300px';
        fals.style.left = '380px';
           
        /*change the background color of the pic
          the pic is the circle that is the rgb value presented*/
        pic.style.backgroundColor = `rgb(${correct[i]})`;

        //change the values of the text-based elements
        div.innerHTML = `RGB: ${presented[i]}`;
        fals.innerHTML = 'FALSE';
        tru.innerHTML = 'TRUE';

        //add css classes to all of the divs to make styling easier
        pic.classList.add('pictures');
        div.classList.add('maintxt');
        tru.classList.add('maintxt');
        tru.classList.add('truefalse');
        fals.classList.add('maintxt');
        fals.classList.add('truefalse');
        seperator.classList.add('seperator');

        //append them to the html body
        document.body.appendChild(div);
        document.body.appendChild(pic);
        document.body.appendChild(seperator);
        document.body.appendChild(tru);
        document.body.appendChild(fals);

        /*this will check if the rgb value presented is correct 
          and will later serve to validate(or not) the users input*/
        if(correct[i]==presented[i]) {
            buttons.push([tru,true,'!clicked',fals,false,'!clicked']);
        } else {buttons.push([tru,false,'!clicked',fals,true,'!clicked']);}
    } 
    /*add event listeners to all of the true/false buttons 
      and redifine the buttons array*/
    buttons = eventListeners(buttons);
    submitButton(buttons);
}
//fetch the starting button
var start = document.getElementById('start');

//change fontsize
start.style.fontSize = '40px';
//center it
start.style.top = `${window.screen.height/2-40}px`;
start.style.left = `${window.screen.width/2-40}px`;

/*add event listeners to change the color if
  the mouse is over the button*/
redTextEventListener(start);
start.addEventListener('mousedown',function(){
    //if it is clicked on delete it and run the start function
    start.remove();
    startit();
});