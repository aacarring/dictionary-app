const inputBar = document.querySelector('.search input');
const searchButton = document.querySelector('.search button');
const wordInfo = document.querySelector('.word-info');

function searchForWord() {
    //reset from one word to the next
    wordInfo.innerHTML = "";


    let inputValue = inputBar.value;
    let url = `https://owlbot.info/api/v4/dictionary/${inputValue}`;
    let params = {
        method: 'GET',
        headers: {
        'Authorization': 'Token ' + '101341be9ff2476ed9b5d43e1deb8e43196a84c4'
    }
    }

    fetch(url, params)
        .then(response => response.json())
        .then(data => {
            let word = data.word;
            let pronunciation = data.pronunciation;
            let definitionsArr = data.definitions;
            for (let i = 0; i < definitionsArr.length; i++) {
                let type = definitionsArr[i].type;
                let definition = definitionsArr[i].definition;
                let emoji = definitionsArr[i].emoji;
                let example = definitionsArr[i].example;

                if (pronunciation === "null") return;
                if (emoji === "null") return;

                let myWord = document.createElement('div');
                if (pronunciation !== null && emoji !== null) {
                    myWord.innerHTML = `
                    <span>${word}</span>
                    <span>${pronunciation}</span>
                    <span>${type}</span>
                    <span>${definition} ${emoji}</span>
                    <span>"${example}"</span>
                `
                } else {
                    myWord.innerHTML = `
                    <span>${word}</span>
                    <span>${type}</span>
                    <span>${definition}</span>
                    <span>"${example}"</span>
                `
                }
                wordInfo.appendChild(myWord);
            }
        });

    inputBar.value = "";
}

searchButton.addEventListener('click', searchForWord);