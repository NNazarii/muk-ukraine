function docReady(fn) {
    // see if DOM is already available
    if (
        document.readyState === "complete" ||
        document.readyState === "interactive"
    ) {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

docReady(function () {

    /**
     * Hero Slider Tabs
     */
    if ( jQuery( ".hero-slider" ).length ) {
        // Show the first tab and hide the rest
        jQuery('#nav-2').addClass('active');
        jQuery('.tab-content').hide();
        jQuery('#tab2').show();

        // Click function
        jQuery('#tab-nav a').click(function () {
            jQuery('#tab-nav a').removeClass('active');
            jQuery(this).addClass('active');
            jQuery('.tab-content').hide();

            let activeTab = jQuery(this).attr('href');
            jQuery(activeTab).fadeIn();
            return false;
        });

    }


    /**
     * For each video player, create custom thumbnail or
     * use Youtube max resolution default thumbnail and create
     * iframe video.
     */
    function getVideos() {
        var v = document.getElementsByClassName("youtube-player");
        for (var n = 0; n < v.length; n++) {
            var p = document.createElement("div");
            var id = v[n].getAttribute("data-id");

            var placeholder = v[n].hasAttribute("data-thumbnail")
                ? v[n].getAttribute("data-thumbnail")
                : "";

            if (placeholder.length) p.innerHTML = createCustomThumbail(placeholder);
            else p.innerHTML = createThumbail(id);

            v[n].appendChild(p);
            p.addEventListener("click", function () {
                var parent = this.parentNode;
                createIframe(parent, parent.getAttribute("data-id"));
            });
        }
    }

    /**
     * Create custom thumbnail from data-attribute provided url
     * @param {string} url
     * @return {string} The HTML containing the <img> tag
     */
    function createCustomThumbail(url) {
        return (
            '<img class="youtube-thumbnail" src="' +
            url +
            '" alt="Youtube Preview" /><div class="youtube-play-btn"></div>'
        );
    }

    /**
     * Get Youtube default max resolution thumbnail
     * @param {string} id The Youtube video id
     * @return {string} The HTML containing the <img> tag
     */
    function createThumbail(id) {
        return (
            '<img class="youtube-thumbnail" src="//i.ytimg.com/vi_webp/' +
            id +
            '/maxresdefault.webp" alt="Youtube Preview"><div class="youtube-play-btn"></div>'
        );
    }

    /**
     * Create and load iframe in Youtube container
     **/
    function createIframe(v, id) {
        var iframe = document.createElement("iframe");
        console.log(v);
        iframe.setAttribute(
            "src",
            "//www.youtube.com/embed/" +
            id +
            "?autoplay=1&color=white&autohide=2&modestbranding=1&border=0&wmode=opaque&enablejsapi=1&showinfo=0&rel=0"
        );
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("class", "youtube-iframe");
        v.firstChild.replaceWith(iframe);
    }

    /** Pause video on modal close **/
    jQuery("#video-modal").on("hidden.bs.modal", function (e) {
        $(this).find("iframe").remove();
    });

    /** Pause video on modal close **/
    jQuery("#video-modal").on("show.bs.modal", function (e) {
        getVideos();
    });

    getVideos();


    /** Search Animation **/
    jQuery( "#search" ).focus(function() {
        jQuery( '.nav-item' ).css( "margin-right", "-250px" );
        jQuery( '#search' ).css( "margin-left", "-300px" );
    });

    jQuery( "#search" ).focusout(function() {
        jQuery( '.nav-item' ).css( "margin-right", "0" );
        jQuery( '#search' ).css( "margin-left", "0" );
    });

    const image = document.getElementsByClassName("parallax");
    new simpleParallax(image);


    jQuery('#tab-description').addClass('show').slideToggle();


});
