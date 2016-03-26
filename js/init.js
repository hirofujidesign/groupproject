(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();

  }); // end of document ready
})(jQuery); // end of jQuery name space

// $(document).ready(function () {
//     $(window).on('load scroll', function () {
//         var scrolled = $("#video").scrollTop();
//         $('#video').css('transform', 'translate3d(0, ' + -(scrolled * 0.25) + 'px, 0)'); // parallax (25% scroll rate)
//     });
