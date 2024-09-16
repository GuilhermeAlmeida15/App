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
      metas.forEach((m)=> {
      m.checked = false
      })


      if(respostas.length == 0) {
         console.log("Nenhuma meta selecionada!")
         return
      }

        



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
               message: "Metas realizadas:" + realizadas.length,
               choices:[...realizadas]
            })

   }


   const MetasAbertas = async () =>{
         const abertas = metas.filter((meta) => {
            return meta.checked != true
         })

         if(abertas.length == 0) {
            console.log("Não existem metas abertas")
            return
         }
            await select({
               message: "Metas Abertas:" + abertas.length,
               choices: [...abertas]
            })


   }


   const DeletarMetas = async () =>{
      const MetasDesmarcadas = metas.map((meta) => {
         return{ value: meta.value , checked: false}

      })
      const ItemsADeletar = await checkbox({ 

         message:"Selecione o item para deletar",
         
         choices: [...MetasDesmarcadas],
         instructions: false,
      })

      if(ItemsADeletar. length == 0){
         console.log("nenhum iten a deletar")
         return
      }

      ItemsADeletar.forEach((item) => {
         metas = metas.filter((meta) => {
               return meta.value != item
         })
      })
         console.log("Meta(s) deleta(s) com sucesso!")
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
            name: "Metas abertas",
            value: "abertas"
         },
         {
            name: "Deletar metas",
            value: "deletar"
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
         case "abertas":
            await MetasAbertas()
            break

         case "deletar":
            await DeletarMetas()
            break

         case "Sair":
            console.log("Até a Próxima!")
            return

     }

  }

}

start()