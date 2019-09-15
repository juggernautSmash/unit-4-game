let charAttribute = []
let userCharacter = {}
let userBaseAttack = 0
let servantName
let enemyCharacter = {}
let storyCounter = 0


const renderChar = () => {
        for(let i=0; i<6; i++){
            let attackRandomizer = Math.floor(Math.random()*100)+100
            let defenseRandomizer = Math.floor(Math.random()*100)+100

            // console.log(`generating #${i} charAttribute`)
            getName(i)
            charAttribute.push({
                index: i,
                name: servantName,
                bhp: 1000,
                attack: attackRandomizer,
                defense: defenseRandomizer,
                card: `./assets/images/card${i+1}.png`,
                rFull: `./assets/images/rf.full${i+1}.png`,
                lFull: `./assets/images/lf.full${i+1}.png`
            })
            //console.log(charAttribute[i])

            charElement = document.createElement('div')
            charElement.className = `col s2`
            charElement.id = `card${i}`
            charElement.innerHTML = `
                <div class="card">
                    <div class="card card-image">
                        <img class="character" src=${charAttribute[i].card} 
                            data-index=${charAttribute[i].index} 
                            data-bhp=${charAttribute[i].bhp} 
                            data-attack=${charAttribute[i].attack} 
                            data-defense=${charAttribute[i].defense} 
                            data-rFull=${charAttribute[i].rFull} 
                            data-lFull=${charAttribute[i].lFull} 
                            data-name=${charAttribute[i].name}>
                    </div>
                    <div class="card-title character-attribute">
                        <p class="card-attribute">HP: ${charAttribute[i].bhp}</p>
                        <p class="card-attribute">AP: ${charAttribute[i].attack}</p>
                        <p class="card-attribute">DP: ${charAttribute[i].defense}</p>
                    </div>
                </div>
            `
            document.getElementById('charSelect').append(charElement)        
        }//end for loop
}// end renderChar

let getName = charIndex => {
    //console.log(`running getName. charIndex is ${charIndex}`)
    charIndex = parseInt(charIndex)
    switch(charIndex){
        case 0:
            console.log(`running case 0`)
            servantName = "Archer"
            console.log(`setting name as ${servantName}`)
            break;
        case 1:
            servantName = "Assassin"
            break;
        case 2:
            servantName = "Berserker"
            break;
        case 3:
            servantName = "Caster"
            break;
        case 4:
            servantName = "Lancer"
            break;
        case 5:
            servantName = "Rider"
            break;
        case 6:
            servantName = "Saber"
            break;
        default:
            console.log(`something went wrong. charIndex is ${charIndex}`)
    }// end switch
    //return servantName;
}// end getName

renderUserChar = user => {// Generate user character in the arena
    console.log(`running renderUserChar`)

    // Grab attributes from user
    userCharacter = {
        name: user.target.dataset.name,
        index: user.target.dataset.index,
        bhp: user.target.dataset.bhp,
        attack: parseInt(user.target.dataset.attack),
        rFull: user.target.dataset.rFull
    }// end object 

    // grab the base attack to add on later to the attack
    userBaseAttack = userCharacter.attack

    // Generate the div to display on the HTML
    userElement = document.createElement('div')
    userElement.innerHTML = `
        <div class="card">
            <div class="card card-image">
                <img class="user-character" src=${charAttribute[userCharacter.index].lFull}>
            </div>
            <div class="card-title">
                <p class="card-attribute-arena">HP: <span id="userHP">${userCharacter.bhp}</span></p>
                <p class="card-attribute-arena">AP: <span id="userAttack">${userCharacter.attack}</p>
                <!-- <p class="card-attribute-arena">DP: ${userCharacter.defense}</p> -->
            </div>
        </div>
    `
    document.getElementById('userChar').append(userElement)
    document.getElementById('userChar').className = "col s4 scale-transition"
    document.getElementById('storyProgress').append(`You have chosen ${userCharacter.name} as the vessel for your soul. For your soul to completely bind to the servant you must slay  the other servent vessels and absorb their essence`)
}

renderEnemyChar = evilOne => {// Generate enemy character in the arena
    console.log(`running renderEnemyChar`)
    
    //Grab attributtes from evilOne
    enemyCharacter = {
        name: evilOne.target.dataset.name,
        index: evilOne.target.dataset.index,
        bhp: evilOne.target.dataset.bhp,
        defense: evilOne.target.dataset.defense,
        rFull: evilOne.target.dataset.rFull
    }
    console.log(`you have chosen evil Servant${enemyCharacter.name}`)
    console.log(`HP is: ${enemyCharacter.bhp}`)
    console.log(`DP is: ${enemyCharacter.defense}`)
    
    // Generate the div to display on the HTML
    enemyElement = document.createElement('div')
    enemyElement.id = "enemyStage"
    enemyElement.innerHTML = `
        <div class="card">
            <div class="card card-image">
                <img class="enemy-char" src='${charAttribute[enemyCharacter.index].rFull}'>
            </div>
            <div class="card-title">
                <p class="card-attribute-arena">HP: <span id="enemyHP">${enemyCharacter.bhp}</span></p>
                <!-- <p class="card-attribute-arena">AP: ${enemyCharacter.attack}</p> -->
                <p class="card-attribute-arena">DP: ${enemyCharacter.defense}</p>
            </div>
        </div>
    `
    document.getElementById('enemyChar').append(enemyElement)
    document.getElementById('enemyChar').className = "col s4 scale-transition"
    // delete charAttribute[enemyCharacter.index]
    // regenerateCharList()
}// end renderEnemyChar

removeCard = div => {
    console.log(`running removeDiv`)
    //console.log(`div value is ${div}`)
    let divBlock = document.getElementById(div)
    //console.log(`divBlock is ${divBlock}`)
    let blockChild = document.getElementById(div)
    divBlock.remove(blockChild)
}// end removeDiv

document.addEventListener('click', event => {
    // console.log(event)
    if (event.target.className === 'character' || event.target.className === 'character-attribute') {
        if (Object.keys(userCharacter).length === 0){// Select a character
            storyCounter++
            renderUserChar(event)
            removeCard(`card${userCharacter.index}`)
            removeCard(`intro`)
        } else if(Object.keys(userCharacter).length > 0 && Object.keys(enemyCharacter).length === 0) {// Select enemy
            renderEnemyChar(event)
            removeCard(`card${enemyCharacter.index}`)
            document.getElementById(`storyProgress`).innerHTML = `You have chosen to absorb ${enemyCharacter.name}'s essence`
            document.getElementById('fightRow').className = "row scale-transition"
            document.getElementById("fightButton").className = "waves-effect waves-light btn scale-transition "
        }
        else{
            console.log("Unhandled click event")
        }
    }// end if
})

document.getElementById("fightButton").addEventListener("click", event =>{
    userCharacter.bhp -= enemyCharacter.defense
    enemyCharacter.bhp -= userCharacter.attack
    console.log(`fightButton is clicked`)
    //console.log(`enemy HP is ${enemyCharacter.bhp}`)

    if (userCharacter.bhp > 0 && enemyCharacter.bhp > 0){
        userCharacter.attack += parseInt(userBaseAttack)
        document.getElementById('userAttack').innerHTML = userCharacter.attack
        document.getElementById('userHP').innerHTML = userCharacter.bhp
        document.getElementById('enemyHP').innerHTML = enemyCharacter.bhp
        console.log(`enemy HP is ${enemyCharacter.bhp}`)
    } else if(userCharacter.bhp > 0 && enemyCharacter.bhp <= 0){
        document.getElementById("storyProgress").innerHTML = `
        You have slain ${enemyCharacter.name} and absrobed its essence`
        document.getElementById('enemyHP').innerHTML = '0' // display enemy HP as 0
        document.getElementById('fightRow').className += ' scale-out' // hide attack button
        removeCard('enemyStage') // remove the enemy character
        enemyCharacter = {} // empty the enemt character object
        userCharacter.bhp += 250 // heal user character by 500 HP
        document.getElementById('userHP').innerHTML = userCharacter.bhp // display 
        // console.log(`enemy HP is: ${enemyCharacter.bhp}`)
        
    } else if (userCharacter.bhp <= 0 && enemyCharacter.bhp > 0){
        document.getElementById("storyBoard").innerHTML += "You Lose!"
        document.getElementById('userHP').innerHTML = '0'
        document.getElementById('fightRow').className += ' scale-out'
    } else if (userCharacter.bhp < 0 && enemyCharacter.bhp < 0){
        document.getElementById("storyBoard").innerHTML += `Draw`
    } else{
        console.log('unhandled event')
    }
});

const story = [
    ,
   ,
    `you have slain ${enemyCharacter.name} and absrobed its essence`
]

renderChar()