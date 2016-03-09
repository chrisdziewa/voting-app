
// Handle mobile navmenu close on click 
// code source: 
//http://stackoverflow.com/questions/16877429/twitter-bootstrap-mobile-nav-hide-menu-after-clicking-menu-link
$(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') ) {
        $(this).collapse('hide');
    }
});