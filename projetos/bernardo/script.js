// Exemplo de interatividade com JavaScript
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário

    // Captura os valores dos campos
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Exibe os valores no console (pode ser substituído por uma requisição AJAX)
    console.log('Nome:', name);
    console.log('E-mail:', email);
    console.log('Mensagem:', message);

    // Limpa o formulário
    document.getElementById('contactForm').reset();

    // Exibe uma mensagem de sucesso
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
});