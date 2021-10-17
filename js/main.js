const app = Vue.createApp({
    data(){
        return {
            product: "Leno's Weight Calculator",
            description: 'Weight Calculator for BWINF',
            url: 'https://taleno.eu/',
            booleanVal: false,
            operations: [
                { id: 1, operation:'addition'},
                { id: 2, operation: 'subtraction'}
            ],
            counter: 0,

        }
    },
    methods:{
        incrementButton(){
            this.counter += 1;
        }
    }
})