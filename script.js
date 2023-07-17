const steamApiKey = ''
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

  
    $(`p`).css(`display`, `none`)
    
        


    async function drawHeroes() {
        let response = await axios.get(`https://api.opendota.com/api/heroes?api_key=${apiKey}`)
        console.log(response)

        let playerResponse = await axios.get(`https://api.opendota.com/api/players/${steam32Id}/heroes?api_key=${apiKey}`)
        console.log(playerResponse)
        
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
                let heroStats = playerResponse.data.find(hero => hero.hero_id === `${response.data[i].id}`)
                let lastPlayed = await axios.get(`https://api.opendota.com/api/players/${steam32Id}/matches?api_key=${apiKey}&hero_id=${heroStats.hero_id}`)

                let replayAvailable = false
                let cluster = null
                let salt = null

                if (lastPlayed.data.length > 0) {
                    let replayResponse = await axios.get(`https://api.opendota.com/api/replays?api_key=${apiKey}&match_id=${lastPlayed.data[0].match_id}`)
                
                if (replayResponse.data.length > 0) {
                    replayAvailable = true;
                    cluster = replayResponse.data[0].cluster
                    salt = replayResponse.data[0].replay_salt
                    }
                 }

                console.log(cluster, salt)

                
                let gamesLost = heroStats.games - heroStats.win
                let heroWinrate = 0
              
                if (heroStats.games === 0) {
                  heroWinrate = 0
                } else if (heroStats.games >= 1) {
                  heroWinrate = Math.round((heroStats.win / heroStats.games) * 100)
                }
              
                let heroSidePanel = `
                  <button class="sidePanelX">X</button>
              
                  <video poster="https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${actualName}.png" 
                  autoplay="" preload="auto" loop="" playsinline="">
                  <source type="video/webm" src="https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${actualName}.webm">
                  <img src="https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${actualName}.png"></video>
              
                  <h3>${response.data[i].localized_name}</h3>
              
                  <div>Total Games: ${heroStats.games}</div>
                  <div>Won: ${heroStats.win}</div>
                  <div>Lost: ${gamesLost}</div>
                  <div>Winrate: ${heroWinrate} %</div>
                `;
              
                if (lastPlayed.data.length > 0) {
                  heroSidePanel += `<div>Last Match ID: ${lastPlayed.data[0].match_id}</div>`
                  if (replayAvailable) {
                    heroSidePanel += `<a href="http://replay${cluster}.valve.net/570/${lastPlayed.data[0].match_id}_${salt}.dem.bz2">Download Replay</a>`
                    heroSidePanel += `<a href="#" id="watchReplayBtn">Watch Replay</a>`
                  } else {
                    heroSidePanel += `<div>No replay available for the last played match.</div>`
                  }
                } else {
                  heroSidePanel += `<div>No matches found for the selected hero.</div>`
                }
              
                $(document).ready(function() {
                  $('#watchReplayBtn').click(function(e) {
                    e.preventDefault()
                
                    var replayPath = `${lastPlayed.data[0].match_id}_${salt}`
                
                    window.location.href = `steam://rungameid/570//-console -novid +playdemo replays\\${replayPath}`
                  });
                });
              
                $sidePanel.html(heroSidePanel)
                addButtonToSide()
              });
    
    
        }
    }
    
    drawHeroes()
    
    
  })
})



