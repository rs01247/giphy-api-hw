$(document).ready(function () {

    let topics = [
        "Kanye West",
        "Travis Scott",
        "Rick Ross",
        "Quavo",
        "J Cole",
        "Post Malone"
    ];

    function createButtons() {
        $("gif-button").empty();
        topics.forEach(function (event) {
            console.log(event)
            const gifButton = $("<button>");
            gifButton.attr({
                class: "topic-button btn-dark",
                "data-person": event
            });
            gifButton.text(event)
            $("#gif-button").append(gifButton);
        })

    }

    // FUNCTION TO GENERATE INITIAL BUTTONS 
    createButtons();
    const giphyAPI = "rkMz99czA9apZlqQY8uUZr7Amja7v51P";

    $(".topic-button").on("click", function () {
        event.preventDefault()

        let artistClicked = $(this).attr("data-person")
        const queryURL = `https://api.giphy.com/v1/gifs/search?q=${artistClicked}&api_key=${giphyAPI}&limit=10`;
        console.log(queryURL);

        axios.get(queryURL)
            .then(function (resp) {
                const results = resp.data.data;
                console.log(results);
                results.forEach(function (display) {
                    console.log(display)
                    const gifImage = $("<img>");
                    const belowImage = $("<h6 class='ml-2'>");
                    const stillGif = display.images.fixed_height_still.url;
                    const animateGif = display.images.fixed_height.url;
                    const gifRating = display.rating;
                    gifImage.attr({
                        class: "artist-gif",
                        src: stillGif,
                        "data-still": stillGif,
                        "data-animate": animateGif,
                        "data-state": "still"
                    });
                    belowImage.text(`Rating: ${gifRating.toUpperCase()}`);
                    $("#gif-dump").prepend(belowImage).prepend(gifImage);
                })
            })
            .catch(function (err) {
                // console.error(err);
            })
    })

    $(document).on("click", ".artist-gif", function () {

        const state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate")
        }

        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");  
        }
    })

})