$(document).ready(function () {

    var topics = [
        "Kanye West",
        "Travis Scott",
        "Rick Ross",
        "Quavo",
        "J Cole",
        "Post Malone"
    ];

    var artistClicked;
    var gifButton;

    function createButtons() {
        $("gif-button").empty();
        topics.forEach(function (event) {
            console.log(event)
            gifButton = $("<button>");
            gifButton.attr("class", "topic-button").attr("data-person", event).text(event)
            $("#gif-button").append(gifButton);
        })

    }
    // FUNCTION TO GENERATE INITIAL BUTTONS 
    createButtons();
    var giphyAPI = "rkMz99czA9apZlqQY8uUZr7Amja7v51P";

    $(".topic-button").on("click", function () {
        console.log(this);
        event.preventDefault()

        artistClicked = $(this).attr("data-person")
        var queryURL = `https://api.giphy.com/v1/gifs/search?q=${artistClicked}&api_key=${giphyAPI}&limit=10`;
        console.log(queryURL);

        axios.get(queryURL)
            .then(function (resp) {
                var results = resp.data.data;
                console.log(results);
                results.forEach(function (display) {
                    console.log(display)
                    var gifImage = $("<img>")
                    gifImage.attr("class", "artist-gif").attr("src", display.images.fixed_height_small.url)
                    $("#gif-dump").prepend(gifImage);
                    // $("#gif-dump").prepend()
                })

            })

            .catch(function (err) {
                // console.error(err);
            })

    })

})