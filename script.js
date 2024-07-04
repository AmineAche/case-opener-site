import $ from 'jquery';
var audio = new Audio("./Zelda.mp3");

    $(document).ready(function generateRandomCards() {
        const cardList = $('.cardList').first();
        const cardTypes = ['none', 'rare', 'mythical', 'legendary']; // Array of card types
        const dropRates = {
            none: 0.4,    // 60% chance
            rare: 0.39,      // 30% chance
            mythical: 0.2, // 20% chance
            legendary: 0.01 // 2% chance
        };
        let counts = {
        none: 0,
        rare: 0,
        mythical: 0,
        legendary: 0
    };

        // Clear existing cards
        cardList.empty();

        // Generate 50 random cards
        for (let i = 0; i < 100; i++) {
            let randomNumber = Math.random(); // Random number between 0 and 1
            let chosenType;

            //console.log(randomNumber);

            // Determine card type based on drop rates
            if (randomNumber < dropRates.legendary) {
                chosenType = 'legendary';
            } else if (randomNumber < dropRates.mythical + dropRates.legendary) {
                chosenType = 'mythical';
            } else if (randomNumber < dropRates.rare + dropRates.mythical + dropRates.legendary) {
                chosenType = 'rare';
            } else {
                chosenType = 'none';
            }
            counts[chosenType]++;

            const cardElement = $('<div>').addClass('card').addClass(chosenType).addClass(i + "oe"); // Create card element
            const imgElement = $('<img>').attr('src', "img/" + chosenType + ".png").addClass('img_sub'); // Create image element

            cardElement.append(imgElement); // Add image to card
            cardList.append(cardElement); // Add card to card list
        }
        console.log("carte legendary : " + counts["legendary"]);
        console.log("carte mythical : " + counts["mythical"]);
        console.log("carte rare : " + counts["rare"]);
        console.log("carte none : " + counts["none"]);
    });

    function spin() {
        const cardList = $('.cardList').first();
        const cards = $('.card'); // Update the cards variable here
        const randomize = true;
        const width = 100;
        const distance = 20 * width;
        let newMargin = 0;
        let newDistance = distance;

        const randomedistance = ['2600', '2800', '3070', '3200'];
        const randomeindex = ['25', '27', '29', '30'];
        const randomNumber = Math.floor(Math.random() * 4) + 1;
        newDistance = randomedistance[randomNumber - 1];
        console.log(newDistance);
        newMargin = -(newDistance);
        cards.first().animate({
            marginLeft: newMargin
        }, 7500, function() {
            const finalCard = cards.eq(randomeindex[randomNumber - 1]);
            console.log("Final Card:", randomeindex[randomNumber - 1]);  
            console.log("Final Card:", finalCard.attr('class'));
        });
    }

    function resetWheel() {
        audio.pause();
        $('*').stop(true, true);
        const cards = $('.card');
        cards.first().animate({
            marginLeft: 0 // Set marginLeft to 0 to reset the wheel
        }, 2500); // Adjust the animation duration as needed
    }

    $('#reset').click(function () {
        setTimeout(resetWheel, 500);
        return false;
    });

    $(window).on('load', function () {
        audio.currentTime = 0;
        audio.play();
        setTimeout(spin, 2000);
        return false;
    });





