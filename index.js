const express = require("express");
const app = express();
const Instagram = require("./instagram-web-api/index");

require("dotenv").config();

const port = process.env.PORT || 4000;

const instagramLoginFunction = () =>
{
    const client = new Instagram({
    username: process.env.INSTAGRAM_USERNAME,
    password: process.env.INSTAGRAM_PASSWORD
    });

    const instagramPostPictureFunction = async () => {
        await client.getPhotosByUsername({ username: process.env.INSTAGRAM_USERNAME})
        .then(
            (res) => res.user.edge_owner_to_timeline_media.edges.map((edge)=> edge.node.edge_media_to_caption.edges[0].node.text)[0]
        );
    };

    instagramPostPictureFunction();

};

instagramLoginFunction();

app.listen(port, () => {
    console.log(`Listening on ${port}...`)
});
