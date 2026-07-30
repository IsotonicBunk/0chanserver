import { db } from "./firebase.js";


export default async function handler(req, res) {
res.setHeader(
        "Access-Control-Allow-Origin",
        "https://isotonicbunk.github.io"
    );

    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, OPTIONS"
    );

    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type"
    );


    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (req.method !== "GET") {
        return res.status(405).end();
    }


    try {

        const doc = await db
            .collection("users")
            .doc("user1")
            .get();


        if (!doc.exists) {
            return res.json([]);
        }


        return res.json(
            doc.data().main || []
        );


    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: error.message
        });

    }
}