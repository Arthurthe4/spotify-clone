const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const SpotifyWebApi = require('spotify-web-api-node');


const app = express()
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.post('./login', (req, res) => {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: 'c26fde743d6a434583c49855538ae418',
        clientSecret: '6341974b03054367a42610e9fe918383'
    })

    spotifyApi
        .authorizationCodeGrant(code)
        .then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    })
    .catch(err  => {
        console.log(err)
        res.sendStatus(400)
    })
}) 

app.listen(3001)