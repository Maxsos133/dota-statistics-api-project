const apiKey = `c120c72b-dcac-41c1-b92b-dbaa1ac4ffc5`

async function testApi() {
    let response = await axios.get(`https://api.opendota.com/api/matches/271145478?api_key=${apiKey}`)
    console.log(response)
}

testApi()