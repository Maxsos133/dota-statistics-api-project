const steamApiKey = `9720CE9B302ADC1F7B65B4E28D8D9196`
const apiKey = `c120c72b-dcac-41c1-b92b-dbaa1ac4ffc5`
let $heroesDiv = $(`.heroesDiv`)
let $sidePanel = $(`.side-panel`)
const $button = $(`#submitButton`)


async function addButtonToSide() {
    let sidePanelX = document.querySelector(`.sidePanelX`)
    sidePanelX.addEventListener(`click`, function() {
        document.querySelector(".wrapper").classList.remove("side-panel-open")
    })
}




$button.on(`click`, async function() {
    let $input = $(`#textInput`).val().replace(`https://steamcommunity.com/profiles/`, ``).replace(`https://steamcommunity.com/id/`, ``)
    console.log($input)
    await fetch(`https://www.steamidfinder.com/lookup/${$input}`).then(response => response.text()).then(html => {
    let parser = new DOMParser()
    let doc = parser.parseFromString(html, 'text/html')
    let steam32IdElement = doc.querySelectorAll('code')[1]

    let steam32Id = steam32IdElement.textContent.trim().replace(`[U:1:`, ``).replace(`]`, ``)
    console.log(steam32Id)

    async function playerHeroes() {
        let playerResponse = await axios.get(`https://api.opendota.com/api/players/${steam32Id}/heroes?api_key=${apiKey}`)
        console.log(playerResponse)
    }

    async function drawHeroes() {
        let response = await axios.get(`https://api.opendota.com/api/heroes?api_key=${apiKey}`)
        console.log(response.data)
        for (let i = 0; i < response.data.length; i++) {
            let actualName = response.data[i].name.toLowerCase().replaceAll('npc_dota_hero_', '')
            let heroGrid = `<div class="eachHero "id="${actualName}">
            <img src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${actualName}.png"/>
            ${response.data[i].localized_name}
            </div>`
            $heroesDiv.append(heroGrid)
            let $picId = $(`#${actualName}`)
    
            $picId.on(`click`, async function() {
                console.log(actualName)
                document.querySelector(".wrapper").classList.add("side-panel-open")
                let heroSidePanel = `
                <button class="sidePanelX">X</button>
    
                <video poster="https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${actualName}.png" 
                autoplay="" preload="auto" loop="" playsinline="">
                <source type="video/webm" src="https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${actualName}.webm">
                <img src="https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${actualName}.png"></video>
    
                <h3>${response.data[i].localized_name}</h3>
                
                `
                
                $sidePanel.html(heroSidePanel)
                addButtonToSide()

                
            })
    
    
        }
    }
    playerHeroes()
    drawHeroes()
    
    
  })
})



