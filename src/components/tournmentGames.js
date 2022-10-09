import React, { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function TournmentGames() {
    const apiURL = "http://localhost:3001/series";
    const [items, setItems] = useState([]);
    const [sorted, setSorted] = useState({ sorted: "id", reversed: false });
	const [searchPhrase, setSearchPhrase] = useState("");
    
    // Run on load
    useEffect(() => {
        fetch(apiURL)
            .then(response => response.json())
            .then(json => setItems(json))
    }, [])

    const sortByTitle = () => {
        // Make copy of array before editing
        const itemsCopy = [...items]

        // Sort items array
        itemsCopy.sort((a, b) => {
            const titleA = a.title
            const titleB = b.title
			if (sorted.reversed) {
                // Sort by alphabet DESC
                return titleA.localeCompare(titleB)
            }
            // Sort by alphabet ASC
            return titleB.localeCompare(titleA)
        });
        // set items to new state
        setItems(itemsCopy);

        // Set sorted state
		setSorted({ sorted: "title", reversed: !sorted.reversed });
    }

    const renderArrow = () => {
		if (sorted.reversed) {
            // if ASC show up arrow
			return <FaArrowUp />;
		}
        // if DESC show up arrow
		return <FaArrowDown />;
	};

    const search = (event) => {
        // Set var to return matched items
        const matchedItems = items.filter((item) => {
            return `${item.tournament.name}`
                .toLowerCase()
                .includes(event.target.value.toLowerCase());
        });
        // send updated match to state
        setItems(matchedItems);
        // Update search term shown
        setSearchPhrase(event.target.value);
    };

    const renderList = () => {
        return (
            <ul className="list">
                {/* Loop through items/ games */}
                { items.map(item => {
                    const date = new Date(item.startTime).toLocaleString();
                    console.log(date);
                    return <li key={item.id}>
                        <ul className="items">
                            <li className="title">{item.title}</li>
                            <li className="time">{date}</li>
                            <li className="teams">
                                {
                                    item.teams.map(team => {
                                            /* Loop through teams */
                                        return (
                                            <ul key={team.id} className="teamItem">
                                                <li className="name">
                                                    {team.name}
                                                </li>
                                                <li className="logo">
                                                    <img width="35" src={team.logoUrl} alt="team logo" />
                                                </li>
                                                <li className="score">
                                                    0
                                                </li>
                                            </ul>
                                        )
                                    })
                                }
                            </li>
                            <li className="tournament">{item.tournament.name}</li>
                        </ul>
                    </li>
                })}
            </ul>
        )
    }

    return (
        <section className="tournmentGames">
            <div className="container">
                <div className="listSection listSearch">
                    <label>Tournment Search: </label>
                    <input
                        type="text"
                        placeholder="Search Tournments..."
                        value={searchPhrase}
                        onChange={search}
                    />
                </div>
                <div className="listSection listHead">
                {/* <button onClick={ () => setItems( ...items.sort((a, b) => a.title.localeCompare(b.title))) }>Title</button> */}
                <button onClick={sortByTitle}>Title { sorted.sorted === "title" ? renderArrow() : null} </button>
                    <div className="time">Time</div>
                    <div className="teams"><span>Team 1</span><span>Team 2</span></div>
                    <div className="tournments">Tournment</div>
                </div>
                <div className="listSection listBody">
                    {renderList()}
                </div>
            </div>
        </section>
    )
}