const { select } = require('@inquirer/prompts')

const start = async () =>{
  
  while(true){
    const opcao = await select({
      message: "Menu >",
      choices:[

         {
            name:"Cadastar Meta",
            value: "Cadastrar"
         },
         {
            name: "Listar metas",
            value: "Listar"
         },
         {
            name: "Sair",
            value: "Sair"

         },
      ]
    }) 



     switch(opcao){

         case "Cadastrar":
         console.log("Vamos Cadastrar")
         break

         case "Listar":
         console.log("Vamos Listar")
         break

         case "Sair":
            console.log("Até a Próxima!")
            return

     }

  }

}

start()