$(document).ready(function() {

const filterWeeks = () => {
  //Filter week one
  if ($(".dropdown-content span").hasClass("filtered")) {
    $("#week-one").hide();
  } else {
    $("#week-one").show();
  }
  
  noMoreGirls();
  coltonShower();

  //Filter other weeks
  filterOtherWeeks();
}

const filterOtherWeeks = () => {
  if ($("#week-two .colton-looks .girls").children(":visible").length == 0) {
    $("#week-two .colton-looks .colton-looks-img").hide();
    console.log($("#week-two .colton-looks .girls").children(":visible").length);
  } else {
    $("#week-two .colton-looks .colton-looks-img").show();
  }
};

const noMoreGirls = () => {
  if ($("#remaining-girls .girls").children(":visible").length == 0) {
    $("#title").addClass("chris-background");
  } else {
    $("#title").removeClass("chris-background");
  }
}

const coltonShower = () => {
  if ($("#filterWilliam").hasClass("filtered") && !$("#filterMat").hasClass("filtered") && !$("#filterNell").hasClass("filtered") && !$("#filterErika").hasClass("filtered") && !$("#filterKennedy").hasClass("filtered") && !$("#filterRejected").hasClass("filtered")) {
    $("#title").addClass("colton-shower-background");
  } else {
    $("#title").removeClass("colton-shower-background");
  }
}

$("#title").on("click", () => {
  $(".william").toggle();

})

$(".dropdown").on("mouseover", () => {
  $(".dropdown-content").show();
  $(".dropbtn").addClass("hover");
})

$(".dropdown").on("mouseleave", () => {
  $(".dropdown-content").hide();
  $(".dropbtn").removeClass("hover");
})

$(".dropdown-content span").on("click", event => {
  $(event.currentTarget).toggleClass("filtered");
})

$("#filterMat").on("click", () => {
  $(".mat").toggle();
  filterWeeks();
})

$("#filterWilliam").on("click", () => {
  $(".william").toggle();
  filterWeeks();
})

$("#filterNell").on("click", () => {
  $(".nell").toggle();
  filterWeeks();
})

$("#filterErika").on("click", () => {
  $(".erika").toggle();
  filterWeeks();
})

$("#filterKennedy").on("click", () => {
  $(".kennedy").toggle();
  filterWeeks();
})

$("#filterRejected").on("click", () => {
  $(".rejected").toggle();
  filterWeeks();
})

});