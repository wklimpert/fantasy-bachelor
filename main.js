$(document).ready(function() {
$.event.addProp('dataTransfer');

const mq = window.matchMedia( "(max-width: 1024px) ");


/*$("a").on("click", () => {
  setTimeout(function() {
    window.scrollTo(0, window.pageYOffset - 100);
  }, 0);
})*/


const filterWeeks = () => {
  //Filter week one
  if ($(".dropdown-content span").hasClass("filtered")) {
    $("#week-one").hide();
  } else {
    $("#week-one").show();
  }
  
  //Easter Eggs
  //noMoreGirls();
  coltonShower();

  //Filter other weeks
  filterOtherWeeks();
}

const filterOtherWeeks = () => {
  $(".colton-looks .girls").each(function( index ) {
    if ($( this ).children(":visible").length == 0) {
      $( this ).siblings().hide();
    } else {
      $( this ).siblings().show();
    }
  })
}


//Chris Easter Egg when everyone filtered out

/*
const noMoreGirls = () => {
  if ($("#remaining-girls .girls").children(":visible").length == 0) {
    $("#title").addClass("chris-background");
  } else {
    $("#title").removeClass("chris-background");
  }
}*/


//Colton Shower Easter Egg when William filtered out
const coltonShower = () => {
  if ($("#filterWilliam").hasClass("filtered") && !$("#filterMat").hasClass("filtered") && !$("#filterNell").hasClass("filtered") && !$("#filterErika").hasClass("filtered") && !$("#filterKennedy").hasClass("filtered") && !$("#filterRejected").hasClass("filtered")) {
    $("#title").addClass("colton-shower-background");
  } else {
    $("#title").removeClass("colton-shower-background");
  }
}


//Dropdown menu functionality
$(".dropdown").on("mouseover", () => {
  $(".dropdown-content").show();
  $(".dropbtn").addClass("hover");
})

$(".dropdown").on("mouseleave", () => {
  $(".dropdown-content").hide();
  $(".dropbtn").removeClass("hover");
})

//Filter functionality

const showAll = () => {
  $(".dropdown-content span").removeClass("filtered");
  $(".girls").children().show();
};

$(".dropdown-content span").on("click", () => {
  const names = ["Mat", "William", "Nell", "Erika", "Kennedy", "Rejected"];
  const targetName = $(event.currentTarget).attr("id").substr(6);
  
  if (targetName === "All") {
    showAll();
  } else if ($(".dropdown-content span").hasClass("filtered")) {
    $(event.currentTarget).toggleClass("filtered");
    $("." + targetName.toLowerCase()).toggle();
    
    if ($("#remaining-girls .girls").children(":visible").length === 0) {
      showAll();
    }
  } else {
    names.forEach(name => {
      if (name !== targetName) {
        $("#filter" + name).addClass("filtered");
        $("." + name.toLowerCase()).hide();
      }
    })
  };
  
  filterWeeks();
})

$(".girl").on("click", () => {
  $(event.currentTarget).find(".safe").toggle();
})


//Clicking on a name filters it out
/*
$(".dropdown-content span").on("click", event => {
  let targetClass = "." + $(event.currentTarget).attr("id").substr(6).toLowerCase();
  $(event.currentTarget).toggleClass("filtered");
  $(targetClass).toggle();
  filterWeeks();
})
*/


//Zoom functionality
$(".girl").on("mouseover", event => {
  $(event.currentTarget).find("img").first().addClass("zoom");
})

$(".girl").on("mouseleave", event => {
  $(event.currentTarget).find("img").removeClass("zoom");
})

//Drag and Drop Functionality

const hideWeek = () => {
  if ($("#week-four-drop").children().length === 0) {
    $("#week-four").hide();
  }
}


$("#title").on("dragover", function(event) {
  event.preventDefault();
})

$("#title").on("drop", function(event) {
  event.preventDefault();
  let data = event.dataTransfer.getData("text");
  if (data === "rose") {
    $("#title").toggleClass("chris-background");
  }
})

$("#rose").on("dragstart", function(event) {
  event.dataTransfer.setData("text", event.target.id);
})

$("#gone-girls").find(".drop-box").on("drop", function(event) {
  event.preventDefault();
  let data = event.dataTransfer.getData("text");
  if (data !== "rose") {
    document.getElementById("remaining-drop").appendChild(document.getElementById(data));
  };
  
  hideWeek();
  adjustScores();

   $("#remaining-drop").sortDivs();
});

$("#gone-girls").find(".drop-box").on("dragover", function(event) {
  event.preventDefault();
  if (!event.target.classList.contains("drop-box")) {
    event.dataTransfer.dropEffect = "none";
  }
});

$("#remaining-girls").on("drop", function(event) {
  event.preventDefault();
  let data = event.dataTransfer.getData("text");
  if (data !== "rose") {
    document.getElementById("week-four").style.display = "block";
    document.getElementById("week-four-drop").appendChild(document.getElementById(data));
  };
  
  adjustScores();
  
  $("#week-four-drop").sortDivs();
});

$("#remaining-girls").on("dragover", function(event) {
  event.preventDefault();
  if (!event.target.classList.contains("drop-box")) {
    event.dataTransfer.dropEffect = "none";
  }
});

$("#remaining-drop").children().on("dragstart", function(event) {
  event.dataTransfer.setData("text", event.target.id);
});

jQuery.fn.sortDivs = function sortDivs() {
    $("> div", this[0]).sort(dec_sort).appendTo(this[0]);
    function dec_sort(a, b){ 
      var contentA = $(a).attr("id").toUpperCase();
      var contentB = $(b).attr("id").toUpperCase();
      return contentA.localeCompare(contentB);
    };
}


//For iPhones/iPads, no drag/drop - yes click to move

/*
if (mq.matches) {
  function moveToWeekFour (event) {
    $("#week-four").show();
    var element = $(event.currentTarget).detach();
    $("#week-four-drop").append(element);
    $("#week-four-drop").sortDivs();
    
    element.off("click", moveToWeekFour);
    element.on("click", moveToRemaining);
  };
  
  function moveToRemaining (event) {
    var element = $(event.currentTarget).detach();
    $("#remaining-drop").append(element);
    $("#remaining-drop").sortDivs();
    
    element.off("click", moveToRemaining);
    element.on("click", moveToWeekFour);
    hideWeek();
  }
  
  $("#remaining-drop").children().on("click", moveToWeekFour);
  
  $("#rose").on("click", function(event) {
    $("#title").toggleClass("chris-background");
  })
 
}

*/

const ogMatScore = parseInt($("#matScore").text());
const ogWilliamScore = parseInt($("#williamScore").text());
const ogNellScore = parseInt($("#nellScore").text());
const ogErikaScore = parseInt($("#erikaScore").text());
const ogKennedyScore = parseInt($("#kennedyScore").text());
const ogRejectedScore = parseInt($("#rejectedScore").text());


const changeColors = (arr) => {
  let highest = Math.max(...arr);
  if (arr[0] === highest) {
    $("#matScore").parent().addClass("winning");
  } else {
    $("#matScore").parent().removeClass("winning");
  }
  if (arr[1] === highest) {
    $("#williamScore").parent().addClass("winning");    
  } else {
    $("#williamScore").parent().removeClass("winning");
  }
  if (arr[2] === highest) {
    $("#nellScore").parent().addClass("winning");
  } else {
    $("#nellScore").parent().removeClass("winning");
  }
  if (arr[3] === highest) {
    $("#erikaScore").parent().addClass("winning");
  } else {
    $("#erikaScore").parent().removeClass("winning");
  }
  if (arr[4] === highest) {
    $("#kennedyScore").parent().addClass("winning");
  } else {
    $("#kennedyScore").parent().removeClass("winning");
  }
  if (arr[5] === highest) {
    $("#rejectedScore").parent().addClass("winning");
  } else {
    $("#rejectedScore").parent().removeClass("winning");
  }
  
  slothBackground();
}

const slothBackground = () => {
  if ($("#williamScore").parent().hasClass("winning") && !$("#matScore").parent().hasClass("winning") && !$("#nellScore").parent().hasClass("winning") && !$("#erikaScore").parent().hasClass("winning") && !$("#kennedyScore").parent().hasClass("winning") && !$("#rejectedScore").parent().hasClass("winning")) {
  
  //if ($("#williamScore").parent().hasClass("winning")) {
    $("#title").addClass("sloth-background");
  } else {
    $("#title").removeClass("sloth-background");
  }
}

const adjustScores = () => {
  let matScore = 0;
  let williamScore = 0;
  let nellScore = 0;
  let erikaScore = 0;
  let kennedyScore = 0;
  let rejectedScore = 0;
  
  if ($("#week-four-drop").children().length !== 0) {
      $("#remaining-drop").find(".whose").each(function(index) {
        let player = $(this).text();

        if (player === "Mat's") {
          matScore ++;
        } else if (player === "William's") {
          williamScore ++;
        } else if (player === "Nell's") {
          nellScore ++;
        } else if (player === "Erika's") {
          erikaScore ++;
        } else if (player === "Kennedy's") {
          kennedyScore ++;
        } else {
          rejectedScore ++;
        }
      })
  };
  //changeColors([1,2,3,4,5,6]);
  changeColors([matScore + ogMatScore, williamScore + ogWilliamScore, nellScore + ogNellScore, erikaScore + ogErikaScore, kennedyScore + ogKennedyScore, rejectedScore + ogRejectedScore]);
  
  $("#matScore").text(matScore + ogMatScore);
  $("#williamScore").text(williamScore + ogWilliamScore);
  $("#nellScore").text(nellScore + ogNellScore);
  $("#erikaScore").text(erikaScore + ogErikaScore);
  $("#kennedyScore").text(kennedyScore + ogKennedyScore);
  $("#rejectedScore").text(rejectedScore + ogRejectedScore);
  
}






});