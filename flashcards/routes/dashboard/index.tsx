import { Sidebar } from "../../components/Sidebar.tsx";
import { Navigation } from "../../components/Navigation.tsx";

import { useState, useEffect } from "preact/hooks";

export default function Home() {


    const [decks, setDecks] = useState([]);

    useEffect(() => {

        console.log("fetching decks");

        setDecks([
            {
                name: "new deck",
                cards: 0,
                created: new Date(),
                updated: new Date(),
            },
        ]);
    
    
    }, []);




    return (
        <div>
            <Sidebar />
            <Navigation />

            <div class="pl-[200px]">
                {decks.map((deck) => () => (
                    <div class="card bg-base-100 w-96 shadow-xl">
                        <figure>
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                alt="Shoes"
                            />
                        </figure>
                        <div class="card-body">
                            <h2 class="card-title">Shoes!</h2>
                            <p>
                                If a dog chews shoes whose shoes does he choose?
                            </p>
                            <div class="card-actions justify-end">
                                <button class="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
