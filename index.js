const { select,input,checkbox} = require('@inquirer/prompts');
const { error } = require('console');
const fs = require("fs").promises


let mensagem = "Bem - Vindo ao app de metas";


let metas 

const CarregarMetas = async () =>{
   try{
         const dados = await fs.readFile("metas.json","utf-8")
         metas = JSON.parse(dados)
   }
      catch(erro) {
         metas = []
      }

}
   const salvarmetas = async () =>{
     await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
   }
   


const CadastrarMeta = async () =>{
      const meta = await input({message:"Digite a Meta:"})

      if(meta.length == 0){
        mensagem ="A meta não pode ser vazia."
         return
      }
      metas.push({ value: meta , checked: false})

      mensagem = "Metas Cadastradas com Sucesso!"
}

const ListarMetas = async () =>{

   if(metas.length == 0) {
      mensagem = "Não existem metas"
      return

   }


   const respostas = await checkbox({ 

      message:"Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o enter para finalizar essa etapa",
      
      choices: [...metas],
      instructions: false,
   })
      metas.forEach((m)=> {
      m.checked = false
      })


      if(respostas.length == 0) {
         mensagem = "Nenhuma meta selecionada!"
         return
      }

        



         respostas.forEach((resposta) => {
            const meta = metas.find((m) => {
               return m.value == resposta
            })
               meta.checked = true
         })
         mensagem ='Meta (s) marcadas como concluída (s)'

}

   const MetasRealizadas = async () => {

      if(metas.length == 0) {
         mensagem = "Não existem metas"
         return
   
      }
   

         const realizadas = metas.filter((meta) => {
            return meta.checked
         })

         if(realizadas.length == 0){
            mensagem ="Nao existem metas realizadas!"
            return
         }
            await select({
               message: "Metas realizadas:" + realizadas.length,
               choices:[...realizadas]
            })

   }


   const MetasAbertas = async () =>{

      if(metas.length == 0) {
         mensagem = "Não existem metas"
         return
   
      }
   

         const abertas = metas.filter((meta) => {
            return meta.checked != true
         })

         if(abertas.length == 0) {
            mensagem ="Não existem metas abertas"
            return
         }
            await select({
               message: "Metas Abertas:" + abertas.length,
               choices: [...abertas]
            })


   }


   const DeletarMetas = async () =>{

      if(metas.length == 0) {
         mensagem = "Não existem metas"
         return
   
      }
   


      const MetasDesmarcadas = metas.map((meta) => {
         return{ value: meta.value , checked: false}

      })
      const ItemsADeletar = await checkbox({ 

         message:"Selecione o item para deletar",
         
         choices: [...MetasDesmarcadas],
         instructions: false,
      })

      if(ItemsADeletar. length == 0){
        mensagem ="nenhum iten a deletar"
         return
      }

      ItemsADeletar.forEach((item) => {
         metas = metas.filter((meta) => {
               return meta.value != item
         })
      })
         mensagem ="Meta(s) deleta(s) com sucesso!"
   }

   const MostrarMensagem = () =>{
      console.clear();
      
      if(mensagem != ""){
         console.log(mensagem)
         console.log("")
         mensagem = ""
      }
   }


const start = async () =>{
  await CarregarMetas()
   

  while(true){
    MostrarMensagem()
    await salvarmetas()


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