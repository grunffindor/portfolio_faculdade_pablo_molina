/*
  Arquivo java scrpit 
  Aqui uso para Menu celular responsivo
  Também criei botão dark mode botão
  Também usamos para validação do formulario de contato
*/

document.addEventListener('DOMContentLoaded', () => {


    const menuToggle = document.getElementById('menu-toggle'); // 
    const menu = document.getElementById('menu'); 

    
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', () => {
            menu.classList.toggle('show');
        });
    }



    // Dark mode
    
    const themeToggle = document.getElementById('theme-toggle'); 
    const body = document.body; 

    // Mantem mesmo modelo selecionado
    const applySavedTheme = () => {
        
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode'); 
            themeToggle.checked = true; 
        } else {
            body.classList.remove('dark-mode'); 
            themeToggle.checked = false;
        }
    };

    if (themeToggle) {
        
        themeToggle.addEventListener('change', () => {
            
            if (themeToggle.checked) {
                body.classList.add('dark-mode'); 
                localStorage.setItem('theme', 'dark'); 
            } else {
                body.classList.remove('dark-mode'); 
                localStorage.setItem('theme', 'light'); 
            }
        });

        
        applySavedTheme();
    }



    
    const contactForm = document.getElementById('contact-form');
    const successModal = document.getElementById('success-modal');
    const closeModalButton = document.querySelector('.close-button');
    
    
    const showError = (inputElement, message) => {
        const formGroup = inputElement.parentElement; 
        const errorElement = formGroup.querySelector('.error-message'); 
        formGroup.classList.add('error'); 
        errorElement.textContent = message; 
    };

    const clearError = (inputElement) => {
        const formGroup = inputElement.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        formGroup.classList.remove('error'); 
        errorElement.textContent = ''; 
    };
    
    // checa e-mail
    const isValidEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    };

    // checa telefone
    
    const isValidPhone = (phone) => {
        const regex = /^[\d\s()-]+$/;
        return phone === '' || regex.test(phone); 
    };

    
    const validateName = (input) => {
        if (input.value.trim() === '') { 
            showError(input, 'O campo nome é obrigatório.');
            return false;
        }
        clearError(input);
        return true;
    };

    const validateEmail = (input) => {
        if (input.value.trim() === '') {
            showError(input, 'O campo e-mail é obrigatório.');
            return false;
        }
        if (!isValidEmail(input.value.trim())) {
            showError(input, 'Por favor, insira um e-mail válido.');
            return false;
        }
        clearError(input);
        return true;
    };
    
    const validatePhone = (input) => {
        if (!isValidPhone(input.value.trim())) {
            showError(input, 'Por favor, insira um telefone válido.');
            return false;
        }
        clearError(input);
        return true;
    };

    const validateMessage = (input) => {
        if (input.value.trim() === '') {
            showError(input, 'O campo mensagem é obrigatório.');
            return false;
        }
        clearError(input);
        return true;
    };

    // essa etapa permite o erro ser real time para quem mexe
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const messageInput = document.getElementById('message');

        
        nameInput.addEventListener('input', () => validateName(nameInput));
        emailInput.addEventListener('input', () => validateEmail(emailInput));
        phoneInput.addEventListener('input', () => validatePhone(phoneInput));
        messageInput.addEventListener('input', () => validateMessage(messageInput));

        
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o recarregamento da página.
            
            
            const isNameValid = validateName(nameInput);
            const isEmailValid = validateEmail(emailInput);
            const isPhoneValid = validatePhone(phoneInput);
            const isMessageValid = validateMessage(messageInput);

            
            if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
                simulateSubmission();
            }
        });
    }
    
    
    const simulateSubmission = () => {
        console.log('Formulário válido! Simulando envio...');
        contactForm.reset(); 
        showModal();
    };
    
    
    const showModal = () => {
        if (successModal) successModal.style.display = 'block';
    };

    const closeModal = () => {
        if (successModal) successModal.style.display = 'none';
    };

    
    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeModal);
    }

    window.addEventListener('click', (event) => {
        if (event.target === successModal) {
            closeModal();
        }
    });
});

