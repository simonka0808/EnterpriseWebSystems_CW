
function addExtraResources() {
    container = document.getElementById('humanResources');
    section = document.getElementById('resouceElements')
    container.appendChild(section.cloneNode(true));
}

$('#topheader .navbar-nav a').on('click', function () {
    $('#topheader .navbar-nav').find('li.active').removeClass('active');
    $(this).parent('li').addClass('active');
});