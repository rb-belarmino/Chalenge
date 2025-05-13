// INDEX #############################

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signatoryForm')
  const tableBody = document.getElementById('signatoryTable')
  const addButton = form.querySelector('button')
  const mainContent = document.getElementById('main-content')
  const codeBoxes = document.querySelectorAll('.code-box')

  codeBoxes.forEach((box, index) => {
    box.addEventListener('input', event => {
      const value = event.target.value

      if (!/^\d$/.test(value)) {
        event.target.value = ''
        return
      }
      if (index < codeBoxes.length - 1) {
        codeBoxes[index + 1].focus()
      }
    })

    box.addEventListener('keydown', event => {
      if (event.key === 'Backspace' && !box.value && index > 0) {
        codeBoxes[index - 1].focus()
      }
    })
  })

  addButton.addEventListener('click', () => {
    const email = document.getElementById('email').value.trim()
    const name = document.getElementById('name').value.trim()
    const role = document.getElementById('role').value
    const cpf = document.getElementById('cpf').value.trim()
    const requestCpf = document.getElementById('requestCpf').checked
      ? 'Sim'
      : 'Não'
    const birthdate = document.getElementById('birthdate').value
    const authMethod = document.getElementById('authMethod').value

    // Validação simples
    if (!email || !name || !role || !cpf || !authMethod) {
      alert('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    // Adicionar nova linha à tabela
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${name} (${email})</td>
        <td>${role}</td>
        <td>${authMethod}</td>
        <td>${requestCpf}</td>
        <td>${cpf || 'N/A'}</td>
        <td>${birthdate || 'N/A'}</td>
      `
    tableBody.appendChild(newRow)

    // Limpar o formulário
    form.reset()
  })
})

// Content for each step

const mainContents = [
  `
  <div class="card attention-card">

      <div class="card-body border">
        <h3 class="attention-title">Atenção</h3>
        <p>
          Após o cadastro do FaceID você poderá assinar documentos com o novo sistema de autenticação
          por dois fatores. Lembre-se, caso seja escolhida a opção FaceID, além de fazer o reconhecimento
          facial você deve confirmar uma das frases gravadas antecipadamente que será enviada no seu E-mail ou
          código que chegará de maneira randômica no E-mail cadastrado.
        </p>
        <div class="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
          <span class="logo-in-card opacity-50">LetsSign<span class="check-mark">✓</span></span>
        </div>
      </div>
    </div>
  `,
  ` 
    <div class="container text-center">
        <div class="face-id-container">
          <div class="face-id-circle mx-auto">
            <img src="/images/face-id.svg" class="face-id-image"></img>
          </div>
          <p class="mt-4">
            Posicione o rosto na moldura da câmera. <br>
            Mova a cabeça em círculo para preencher todo espaço.
          </p>
          <button class="btn btn-success btn-lg">Começar</button>
        </div>
    </div>
  `,
  `
    <div class="container">
      <div class="card card-custom">
        <div class="d-flex align-items-center mb-3">
          <div class="mic-icon">
            <i class="bi bi-mic"></i>
          </div>
          <span class="instruction-text">Crie sua primeira frase!</span>
        </div>
        <div class="d-flex align-items-center mb-3">
          <div class="mic-icon">
            <i class="bi bi-mic"></i>
          </div>
          <span class="instruction-text">Crie sua segunda frase!</span>
        </div>
        <div class="d-flex align-items-center">
          <div class="mic-icon">
            <i class="bi bi-mic"></i>
          </div>
          <span class="instruction-text">Crie sua terceira frase!</span>
        </div>
        <p class="note">
          OBS:: As frases não devem se repetir, e não devem conter caracteres pessoais ex: data de nascimento.
        </p>
      </div>
    </div>
  `,
  `
    <div class="container text-center">
      <div>
        <div class="mx-auto">
          <img src="/images/micro.svg" alt="Microfone para gravação" style="width: 300px; height: auto;">
        </div>
        <p class="mt-4">
          Recite a frase de segurança que foi enviada no e-mail: <br>
          <a href="mailto:exemplo@exemplo.com.br" class="email-link">exemplo@exemplo.com.br</a>
        </p>
      </div>
    </div>
  `,
  `
    <div class="container text-center">
      <p class="mt-4">Transcreva o código de segurança abaixo:</p>
        <div class="code-inputs d-flex justify-content-center gap-3 mt-3">
            <input type="text" maxlength="1" class="code-box" />
            <input type="text" maxlength="1" class="code-box" />
            <input type="text" maxlength="1" class="code-box" />
            <input type="text" maxlength="1" class="code-box" />
            <input type="text" maxlength="1" class="code-box" />
            <input type="text" maxlength="1" class="code-box" />
        </div>
    </div>
`
]

let currentStep = 0 // Current Index

document.getElementById('next-button').addEventListener('click', function () {
  const mainContent = document.getElementById('main-content')

  // increment content index
  currentStep++

  // Check if has more content to show
  if (currentStep < mainContents.length) {
    mainContent.innerHTML = mainContents[currentStep]
  } else {
    const toastElement = document.getElementById('stepToast')
    const toast = new bootstrap.Toast(toastElement)
    toast.show()

    setTimeout(() => {
      mainContent.innerHTML = `
      <div class="container text-center">
          <h2 class="mt-5">Obrigado!</h2>
          <p class="mt-3">Assinatura salva com sucesso.</p>
          <a href="index.html" class="btn btn-success mt-4" onclick="window.location.reload()">Voltar ao Início</a>
        </div>
      
      `
    }, 1000)
  }
})
