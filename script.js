const steamApiKey = `9720CE9B302ADC1F7B65B4E28D8D9196`
const apiKey = `c120c72b-dcac-41c1-b92b-dbaa1ac4ffc5`
let $heroesDiv = $(`.heroesDiv`)


async function drawHeroes() {
    let response = await axios.get(`https://api.opendota.com/api/heroes?api_key=${apiKey}`)
    console.log(response.data)
    for (let i = 0; i < response.data.length; i++) {
        let heroGrid = `<div id="${response.data[i].localized_name}">
        <img src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${response.data[i].name.toLowerCase().replaceAll('npc_dota_hero_', '')}.png"/>
        ${response.data[i].localized_name}
        </div>`

        $heroesDiv.append(heroGrid)
        
        // } else if(response.data[i].localized_name === `Anti-Mage`){
        //     let heroGrid = `<div id="${response.data[i].localized_name}">
        // <img src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/antimage.png"/>
        // ${response.data[i].localized_name}
        // </div>`

        // $heroesDiv.append(heroGrid)
        // } else if(response.data[i].localized_name === `Anti-Mage`){
        //     let heroGrid = `<div id="${response.data[i].localized_name}">
        // <img src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/antimage.png"/>
        // ${response.data[i].localized_name}
        // </div>`

        // $heroesDiv.append(heroGrid)
        // }
    
}
}
drawHeroes()