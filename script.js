const canvas = document.querySelector("canvas")
const C = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

class Person{
    constructor(x, y, radius, inf, velocity){
        this.x = x
        this.y = y
        this.radius = radius
        this.inf = inf
        this.velocity = velocity
        this.color = 'Black'
        this.timer = 500;
    }
    draw(){
        C.beginPath()
        C.arc(this.x,this.y, this.radius, 0, Math.PI * 2, false)
        C.fillStyle = this.color
        C.fill()
    }
    update(){
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
        if (this.inf == 1){
            this.color = 'red'
            this.timer = this.timer - 1
            if (this.timer < 1) {
                this.inf = 4
                this.color = 'grey'
                this.velocity = {x: 0,y: 0}
            }
        }
        if (this.inf == 2){
            this.color = 'blue'
        }

        if(this.x + this.radius > canvas.width ) {
            this.velocity.x = -1
        }
        if(this.y + this.radius > canvas.height) {
            this.velocity.y = this.velocity.y * -1
        }
        if(this.x - this.radius < 0){
            this.velocity.x = 1
        }
        if(this.y - this.radius < 0){
            this.velocity.y = 1
        }

    }

}
const people = []

function populate(amount, percentageImmune, percentageInfected){
    immune = 0
    infected = 0
    unaffected = 0
    immuneAmount = amount / 100 * percentageImmune
    infectedAmount = amount / 100 * percentageInfected
    while (immune <  immuneAmount){
        newPerson(2)
        immune = immune + 1
    }
    while (infected < infectedAmount){
        newPerson(1)
        infected = infected + 1
    }
    amount = amount - immune - infected
    while (unaffected < amount) {
        newPerson(0)
        unaffected = unaffected + 1
    }

}
function newPerson(inf) {
    people.push( person = new Person(Math.random() * canvas.width, Math.random() * canvas.height, 10, inf, {x: Math.random() * 2 - 1,y: Math.random() * 2 - 1}))

}
populate(500, 75, 1)

person.draw()

function animate(){
    requestAnimationFrame(animate)
    C.clearRect(0,0,canvas.width,canvas.height)
    people.forEach((person) => {
        person.update()
        if(person.inf == 1){ 
            people.forEach((person2, index) => {
                if(person2.inf == 0){
                    const dist = Math.hypot(person2.x - person.x, person2.y - person.y)
                    if(person == person2){

                    }
                    else if(dist - person.radius - person2.radius < 0.1){
                        person2.inf = 1

                    }
                }
                
            });
        }

    });

}

animate()
