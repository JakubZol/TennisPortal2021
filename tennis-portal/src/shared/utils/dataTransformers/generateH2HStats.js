export default (matches, userId) => {
    const h2hList = [];

    matches.forEach(({ players, opponents, ...details }) => {
        if (players.length === 1 && details.victory !== undefined){
            const currentOpponent = players.some(({ id }) => id === userId) ? opponents[0] : players[0];

            const opponentIndex = h2hList.findIndex(({ opponent }) => opponent.id === currentOpponent.id);
            if(opponentIndex > -1) {
                h2hList[opponentIndex].matches.push({ ...details });
            }
            else {
                h2hList.push({
                    opponent: currentOpponent,
                    matches: [ details ]
                });
            }

        }
    });

    return h2hList;
}
