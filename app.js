let movieArray = [];

class Movie {
  constructor(title, rating) {
    this.title = title;
    this.rating = rating;
  }
}

$("body").append(
  "<div id='formContainer'><form><label for='title'>Movie Title:</label><input type='text' id='title' /><label for='rating'>Movie Rating:</label><input type='text' id='rating' /><input type='submit' /></form></div>"
);

$("form").append(
  `<input type="button" value = "Sort By Title" id="titleSort"><input type="button" value="Sort By Ratings" id="ratingsSort">`
);

$("input").css("margin-left", "15px");
$("label").css("margin-left", "15px");
$("#formContainer").css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

$("body").css({
  backgroundColor: "rgb(82, 82, 165)",
  color: "rgb(255, 255, 255)",
});

$("form").append("<ul></ul>");
$("ul").css("list-style-type", "none");

$("form").submit(function (e) {
  $("#userWarning").remove();
  e.preventDefault();
  if (
    $("#title").val().length >= 2 &&
    $("#rating").val() >= 0 &&
    $("#rating").val() <= 10 &&
    $("#rating").val().length > 0 &&
    noDuplicateTitles(movieArray, $("#title").val())
  ) {
    movieArray.push(new Movie($("#title").val(), $("#rating").val()));
    $("ul")
      .append(
        `<li>Title: <span>${$("#title").val()}</span> | Rating: ${$(
          "#rating"
        ).val()}</li>`
      )
      .append(`<input type="button" value="Remove"/>`);
  } else {
    $("ul").append(
      `<li id="userWarning">Please ensure that the movie title is at least two characters long, that the movie rating is between 0 and 10, and that there are no duplicate titles.</li>`
    );
  }
});

function sortByTitle(arr) {
  return arr.sort((a, b) => {
    const titleA = a.title.toUpperCase();
    const titleB = b.title.toUpperCase();
    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB) {
      return 1;
    }
    return 0;
  });
}

function sortByRating(arr) {
  return arr.sort((a, b) => {
    const ratingA = a.rating;
    const ratingB = b.rating;
    return ratingA - ratingB;
  });
}

$("#titleSort").click(function () {
  let sortedArray = sortByTitle(movieArray);
  $("li").next().remove();
  $("li").remove();
  sortedArray.forEach((element) => {
    $("ul")
      .append(
        `<li>Title: <span>${element.title}</span> | Rating: ${element.rating}</li>`
      )
      .append(`<input type="button" value="Remove"/>`);
  });
});

$("#ratingsSort").click(function () {
  let sortedArray = sortByRating(movieArray);
  $("li").next().remove();
  $("li").remove();
  sortedArray.forEach((element) => {
    $("ul")
      .append(
        `<li>Title: <span>${element.title}</span> | Rating: ${element.rating}</li>`
      )
      .append(`<input type="button" value="Remove"/>`);
  });
});

function titleMatches(arr, str) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].title === str) {
      arr.splice(i, 1);
    }
  }
}

function noDuplicateTitles(arr, str) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].title === str) {
      return false;
    }
  }
  return true;
}

$("ul").click(function (e) {
  if (e.target.tagName === "INPUT") {
    titleMatches(movieArray, $(e.target).prev().children("span").eq(0).text());
    $(e.target).prev().remove();
    $(e.target).remove();
  }
});
