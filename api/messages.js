import { db } from "./firebase.js";

export default async function handler(req, res) {

    if (req.method !== "GET")
            return res.status(405).end();

                try {

                        const doc = await db
                                    .collection("users")
                                                .doc("user1")
                                                            .get();

                                                                    if (!doc.exists)
                                                                                return res.json([]);

                                                                                        const data = doc.data();

                                                                                                res.json(data.main ?? []);

                                                                                                    } catch (e) {

                                                                                                            console.error(e);

                                                                                                                    res.status(500).json({
                                                                                                                                error: "Database error"
                                                                                                                                        });

                                                                                                                                            }

                                                                                                                                            }