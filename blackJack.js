document.addEventListener("DOMContentLoaded", ()=>{
    let deck_id
    let start = document.querySelector(".start")
    let stay = document.querySelector(".stay")
    let hit = document.querySelector(".hit")
    let score = 0 
    let score2 = 0
    const cardValue = async (card) =>{ 
        let scoreBoard = document.querySelector(".scoreBoard")
        if(card === "KING" || card === "QUEEN" || card === "JACK"){
            score += 10
        }else if(card ==="ACE" && score + 11 > 21){
            score +=1
        } else if (card === "ACE" && score + 11 < 21){
            score += 11
        } else if (card) {
            score += Number(card) 
        }
         
        if(score > 21){
            scoreBoard.innerHTML = `BUSTED.... DEALER WINS`
        }else{
            scoreBoard.innerHTML = `Your score is: ${score}`
        }
    }

    const dealerValue = async(card2) =>{
        let scoreBoard2 = document.querySelector(".dealerScore")
        if(card2 === "KING" || card2 === "QUEEN" || card2 === "JACK"){
            score2 +=10
        }else if (card2 === "ACE" && score2 + 11 > 21){
            score2 += 11
        } else if (card2){
            score2 += Number(card2)
        }
        if(score2 > 21){
            scoreBoard2.innerHTML = `Dealer Busted, PLAYER WINSSSS!!!!!`
        } else if (score2 < score){
            scoreBoard2.innerHTML= `Dealer's Score is ${score2}, PLAYER WINS`
        } else if (score2 > score){
            scoreBoard2.innerHTML = `Dealer score is ${score2}..... Dealer WINS!!!!!`
        } else{
            scoreBoard2.innerHTML = `Dealer's Score is ${score2}, PLAYER WINS!!!`
        }
    } 

    

    const shuffle = async() =>{
        try{
            let deck = document.querySelector(".start")
            let img = document.createElement("img")
            let res = await axios.get("https://deckofcardsapi.com/api/deck/new/") 
            deck_id = res.data.deck_id;
            let shuffled = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/shuffle/`)
                deck.appendChild(img)
                //deck.appendChild(stay)
                //deck.appendChild(hit)
            
        } catch(err){  
            console.log(err)
        }
    }
    const drawTwo = async(id) =>{
        try{
            let drawCards =  await axios.get(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=2`)
            let deck = document.querySelector(".cards")
            deck.innerHTML = ""
            for(let i = 0; i < drawCards.data.cards.length; i++){
                console.log(drawCards.data["cards"][i]["value"])
                //debugger
                let img = document.createElement("img")
                let src = drawCards.data["cards"][i]["image"]
                img.src = src
                deck.appendChild(img)
                //deck.appendChild(stay)
                //deck.appendChild(hit)
                cardValue(drawCards.data["cards"][i]["value"])
                //deck.removeChild(".start")
            }

        }catch(err){
            console.log(err)
            //debugger           
        }
    }   
    const addCard = async(id) =>{
        try{
            let drawCards = await axios.get(`https://deckofcardsapi.com/api/deck/new/draw/?count=1`)
            let deck2 = document.querySelector(".cards")
            //deck2.innerHTML = ""
            for(let i = 0; i < drawCards.data.cards.length; i++){
                console.log(drawCards.data["cards"][i]["value"])
                let img2 = document.createElement("img")
                let src2 = drawCards.data["cards"][i]["image"]
                img2.src = src2
                deck2.appendChild(img2)
                //deck2.appendChild(stay)
                //deck2.appendChild(hit)
                cardValue(drawCards.data["cards"][i]["value"])               
           }
        }catch(err){
            console.log(err)
        }
    }
    const dealerHand = async(card) =>{
        try{
            let drawCards = await axios.get (`https://deckofcardsapi.com/api/deck/new/draw/?count=3`)
            let opponentDeck = document.querySelector(".dealer")
            for(let i = 0; i < drawCards.data.cards.length; i++){
                console.log(drawCards.data["cards"][i]["value"])
                let img3 = document.createElement("img")
                let src3 = drawCards.data["cards"][i]["image"]
                img3.src = src3 
                document.body.appendChild(img3)
                //opponentDeck.appendChild(stay)
                //opponentDeck.appendChild(hit)
                dealerValue(drawCards.data["cards"][i]["value"])
            }
        } catch(err){
            console.log(err)
        }
    }  
    start.addEventListener("click",  ()=>{
        drawTwo(deck_id)
        start.style.display = "none"
        
        //cardValue()
    })
    hit.addEventListener  ("click",  ()=>{
        addCard(deck_id)
        //cardValue()
    })
    stay.addEventListener ("click", () => {
        dealerHand(deck_id)
        
    })
    
    shuffle()
    cardValue()
})
