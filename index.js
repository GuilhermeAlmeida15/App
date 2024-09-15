const { select,input} = require('@inquirer/prompts')

let meta = {
   value:"tomar 3l de água por dia",
   checked: false,
}

let metas = [meta]



const CadastrarMeta = async () =>{
      const meta = await input({message:"Digite a Meta:"})

      if(meta.length == 0){
         console.log("A meta não pode ser vazia.")
         return
      }
      metas.push({ value: meta , checked: false})
}


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
          await CadastrarMeta()
          console.log(metas)
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