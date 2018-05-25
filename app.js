$(document).ready(function () {

    let topics = [
        "kanye west",
        "travis scott",
        "rick ross",
        "quavo",
        "j cole",
        "post malone",
        "drake"
    ];

    function createButtons() {
        $("#gif-button").empty();
        topics.forEach(function (event) {
            const gifButton = $("<button>");
            gifButton.attr({
                class: "topic-button btn-dark",
                "data-person": event
            });
            gifButton.text(event.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                return letter.toUpperCase();
            }));
            $("#gif-button").append(gifButton);
        })

    }

    function newButtons() {
        const newArtist = $("#add-artist").val().trim();
        $("#add-artist").text("Add an Artist");
        topics.push(newArtist.toLowerCase().replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
        }));
        createButtons();
        // buttonData();
    }

    // FUNCTION TO GENERATE INITIAL BUTTONS 
    createButtons();
    const giphyAPI = "rkMz99czA9apZlqQY8uUZr7Amja7v51P";

    $(".topic-button").on("click", function () {
        event.preventDefault()

        let artistClicked = $(this).attr("data-person")
        const queryURL = `https://api.giphy.com/v1/gifs/search?q=${artistClicked}&api_key=${giphyAPI}&limit=10`;

        axios.get(queryURL)
            .then(function (resp) {
                const results = resp.data.data;
                results.forEach(function (display) {
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
                console.error(err);
            })
    })

    // FUNCTION FOR PLAYING AND PAUSING GIFS
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

    //FUNCTION FOR CREATING NEW BUTTONS FROM FORM INPUT
    $("#submit-button").on("click", function () {
        event.preventDefault()  
        newButtons()
    })

})