import { Component,Directive,OnInit } from '@angular/core';
declare var $:JQueryStatic;

@Component({ 
  moduleId: module.id,
  selector: 'app-container',
  template: `
  <header-app></header-app>
  <div id="all">
    <div id="content" class="main-container-section">
      <router-outlet></router-outlet>
    </div>
    <footer-app></footer-app>
  </div>
  `,
  styleUrls:['app.component.css']
})
export class AppComponent implements OnInit{

    ngOnInit() {   
      this.animations();
      this.utils();

      /* clear localstorage on browser close */
      window.onbeforeunload = function(){
          // localStorage.clear();
          //localStorage.removeItem('customer_token');
    }
    }

    
  /* animations */

    animations() {
      delayTime = 0;
      $('[data-animate]').css({opacity: '0'});
      $('[data-animate]').waypoint(function(direction) {
    delayTime += 150;
    $(this).delay(delayTime).queue(function(next) {
        $(this).toggleClass('animated');
        $(this).toggleClass($(this).data('animate'));
        delayTime = 0;
        next();
        //$(this).removeClass('animated');
        //$(this).toggleClass($(this).data('animate'));
    });
      },
        {
      offset: '90%',
      triggerOnce: true
        });

      $('[data-animate-hover]').hover(function() {
    $(this).css({opacity: 1});
    $(this).addClass('animated');
    $(this).removeClass($(this).data('animate'));
    $(this).addClass($(this).data('animate-hover'));
      }, function() {
    $(this).removeClass('animated');
    $(this).removeClass($(this).data('animate-hover'));
      });

  }

  
    utils() {


      /* click on the box activates the radio */

      $('#checkout').on('click', '.box.shipping-method, .box.payment-method', function(e) {
    var radio = $(this).find(':radio');
    radio.prop('checked', true);
      });
      /* click on the box activates the link in it */

      $('.box.clickable').on('click', function(e) {

    window.location = $(this).find('a').attr('href');
      });
      /* external links in new window*/

      $('.external').on('click', function(e) {

    e.preventDefault();
    window.open($(this).attr("href"));
      });
      /* animated scrolling */

      $('.scroll-to, .scroll-to-top').click(function(event) {

    var full_url = this.href;
    var parts = full_url.split("#");
    if (parts.length > 1) {

        scrollTo(full_url);
        event.preventDefault();
    }
      });
      function scrollTo(full_url) {
    var parts = full_url.split("#");
    var trgt = parts[1];
    var target_offset = $("#" + trgt).offset();
    var target_top = target_offset.top - 100;
    if (target_top < 0) {
        target_top = 0;
    }

    $('html, body').animate({
        scrollTop: target_top
    }, 1000);
      }
  }


}