import { db } from "./firebase.js";
import { Timestamp } from "firebase-admin/firestore";

export default async function handler(req, res) {

    if (req.method !== "POST")
            return res.status(405).end();

                try {

                        const { username, message } = req.body;

                                if (!message)
                                            return res.status(400).end();

                                                    const ref = db
                                                                .collection("users")
                                                                            .doc("user1");

                                                                                    const doc = await ref.get();

                                                                                            let messages = [];

                                                                                                    if (doc.exists)
                                                                                                                messages = doc.data().main ?? [];

                                                                                                                        messages.push({
                                                                                                                                    username: username || "Anonymous",
                                                                                                                                                message,
                                                                                                                                                            time: Timestamp.now()
                                                                                                                                                                    });

                                                                                                                                                                            await ref.set({
                                                                                                                                                                                        main: messages
                                                                                                                                                                                                }, {
                                                                                                                                                                                                            merge: true
                                                                                                                                                                                                                    });

                                                                                                                                                                                                                            res.json({
                                                                                                                                                                                                                                        success: true
                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                    } catch (e) {

                                                                                                                                                                                                                                                            console.error(e);

                                                                                                                                                                                                                                                                    res.status(500).json({
                                                                                                                                                                                                                                                                                error: e.message
                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                            }