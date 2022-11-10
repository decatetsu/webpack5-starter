function initComponents() {
    const header = document.getElementById('main-header');
    const div = document.createElement('div');
    div.textContent = 'Some text for your attention';

    header.after(div);
}

export { initComponents };
