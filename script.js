const modal = document.getElementById('modal');
        const closeButton = document.getElementById('closeButton');
        const openButton = document.getElementById('openModal');

        function closeModal() {
            modal.classList.add('hidden');
        }

        function openModal() {
            modal.classList.remove('hidden');
        }

        closeButton.addEventListener('click', closeModal);
        openButton.addEventListener('click', openModal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        });