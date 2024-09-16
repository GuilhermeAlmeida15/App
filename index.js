const { select,input,checkbox} = require('@inquirer/prompts')

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

const ListarMetas = async () =>{
   const respostas = await checkbox({ 

      message:"Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o enter para finalizar essa etapa",
      
      choices: [...metas],
      instructions: false,
   })

      if(respostas.length == 0) {
         console.log("Nenhuma meta selecionada!")
         return
      }

         metas.forEach((m)=> {
            m.checked = false
         })




         respostas.forEach((resposta) => {
            const meta = metas.find((m) => {
               return m.value == resposta
            })
               meta.checked = true
         })
         console.log('Meta (s) marcadas como concluída (s)')

}

   const MetasRealizadas = async () => {
         const realizadas = metas.filter((meta) => {
            return meta.checked
         })

         if(realizadas.length == 0){
            console.log("Nao existem metas realizadas!")
            return
         }
            await select({
               message: "Metas realizadas",
               choices:[...realizadas]
            })

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
            name: "Metas realizadas",
            value: "realizadas"
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
         await ListarMetas()
         break

         case "realizadas":
            await MetasRealizadas()
            break

         case "Sair":
            console.log("Até a Próxima!")
            return

     }

  }

}

start()