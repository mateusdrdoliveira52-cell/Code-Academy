// Botão Inscreva-se
document.getElementById("btnInscrever").addEventListener("click", () => {
    alert("Obrigado pelo interesse! Agora preencha o formulário abaixo.");
    document.getElementById("contato").scrollIntoView({
        behavior: "smooth"
    });
});

// Botão Buscar CEP
document.getElementById("btnBuscar").addEventListener("click", buscarCEP);

// Função ViaCEP
async function buscarCEP() {

    const cep = document.getElementById("cepInput").value.replace(/\D/g, "");
    const resultado = document.getElementById("resultado");

    if (cep.length !== 8) {
        resultado.innerHTML = "<p style='color:red;'>Digite um CEP válido.</p>";
        return;
    }

    resultado.innerHTML = "Buscando endereço...";

    try {

        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await resposta.json();

        if (dados.erro) {
            resultado.innerHTML = "<p style='color:red;'>CEP não encontrado.</p>";
            return;
        }

        resultado.innerHTML = `
            <strong>Rua:</strong> ${dados.logradouro}<br>
            <strong>Bairro:</strong> ${dados.bairro}<br>
            <strong>Cidade:</strong> ${dados.localidade}<br>
            <strong>Estado:</strong> ${dados.uf}
        `;

    } catch {

        resultado.innerHTML = "<p style='color:red;'>Erro ao consultar o CEP.</p>";

    }

}

// Formulário
document.getElementById("formContato").addEventListener("submit", function (e) {

    e.preventDefault();

    alert("Mensagem enviada com sucesso! Em breve entraremos em contato.");

    this.reset();

});