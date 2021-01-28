const inputBar = document.querySelector('.search input');
const searchButton = document.querySelector('.search button');
const wordInfo = document.querySelector('.word-info-container');
const dictionaryImg = document.querySelector('.word-info-container img');

function searchForWord() {
    //remove dictionaryImg to make space for word info results
    dictionaryImg.remove();
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
        .then(response => {
            if (!response.ok) {
                alert("No results found for given input, try again.");
            } else {
                return response.json()
            }
        })
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
                myWord.classList.add('word-info-div');
                if (pronunciation !== null && emoji !== null && example !== "" && example !== null) {
                    myWord.innerHTML = `
                    <span class="word">${word}</span>
                    <span class="pronunciation">${pronunciation}</span>
                    <span class="type">${type}</span>
                    <span class="definition">${definition} ${emoji}</span>
                    <span class="example">"${example}"</span>
                `
                } else if (emoji !== null && example !== "" && example !== null) {
                    myWord.innerHTML = `
                    <span class="word">${word}</span>
                    <span class="type">${type}</span>
                    <span class="definition">${definition} ${emoji}</span>
                    <span class="example">"${example}"</span>
                `
                } else if (example !== "" && example !== null && pronunciation !== null){
                    myWord.innerHTML = `
                    <span class="word">${word}</span>
                    <span class="pronunciation">${pronunciation}</span>
                    <span class="type">${type}</span>
                    <span class="definition">${definition}</span>
                    <span class="example">"${example}"</span>
                `
                } else if (emoji !== null && pronunciation !== null){
                    myWord.innerHTML = `
                    <span class="word">${word}</span>
                    <span class="pronunciation">${pronunciation}</span>
                    <span class="type">${type}</span>
                    <span class="definition">${definition} ${emoji}</span>
                `
                } else {
                    myWord.innerHTML = `
                    <span class="word">${word}</span>
                    <span class="type">${type}</span>
                    <span class="definition">${definition}</span>
                `
                }
                wordInfo.appendChild(myWord);
            }
        });

    inputBar.value = "";
}

searchButton.addEventListener('click', searchForWord);