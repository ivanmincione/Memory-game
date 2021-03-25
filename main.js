var em = ["💐","🌹","🌻","🏵️","🌺","🌴","🌈","🍓","🍒","🍎","🍉","🍊","🥭","🍍","🍋","🍏","🍐","🥝","🍇","🥥","🍅","🌶️","🍄","🧅","🥦","🥑","🍔","🍕","🧁","🎂","🍬","🍩","🍫","🎈"];
//ramdom position
var tmp, c, p = em.length;
if(p) while(--p) {
   c = Math.floor(Math.random() * (p + 1));
   tmp = em[c];
   em[c] = em[p];
   em[p] = tmp;
}

//Variables
var pre="", pID, ppID=0, turn=0, t="transform", flip="rotateY(180deg)", flipBack="rotateY(0deg)", time, mode;

//Screen resize
window.onresize = innit;
function innit() {
   W = innerWidth;
   H = innerHeight;
   $('body').height(H+"px");
   $('#ol').height(H+"px");
}

//Welcome screen!!
window.onload = function() {
    $("#ol").html(`<center><div id="inst"><h3>BENVENUTO IN MEMORY GAME !</h3>

    <p style="font-size:18px; margin-bottom: 10px;">Scegli il livello di difficoltà...</p></div>

    <button onclick="start(3, 4)">3 x 4</button>
     <button onclick="start(4, 4)" style="w">4 x 4</button>
      <button onclick="start(4, 5)">4 x 5</button>
       <button onclick="start(5, 6)">5 x 6</button>
        <button onclick="start(6, 6)">6 x 6</button></center>`);
}

//Start game
function start(r,l) {
    //Timer and moves
    min=0, sec=0, moves=0;
    $("#time").html("Time: 00:00");
    $("#moves").html("Moves: 0");
    time = setInterval(function() {
      sec++;
      if(sec==60) {
          min++; sec=0;
      }
      if(sec<10)
          $("#time").html("Time: 0"+min+":0"+sec);
      else
        $("#time").html("Time: 0"+min+":"+sec);
    }, 1000);
    rem=r*l/2, noItems=rem;
    mode = r+"x"+l;
    //Generate item array and randomize it
    var items = [];
    for (var i=0;i<noItems;i++)
        items.push(em[i]);
    for (var i=0;i<noItems;i++)
        items.push(em[i]);
    var tmp, c, p = items.length;
    if(p) while(--p) {
        c = Math.floor(Math.random() * (p + 1));
        tmp = items[c];
        items[c] = items[p];
        items[p] = tmp;
    }

    //Creating table
    $("table").html("");
    var n=1;
    for (var i = 1;i<=r;i++) {
        $("table").append("<tr>");
        for (var j = 1;j<=l;j++) {
           $("table").append(`<td id='${n}' onclick="change(${n})"><div class='inner'><div class='front'></div><div class='back'><p>${items[n-1]}</p></div></div></td>`);
           n++;
         }
         $("table").append("</tr>");
    }

    //Hiding welcome screen
    $("#ol").fadeOut(500);
}

//Function for flipping blocks
function change(x) {
  //Variables
  let i = "#"+x+" .inner";
  let f = "#"+x+" .inner .front";
  let b = "#"+x+" .inner .back";

  //Dont flip for these conditions
  if (turn==2 || $(i).attr("flip")=="block" || ppID==x) {}

  //Flip
  else {
    $(i).css(t, flip);
    if (turn==1) {
      //This value will prevent spam clicking
      turn=2;

      //If blocks are not same
      if (pre!=$(b).text()) {
         setTimeout(function() {
            $(pID).css(t, flipBack);
            $(i).css(t, flipBack);
            ppID=0;
         },1000);
      }

      //If blocks are same
      else {
          rem--;
          $(i).attr("flip", "block");
          $(pID).attr("flip", "block");
      }

      setTimeout(function() {
         turn=0;
         //Increase moves
         moves++;
         $("#moves").html("Moves: "+moves);
     },1000);

    }
    else {
      pre = $(b).text();
      ppID = x;
      pID = "#"+x+" .inner";
      turn=1;
    }

    //If all pairs are matched
    if (rem==0) {
          clearInterval(time);
          setTimeout(function() {
              $("#ol").html(`<center><div id="iol"><h2>OTTIMO!</h2>
              <p style="font-size:23px;padding:10px;">Hai completato la griglia ${mode} in ${moves} mosse.<br/>
              Hai impiegato ${min} minuto(i) e ${sec} secondi(o).</p>
              <p style="font-size:18px">Gioca ancora !! Scegli un altro livello</p>
              <button onclick="start(3, 4)">3 x 4</button>
               <button onclick="start(4, 4)" style="w">4 x 4</button>
                <button onclick="start(4, 5)">4 x 5</button>
                 <button onclick="start(5, 6)">5 x 6</button>
                  <button onclick="start(6, 6)">6 x 6</button></div></center>`);
              $("#ol").fadeIn(750);
          }, 1000);
    }
  }
}
