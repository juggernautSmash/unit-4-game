// const story = [
//     `You chosen ${servantName} as the vessel for your`
// ]

let charAttribute = []
let userCharacter = {}
let servantName
let enemyCharacter = {}

console.log(`userCharacter is : ${Object.keys(userCharacter).length}`)

const renderChar = () => {
    for(let i=0; i<7; i++){
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
            rFull: `./assets/images/rf.full${i+1}.png`,
            lFull: `./assets/images/lf.full${i+1}.png`
        })
        console.log(charAttribute[i])

        charElement = document.createElement('div')
        charElement.className = 'carousel-item'
        charElement.innerHTML = `
            <div class="card">
                <div class="card card-image">
                    <img class="character" src="./assets/images/card${i+1}.png" 
                        data-index=${charAttribute[i].index} 
                        data-bhp="${charAttribute[i].bhp}" 
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
    console.log(`running getName. charIndex is ${charIndex}`)
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

document.addEventListener('click', event => {
    // console.log(event)
    if (event.target.className === 'character' || event.target.className === 'character-attribute') {
        //console.log(`clicking ${event.target.dataset.name}`)
        if (Object.keys(userCharacter).length === 0){// Select an avatar
            userCharacter = {
                name: event.target.dataset.name,
                index: event.target.dataset.index,
                bhp: event.target.dataset.bhp,
                attack: event.target.dataset.attack,
                defense: event.target.dataset.defense,
                rFull: event.target.dataset.rFull,
                lFull: event.target.dataset.lFull
            }// end object 
            console.log(`user servant index: ${userCharacter.index}`)
            console.log(`userCharacter Object length is ${Object.keys(userCharacter).length}`)
            console.log(`user object is ${userCharacter}`)
            renderUserChar(event)
            removeIntro();
        }else if(Object.keys(userCharacter).length > 0 && Object.keys(enemyCharacter).length === 0) {
            enemyCharacter = {
                name: event.target.dataset.name,
                index: event.target.dataset.index,
                bhp: event.target.dataset.bhp,
                attack: event.target.dataset.attack,
                defense: event.target.dataset.defense,
                fullBody: event.target.dataset.fullBody,
                rFull: event.target.dataset.rFull,
                lFull: event.target.dataset.lFull
            }// end object 
            console.log(`enemy servant index: ${enemyCharacter.index}`)
            console.log(`enemyCharacter Object length is ${Object.keys(enemyCharacter).length}`)
            console.log(`enemy object is ${enemyCharacter}`)
            renderEnemyChar(event)
        }else{
            // Play the game
            // 
        }// end else statement
        
        //console.log(`user selected: ${userCharacter.name}`)
        // document.getElementById('userSelection').className = "col s4 scale-transition"
    }// end if
})

renderUserChar = user => {// Generate user character in the arena
    let img_Preload = userCharacter.fullBody
    console.log(`running renderUserChar`)
    console.log(`Index is ${userCharacter.index}`)
    console.log(`img preload is: ${img_Preload}`)
    console.log(`click event is ${user.target.dataset.fullBody}`)
    //getName(event.target.dataset.index)
    //console.log(`you have chosen ${userCharacter.name}`)
    userElement = document.createElement('div')
    userElement.innerHTML = `
        <div class="card">
            <div class="card card-image">
                <img class="user-character" src='${charAttribute[userCharacter.index].lFull}'>
            </div>
            <div class="card-title">
                <p class="card-attribute-arena">HP: ${userCharacter.bhp}</p>
                <p class="card-attribute-arena">AP: ${userCharacter.attack}</p>
                <p class="card-attribute-arena">DP: ${userCharacter.defense}</p>
            </div>
        </div>
    `
    document.getElementById('userSelection').append(userElement)
    document.getElementById('userSelection').className = "col s4 scale-transition"
    //regenerateCharList(userCharacter.index)
    //delete charAttribute[userCharacter.index]
    //regenerateCharList()
}

renderEnemyChar = user => {// Generate enemy character in the arena
    let img_Preload = enemyCharacter.fullBody
    console.log(`running renderUserChar`)
    console.log(`Index is ${enemyCharacter.index}`)
    console.log(`img preload is: ${img_Preload}`)
    console.log(`click event is ${user.target.dataset.fullBody}`)
    //getName(event.target.dataset.index)
    //console.log(`you have chosen ${userCharacter.name}`)
    enemyElement = document.createElement('div')
    enemyElement.innerHTML = `
        <div class="card">
            <div class="card card-image">
                <img class="enemy-character" src='${charAttribute[enemyCharacter.index].rFull}'>
            </div>
            <div class="card-title">
                <p class="card-attribute-arena">HP: ${enemyCharacter.bhp}</p>
                <p class="card-attribute-arena">AP: ${enemyCharacter.attack}</p>
                <p class="card-attribute-arena">DP: ${enemyCharacter.defense}</p>
            </div>
        </div>
    `
    document.getElementById('enemySelection').append(enemyElement)
    document.getElementById('enemySelection').className = "col s4 scale-transition"
    // delete charAttribute[enemyCharacter.index]
    // regenerateCharList()
}


// regenerateCharList = (listIndex) => {
//     console.log(`running regenerateCharList`)
//     let charElement = ''
//     document.getElementById('charSelect').r
//     charAttribute.splice(listIndex, 1)
//     for(let i=0; i<charAttribute.length; i++){
//         if(i === userCharacter.index){
//             console.log(`Index ${userCharacter.index} is the user Index`)
//         }
//         charElement = document.createElement('div')
//         charElement.className = 'carousel-item'
//         charElement.innerHTML = `
//             <div class="card">
//                 <div class="card card-image">
//                     <img class="character" src="./assets/images/card${i+1}.png" data-index="${charAttribute[i].index}" data-bhp="${charAttribute[i].bhp}" data-attack=${charAttribute[i].attack}" data-defense=${charAttribute[i].defense} data-fullBody="${charAttribute[i].fullBody}" data-name="${charAttribute[i].name}">
//                 </div>
//                 <div class="card-title">
//                     <p class="card-attribute">HP: ${charAttribute[i].bhp}</p>
//                     <p class="card-attribute">AP: ${charAttribute[i].attack}</p>
//                     <p class="card-attribute">DP: ${charAttribute[i].defense}</p>
//                 </div>
//             </div>
//         `
//     }//end for loop
// }// end regenerateCharList

removeIntro = _ => {
    let introBlock = document.getElementById('instructions')
    let storyBlock = document.getElementById('intro')

    introBlock.remove(introBlock)
}

renderChar()