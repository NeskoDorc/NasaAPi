// M429xqNB3ksEI2EgV3KC3gDdywABBvxkpdSwZggM 
// https://api.nasa.gov/planetary/apod?api_key=M429xqNB3ksEI2EgV3KC3gDdywABBvxkpdSwZggM

const resultsNav = document.getElementById('resultsNav')
const favoritesNav = document.getElementById('favoritesNav')

const imagesContainer = document.querySelector('.images-container')
const saveConfirmed = document.querySelector('.save-confirmed')
const loader = document.querySelector('.loader')



const count = 10
const apiKey = 'M429xqNB3ksEI2EgV3KC3gDdywABBvxkpdSwZggM'
const apiUri = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`

let resultsArray = []
let favorites = {}

function updateDOM() {
    resultsArray.forEach(
        result => {
            // Card Container
            const card = document.createElement('div')
            card.classList.add('card')
                // Link
            const link = document.createElement('a')
            link.href = result.hdurl
            link.title = result.title
            link.target = '_blank'
                // Img

            const img = document.createElement('img')
            img.classList.add('card-img-top')
            img.src = result.url
            img.alt = result.title
            img.loading = 'lazy'


            // Card Body 
            const cardBody = document.createElement('div')
            cardBody.classList.add('card-body')

            // Card Body h5 
            const cardTitle = document.createElement('h5')
            cardTitle.classList.add('card-title')
            cardTitle.textContent = result.title

            // clickable

            const pClickable = document.createElement('p')
            pClickable.classList.add('clickable')
            pClickable.textContent = 'Add to Favorites'
            pClickable.setAttribute('onclick', `saveFavorite('${result.url}')`)

            // Card Text 

            const cardText = document.createElement('p')
            cardText.classList.add('card-text')
            cardText.textContent = result.explanation

            // text-muted

            const textMuted = document.createElement('small')
            textMuted.classList.add('text-muted')


            // card date

            const cardDate = document.createElement('strong')
            cardDate.textContent = result.date

            // copyrigt
            const copyRigt = result.copyright === undefined ? '' : result.copyright
            const cardCopy = document.createElement('span')
            cardCopy.textContent = ` ${copyRigt}`

            // Append

            textMuted.append(cardDate, cardCopy)
            cardBody.append(cardTitle, pClickable, cardText, textMuted)
            link.appendChild(img)
            card.append(link, cardBody)

            imagesContainer.appendChild(card)

        }
    )

}

async function getApiData() {
    try {
        const response = await fetch(apiUri)
        resultsArray = await response.json()
        console.log(resultsArray)
        updateDOM()

    } catch (error) {

    }
}



// Add result to favorites 
function saveFavorite(itemUrl) {
    //    Loop throu Results Array
    resultsArray.forEach(item => {

        if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
            favorites[itemUrl] = item

            // Show Save Confirmation
            saveConfirmed.classList.remove('hidden')
                // saveConfirmed.hidden = false
            setTimeout(() => {
                saveConfirmed.classList.add('hidden')
            }, 2000)

            // Set Favorites in localStorige 
            localStorage.setItem('nasaFavorites', JSON.stringify(favorites))
        }
    })

}
getApiData()