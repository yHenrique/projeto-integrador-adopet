let pets = JSON.parse(localStorage.getItem("pets")) || [];
mostrarPets();

function cadastrarPet() {
    let nome = document.getElementById("nome").value;
    let especie = document.getElementById("especie").value;
    let idade = document.getElementById("idade").value;
    let porte = document.getElementById("porte").value;
    let vacina = document.getElementById("vacina").value;
    let descricao = document.getElementById("descricao").value;
    let inputFile = document.getElementById("input-file");

    if (nome == "" || especie == "" || idade == "" || porte == "") {
        alert("Preencha todos os campos!");
        return;
    }

    let pet = { nome: nome, especie: especie, idade: idade, porte: porte, vacina: vacina, descricao: descricao, inputFile: URL.createObjectURL(inputFile.files[0]) };
    pets.push(pet);

    localStorage.setItem("pets", JSON.stringify(pets));
    mostrarPets();

    document.getElementById("nome").value = "";
    document.getElementById("especie").value = "";
    document.getElementById("idade").value = "";
    document.getElementById("porte").value = "";
    document.getElementById("vacina").value = "";
    document.getElementById("descricao").value = "";
    inputFile.value = "";
}

function mostrarPets() {
    let lista = document.getElementById("listaAnimais");
    lista.innerHTML = "";

    for (let i = 0; i < pets.length; i++) {
        let novoPet = document.createElement("li");

        let fotoPet = document.createElement("img");
        fotoPet.src = pets[i].inputFile;
        fotoPet.className = "foto_pet";

        let divInfo = document.createElement("div");
        let nomePet = document.createElement("h3");
        nomePet.textContent = pets[i].nome;

        // let especiePet = document.createElement("p");
        // especiePet.textContent = pets[i].especie;

        let idadePet = document.createElement("p");
        idadePet.textContent = pets[i].idade + " anos";

        let portePet = document.createElement("p");
        portePet.textContent = pets[i].porte;

        let vacinaPet = document.createElement("p");
        vacinaPet.textContent = pets[i].vacina;

        let descPet = document.createElement("p");
        descPet.textContent = pets[i].descricao;

        let divBotao = document.createElement("div");
        divBotao.className = "petBotao";
        let botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";
        botaoEditar.className = "btn botaoEditar";
        botaoEditar.onClick = () => editarPet(i);

        let botaoRemover = document.createElement("button");
        botaoRemover.textContent = "Remover";
        botaoRemover.className = "btn botaoRemover";
        botaoRemover.onclick = () => removerPet(i);

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

}

function removerPet(i) {
    pets.splice(i, 1);
    localStorage.setItem("pets", JSON.stringify(pets));
    mostrarPets();
}