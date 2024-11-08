var images = ['http://www.hdwallpaper.nu/wp-content/uploads/2017/04/PLAYERUNKNOWNS-BATTLEGROUNDS-12937710.jpg', 'https://www.hdwallpapers.in/walls/overwatch_4k-HD.jpg', 'https://images.alphacoders.com/186/186993.jpg', 'https://images4.alphacoders.com/602/thumb-1920-602788.png'];

$('#container').append('<style>#container, .acceptContainer:before, .logoContainer:before {background: url(' + images[Math.floor(Math.random() * images.length)] + ') center fixed }');

$(document).ready(function () {
   var originalText;
   var words = [':)', 'There', 'is', 'something', 'in', 'the', 'light'];

   $('.acceptBtn').hover(
      function () {
         var $this = $(this);
         if (!$this.data('hovering')) {
            originalText = $this.text();
            var randomWord = words[Math.floor(Math.random() * words.length)];
            $this.text(randomWord);
            $this.data('hovering', true);
         }
      },
      function () {
         var $this = $(this);
         $this.text(originalText);
         $this.data('hovering', false);
      }
   );
});