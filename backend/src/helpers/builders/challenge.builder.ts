class ChallengeBuilder {
    challenge = {
        name: "",
        solved: false,
        message: '',
        description: "",
        key: ""
    }
    setName(name: string){
        this.challenge.name = name
        return this
    }
    setIsSolved(solved: boolean){
        this.challenge.solved = solved
        return this
    }
    setMessage(message: string){
        this.challenge.message = message
        return this
    }
    setDescription(description: string){
        this.challenge.description = description
        return this
    }
    setKey(key: string) {
        this.challenge.key = key
        return this
    }
    build(){
        return this.challenge
    }
}

export default ChallengeBuilder