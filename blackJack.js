document.addEventListener("DOMContentLoaded", ()=>{
    //let deck_id
    let start = document.querySelector(".start")
    let stay = document.querySelector(".stay")
    let hit = document.querySelector(".hit")
    let score = 0 
    const cardValue = (card) =>{ 
        let scoreBoard = document.querySelector(".scoreBoard")
        if(card === "KING" || card === "QUEEN" || card === "JACK"){
            score += 10
        }else if(card ==="ACE" && score + 11 > 21){
            score +=1
        } else if (card === "ACE" && score + 11 < 21){
            score += 11
        } else {
            score += card  
        }
        scoreBoard.innerHTML = "Your score is: " + score
        //score.appendChild(scoreBoard)
        //debugger
        //scoreBoard.appendChild(card)
        //debugger
    }
    const shuffle = async() =>{
        try{
            let start = document.querySelector(".start")
            let res = await axios.get("https://deckofcardsapi.com/api/deck/new/") 
            deck_id = res.data.deck_id;
            let shuffled = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/shuffle/`)
        } catch(err){  
            console.log(err)
        }
    }
    const drawTwo = async(id) =>{
        try{
            let drawCards =  await axios.get(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=2`)
            let deck = document.querySelector(".blackJack")
            //deck.innerHTML = ""
            for(let i = 0; i < drawCards.data.cards.length; i++){
                console.log(drawCards.data["cards"][i]["value"])
                //debugger
                let img = document.createElement("img")
                let src = drawCards.data["cards"][i]["image"]
                img.src = src
                deck.appendChild(img)
                deck.appendChild(stay)
                deck.appendChild(hit)
                cardValue(drawCards.data["cards"][i]["value"])
            }

        }catch(err){
            console.log(err)
            //debugger           
        }
    }   
    const addCard = async(id) =>{
        try{
            let drawCards = await axios.get(`https://deckofcardsapi.com/api/deck/new/draw/?count=1`)
            let deck2 = document.querySelector(".blackJack")
            //deck2.innerHTML = ""
            for(let i = 0; i < drawCards.data.cards.length; i++){
                console.log(drawCards.data["cards"][i]["value"])
                let img2 = document.createElement("img")
                let src2 = drawCards.data["cards"][i]["image"]
                img2.src = src2
                deck2.appendChild(img2)
                deck2.appendChild(stay)
                deck2.appendChild(hit)
                cardValue(drawCards.data["cards"][i]["value"])               
           }
        }catch(err){
            console.log(err)
        }
    }  
    start.addEventListener("click", ()=>{
        drawTwo(deck_id)
        //cardValue()
    })
    hit.addEventListener("click", ()=>{
        addCard(deck_id)
        //cardValue()
    })
    
    shuffle()
    cardValue()
})
