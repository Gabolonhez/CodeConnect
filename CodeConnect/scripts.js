// Seleciona elementos HTML da página
const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload");

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
})

function lerConteudoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        // Cria um novo leitor de arquivo
        const leitor = new FileReader();
        // Define o que acontece quando a leitura é completada com sucesso
        leitor.onload = () => {
            // Resolve a Promise com um objeto contendo a URL e o nome do arquivo
            resolve({ 
                resultado: leitor.result, 
                nome: arquivo.name});
        }
        // Define o que acontece em caso de erro na leitura do arquivo
        leitor.onerror = () => { 
        // Rejeita a Promise com uma mensagem de erro personalizada
            reject("Erro na leitura do arquivo ${arquivo.name}");
        }
        // Inicia a leitura do arquivo como uma URL data (base64)
        leitor.readAsDataURL(arquivo);
    })
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeImagem = document.querySelector(".container-imagem-nme p");

// Adiciona um ouvinte de evento para o input de upload de arquivo
inputUpload.addEventListener("change", async (evento) =>{
    // Obtém o arquivo selecionado pelo usuário
    const arquivo = evento.target.files[0];

    if(arquivo) {
        try {
            // Aguarda a leitura do conteúdo do arquivo
            const conteudoArquivo = await lerConteudoArquivo(arquivo);
             // Atualiza a imagem principal com a URL do arquivo
            imagemPrincipal.src = conteudoArquivo.url;
             // Atualiza o nome da imagem na página
            nomeImagem.textContent = conteudoArquivo.nome;
        } catch(erro) {
             // Em caso de erro na leitura do arquivo, exibe uma mensagem de erro no console
            console.log("Erro na leitura no arquivo");
        }
    }
})

const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");


listaTags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove-tag")) {
        const tagRemover = evento.target.parentElement;
        listaTags.removeChild(tagRemover);
    }
})

const tagsDisponiveis = ["Front-end", "Back-end", "Fullstack"];

async function verificarTagsDisponiveis(tagTexto) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto));
        }, 1000)
    })
}

function validarFormulario(nome, descricao, tags) {
    if (!nome || !descricao) {
        throw new Error('Por favor, preencha todos os campos obrigatórios (nome e descrição).');
    }
    if (tags.length === 0) {
        throw new Error('Adicione pelo menos uma tag ao projeto.');
    }
}

try {
    validarFormulario(nomeProjeto, descricaoProjeto, tagsProjeto);

    const result = await publicarProjeto(nomeProjeto, descricaoProjeto, tagsProjeto);
    console.log(result);
    alert('Projeto publicado com sucesso!');
} catch (error) {
    console.error('Erro ao publicar projeto:', error);
    alert('Erro ao publicar projeto: ' + error.message);
}

inputTags.addEventListener("keypress", async (evento) => {
    if (evento.key === "Enter")  {
        evento.preventDefault();
        const tagTexto = inputTags.value.trim();
        if (tagTexto !== "") {
            try {
            const tagExiste  = await verificarTagsDisponiveis(tagTexto); 
            if (tagExiste) {
            const tagNova = document.createElement("li"); 
            tagNova.innerHTML = `<p>${tagTexto}</p> <img src= "./img/close-black.svg" class= "remove-tag">`
            listaTags.appendChild(tagNova);
            inputTags.value = ""; 
        } else {
            alert("Tag não foi encontrada");
        }
        } catch (error) {
            console.log("Erro ao verificar existência da tag");
            alert("Erro ao verificar existência da tag");
        }
        } 
    }
})

const botaoPublicar = document.querySelector(".botao-publicar"); {
    botaoPublicar.addEventListener("click", async (evento) => {
        evento.preventDefault();

        const nomeProjeto = document.getElementById("nome").value;
        const descricaoProjeto = document.getElementById("descricao").value;
        const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent);

        try {
            const resultado = await publicarProjeto(nomeProjeto, descricaoProjeto, tagsProjeto);
            console.log(resultado);
            alert("Projeto publicado!");
        } catch (error) {
            console.log("Deu errado: ", error);
            alert("Algo deu errado :/");
        }
    })
}


const botaoDescartar = document.querySelector(".botao-descartar");

botaoDescartar.addEventListener("click", (evento) => {
    evento.preventDefault();

    const formulario = document.querySelector("form");
    formulario.reset();

    imagemPrincipal.src = "./img/imagem1.png";
    nomeDaImagem.textContent = "image_projeto.png";

    listaTags.innerHTML = "";

})


async function publicarProjeto(nomeProjeto, descricaoProjeto, tagsProjeto) {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            const deuCerto = Math.random() > 0.5;

            if (deuCerto) {
                resolve("Projeto publicado com sucesso.");
            } else {
                reject("Erro ao publicar o projeto");
            }
        }, 2000)
    })
}