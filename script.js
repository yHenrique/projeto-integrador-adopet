let pets = JSON.parse(localStorage.getItem("pets")) || [];
let indiceEmEdicao = null;
mostrarPets();


function cadastrarPet() {
    const nome = document.getElementById("nome").value.trim();
    const especie = document.getElementById("especie").value;
    const idade = document.getElementById("idade").value;
    const porte = document.getElementById("porte").value;
    const vacina = document.getElementById("vacina").checked;
    const descricao = document.getElementById("descricao").value;
    const inputFile = document.getElementById("input-file");

    if (nome === "" || especie === "" || idade === "" || porte === "") {
        alert("Preencha todos os campos obrigatórios!");
        return;
    }

    function salvarPet(foto) {

const pet = {
    nome,
    especie,
    idade: Number(idade),
    porte,
    vacina,
    descricao,
    inputFile: foto
};


        
const novosPets = [...pets];

if (indiceEmEdicao !== null) {
    novosPets[indiceEmEdicao] = pet;
} else {
    novosPets.push(pet);
}


        try {
            localStorage.setItem("pets", JSON.stringify(novosPets));
        } catch (erro) {
            alert("Não foi possível salvar. O armazenamento pode estar cheio.");
            return;
        }

        pets = novosPets;
        mostrarPets();

        document.getElementById("nome").value = "";
        document.getElementById("especie").value = "";
        document.getElementById("idade").value = "";
        document.getElementById("porte").value = "";
        document.getElementById("vacina").checked = false;
        document.getElementById("descricao").value = "";
        inputFile.value = "";

indiceEmEdicao = null;

document.querySelector(".cadastro-card button").innerHTML =
    '<i class="fa fa-plus"></i>Incluir Pet';

    }

    const arquivo = inputFile.files[0];

    
if (!arquivo) {
    const fotoAnterior = indiceEmEdicao !== null
        ? pets[indiceEmEdicao].inputFile || ""
        : "";

    salvarPet(fotoAnterior);
    return;
}


    if (!["image/jpeg", "image/png"].includes(arquivo.type)) {
        alert("Selecione uma imagem JPG ou PNG.");
        return;
    }

    if (arquivo.size > 600 * 1024) {
        alert("Escolha uma imagem com até 600 KB.");
        return;
    }

    const leitor = new FileReader();

    leitor.onload = function() {
        salvarPet(leitor.result);
    };

    leitor.onerror = function() {
        alert("Não foi possível carregar a imagem.");
    };

    leitor.readAsDataURL(arquivo);
}


function mostrarPets() {
    let lista = document.getElementById("listaAnimais");
    lista.innerHTML = "";

    for (let i = 0; i < pets.length; i++) {
        let novoPet = document.createElement("li");

        
let fotoPet;

if (pets[i].inputFile) {
    fotoPet = document.createElement("img");
    fotoPet.src = pets[i].inputFile;
    fotoPet.alt = `Foto de ${pets[i].nome}`;
} else {
    fotoPet = document.createElement("span");
    fotoPet.textContent = "Sem foto";
    fotoPet.className = "sem-foto";
}

fotoPet.classList.add("foto_pet");
fotoPet.addEventListener("click", () => abrirDetalhesPet(i));


        let divInfo = document.createElement("div");
        let nomePet = document.createElement("h3");
        nomePet.textContent = pets[i].nome;
        nomePet.addEventListener("click", () => abrirDetalhesPet(i));

        // let especiePet = document.createElement("p");
        // especiePet.textContent = pets[i].especie;

        let idadePet = document.createElement("p");
        idadePet.textContent = pets[i].idade + 
    (Number(pets[i].idade) === 1 ? " ano" : " anos");

        let portePet = document.createElement("p");
        portePet.textContent = "Porte: " + pets[i].porte;

        let vacinaPet = document.createElement("p");
        vacinaPet.textContent = pets[i].vacina === true || pets[i].vacina === "on"
    ? "Vacinado(a)"
    : "Não vacinado(a)";

        let descPet = document.createElement("p");
        descPet.textContent = "Descrição: " + pets[i].descricao;

        let divBotao = document.createElement("div");
        divBotao.className = "petBotao";

        let iconeEditar = document.createElement("i");
        iconeEditar.className = "fa-solid fa-pencil";

        let botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";
        botaoEditar.className = "btn botaoEditar";
        botaoEditar.onclick = () => editarPet(i);

        let botaoRemover = document.createElement("button");
        botaoRemover.textContent = "Remover";
        botaoRemover.className = "btn botaoRemover";
        botaoRemover.onclick = () => removerPet(i);
        botaoRemover.prepend(iconeRemover, " ");

        novoPet.appendChild(fotoPet);

        divInfo.appendChild(nomePet);
        // divInfo.appendChild(especiePet);
        divInfo.appendChild(idadePet);
        divInfo.appendChild(portePet);
        divInfo.appendChild(vacinaPet);
        novoPet.appendChild(divInfo);

        novoPet.appendChild(descPet);

        divBotao.appendChild(botaoEditar);
        divBotao.appendChild(botaoRemover);
        novoPet.appendChild(divBotao);

        lista.appendChild(novoPet);
    }
}


function editarPet(i) {
    const pet = pets[i];

    indiceEmEdicao = i;

    document.getElementById("nome").value = pet.nome;
    document.getElementById("especie").value = pet.especie;
    document.getElementById("idade").value = pet.idade;
    document.getElementById("porte").value = pet.porte;
    document.getElementById("vacina").checked =
        pet.vacina === true || pet.vacina === "on";
    document.getElementById("descricao").value = pet.descricao || "";

    document.querySelector(".cadastro-card button").textContent =
        "Salvar alterações";

    document.getElementById("nome").focus();
    window.scrollTo({ top: 0, behavior: "smooth" });
}


function removerPet(i) {
    pets.splice(i, 1);
    localStorage.setItem("pets", JSON.stringify(pets));
    mostrarPets();
}


function abrirDetalhesPet(i) {
    const pet = pets[i];
    const foto = document.createElement("img");
foto.className = "foto-detalhes";
foto.alt = `Foto de ${pet.nome}`;

if (pet.inputFile) {
    foto.src = pet.inputFile;
}

foto.onerror = function() {
    foto.remove();
};

    const modal = document.getElementById("detalhes-pet");
    const conteudo = document.getElementById("conteudo-detalhes");

    const nome = document.createElement("h3");
    nome.textContent = pet.nome;

    const informacoes = document.createElement("p");
   const idadeFormatada = Number(pet.idade) === 1
    ? "1 ano"
    : `${pet.idade} anos`;

informacoes.textContent = `${pet.especie} • ${idadeFormatada} • Porte ${pet.porte}`;

    const descricao = document.createElement("p");
    descricao.textContent = pet.descricao || "Sem descrição.";
    const vacina = document.createElement("p");

const vacinado = pet.vacina === true || pet.vacina === "on";

vacina.textContent = vacinado
    ? "Vacinação: Vacinado(a)"
    : "Vacinação: Não vacinado(a)";

    conteudo.replaceChildren(foto, nome, informacoes, vacina, descricao);

    modal.showModal();

    document.getElementById("fechar-detalhes").addEventListener("click", function() {
    document.getElementById("detalhes-pet").close();
});
}

