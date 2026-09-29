document.addEventListener('DOMContentLoaded', function () {

    // ===== Page d'accueil : bouton "Voir plus de détails" =====
    const btnAvantages = document.getElementById('btnAvantages');
    const avantagesExtra = document.getElementById('avantagesExtra');

    if (btnAvantages && avantagesExtra) {
        btnAvantages.addEventListener('click', function () {
            avantagesExtra.classList.toggle('hidden');
            if (avantagesExtra.classList.contains('hidden')) {
                btnAvantages.textContent = 'Voir plus de détails';
            } else {
                btnAvantages.textContent = 'Réduire';
            }
        });
    }

    // ===== Page produits : boutons "Commander" =====
    const boutonsCommander = document.querySelectorAll('.btn-commander');
    const selectProduit = document.getElementById('produit');

    boutonsCommander.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const produit = btn.getAttribute('data-produit');

            // Pré-remplir le select du formulaire de commande
            if (selectProduit) {
                selectProduit.value = produit;
            }

            // Faire défiler jusqu'au formulaire
            const commandeSection = document.querySelector('.commande-section');
            if (commandeSection) {
                commandeSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ===== Page produits : validation du formulaire de commande =====
    const commandeForm = document.getElementById('commandeForm');
    const formMessage = document.getElementById('formMessage');

    if (commandeForm) {
        commandeForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const nom = document.getElementById('nom').value.trim();
            const email = document.getElementById('email').value.trim();
            const telephone = document.getElementById('telephone').value.trim();
            const produit = document.getElementById('produit').value;
            const quantite = document.getElementById('quantite').value;
            const adresse = document.getElementById('adresse').value.trim();

            formMessage.textContent = '';
            formMessage.className = 'form-message';

            // Vérification des champs vides
            if (!nom || !email || !telephone || !produit || !quantite || !adresse) {
                formMessage.textContent = 'Veuillez remplir tous les champs du formulaire.';
                formMessage.classList.add('error');
                return;
            }

            // Vérification du format email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formMessage.textContent = 'Veuillez saisir une adresse email valide.';
                formMessage.classList.add('error');
                return;
            }

            // Vérification du téléphone (au moins 8 chiffres)
            const telRegex = /^[0-9+\s]{8,}$/;
            if (!telRegex.test(telephone)) {
                formMessage.textContent = 'Veuillez saisir un numéro de téléphone valide.';
                formMessage.classList.add('error');
                return;
            }

            // Vérification de la quantité
            if (parseInt(quantite) < 1) {
                formMessage.textContent = 'La quantité doit être au minimum de 1.';
                formMessage.classList.add('error');
                return;
            }

            // Confirmation de commande
            formMessage.textContent =
                'Merci ' + nom + ', votre commande de ' + quantite + ' x ' + produit +
                ' a bien été enregistrée. Nous vous contacterons au ' + telephone + '.';
            formMessage.classList.add('success');

            commandeForm.reset();
        });
    }
});