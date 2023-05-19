const steamApiKey = `9720CE9B302ADC1F7B65B4E28D8D9196`
const apiKey = `c120c72b-dcac-41c1-b92b-dbaa1ac4ffc5`
let $heroesDiv = $(`.heroesDiv`)
let $sidePanel = $(`.side-panel`)


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

        $picId.on(`click`, function() {
            console.log(actualName)
            document.querySelector(".wrapper").classList.toggle("side-panel-open")
            let heroSidePanel = `
            <video poster="https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${actualName}.png" 
            autoplay="" preload="auto" loop="" playsinline="">
            <source type="video/webm" src="https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${actualName}.webm">
            <img src="https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${actualName}.png"></video>


            <h3>${response.data[i].localized_name}</h3>
            
            
            
            `
            $sidePanel.html(heroSidePanel)
        })


    }
}
drawHeroes()

